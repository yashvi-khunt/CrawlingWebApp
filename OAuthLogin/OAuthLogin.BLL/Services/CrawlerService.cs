using Microsoft.EntityFrameworkCore;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.BLL.SQLRepository;
using OAuthLogin.DAL.Helper;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace OAuthLogin.BLL.Services
{
    public class CrawlerService : ICrawlerService
    {

        private readonly OAuthDbContext _context;
        private readonly IProcedureManager _procedureManager;
        public CrawlerService(OAuthDbContext dbContext, IProcedureManager procedureManager)
        {
            _context = dbContext;
            _procedureManager = procedureManager;
            
        }

        public Task<Job> AddCrawlingJob(VMAddCrawlingJob vMAddCrawlingJob, string userId)
        {
            
            var newJob = new Job
            {
                Name = vMAddCrawlingJob.JobName,
                URL = vMAddCrawlingJob.URL,
                CreatedById = userId,
                CreatedDate = DateTime.Now,
            };
            _context.Jobs.Add(newJob);

            _context.SaveChanges();

            foreach (var item in vMAddCrawlingJob.Parameters)
            {
                var param = new JobParameter
                {
                    ParameterName = item.Param,
                    XPath = item.Xpath,
                    Attribute = item.Attribute,
                    IsLevelParameter = item.IsLevelParam,
                    JobId = newJob.Id,
                };
                _context.JobParameters.Add(param);
            }

            _context.SaveChanges();
            return Task.FromResult(newJob);
        }

        public Task<VMGetCrawlingJobs> GetAllCrawlingJobs(VMGetCrawlingJobsInput vMGetCrawlingJobsInput)
        {


            var crawlingJobs = _procedureManager.ExecStoreProcedureMulResults<StoredProcedureCommonModel, VMSpGetCrawlingJobs>(StoredProcedure.GetCrawlingJobs, vMGetCrawlingJobsInput);

            var countData = crawlingJobs.Item1[0].Count;
            var crawlingJobsData = crawlingJobs.Item2;


            VMGetCrawlingJobs getCrawlingJobs = new VMGetCrawlingJobs
            {
                Count = (int)countData,
                CrawlingJobs = crawlingJobsData
            };

            return Task.FromResult(getCrawlingJobs);
        }

        public Task<List<VMJobResponseForJobId>> GetResponseForJobId(int JobId)

        {
            VMJobResponseInputModel spParam = new VMJobResponseInputModel { JobId = JobId };
            var response = _procedureManager.ExecStoreProcedureMulResults<StoredProcedureCommonModel, VMSPJobResponse>(StoredProcedure.GetResponseForJobId,spParam);

            var totalJobs = response.Item1[0].Count;
            var responseData = response.Item2;
            List<VMJobResponseForJobId> jobResponse = new List<VMJobResponseForJobId>();

            for (var count = 1; count <= totalJobs; count++)
            {
                var jobs = responseData.FindAll(r => r.ParamOrder == count);
                List<VMJobResponseData> responseList = new List<VMJobResponseData>();
                foreach (var job in jobs)
                {
                    responseList.Add(
                    new VMJobResponseData
                    {
                        ParameterName = job.ParameterName,
                        Value = job.Value,
                    });
                }
                jobResponse.Add(new VMJobResponseForJobId { ParamOrder = count,Data=responseList});
            }
            return Task.FromResult(jobResponse);

        }


        public async Task TriggerJob(int jobId)
        {
            await GetData(jobId);
             GetDetailsData(jobId);
            return;
        }

        public Task GetData(int JobId)
        {
            Console.WriteLine("Start....GetData");
            var job = _context.Jobs.Where(j => j.Id == JobId).FirstOrDefault();

            job.LastExecuted = DateTime.Now;
            _context.Jobs.Update(job);
            _context.SaveChanges();

            var jobParams = _context.JobParameters.Where(p => p.JobId == job.Id && p.IsLevelParameter == false).ToList();

            // to open chrome in headless mode
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments("headless");

            using (var driver = new ChromeDriver(chromeOptions))
            {
                //navigating to the target page in browser
                driver.Navigate().GoToUrl(job.URL);


                //iterating over each parameter in the job form
                foreach (var param in jobParams)
                {
                    var results = driver.FindElements(By.XPath(param.XPath));
                    if (results.Count == 0)
                    {
                        // return Task.FromResult(new List<JobResponse>());
                    }
                    var count = 1;
                    foreach (var result in results)
                    {
                        var existingJobResponse = _context.JobResponses.FirstOrDefault(jr => jr.JobParameterId == param.Id && jr.ParamOrder == count);

                        if (existingJobResponse != null)
                        {
                            existingJobResponse.Value = result.GetAttribute(param.Attribute) ?? "";
                        }
                        else
                        {
                            var jobResponse = new JobResponse()
                            {
                                JobParameterId = param.Id,
                                Value = result.GetAttribute(param.Attribute)  ?? "",
                            ParamOrder = count,
                            };

                            _context.JobResponses.Add(jobResponse);
                        }

                        count++;
                    }

                }
                _context.SaveChanges();

            }



            var jobResponses = _context.JobResponses.Include(jr => jr.JobParameter).Where(j => j.JobParameter.JobId == job.Id).ToList();
            return Task.FromResult(jobResponses);
        }


        public void GetDetailsData(int JobId)
        {
            Console.WriteLine("Start....GetDetailsData");
            var jobParams = _context.JobParameters.Where(j => j.JobId == JobId && j.IsLevelParameter == true).ToList();

            var jobs = _context.JobResponses.Include(j => j.JobParameter).Where(j => j.JobParameter.JobId == JobId && j.JobParameter.ParameterName == "nextURL").ToList();
            // to open chrome in headless mode
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments("headless");

            using (var driver = new ChromeDriver(chromeOptions))
            {
                //navigating to the target page in browser

                foreach (var job in jobs)
                {
                    driver.Navigate().GoToUrl(job.Value);
                    foreach (var param in jobParams)
                    {

                        var result = string.Empty;
                        try
                        {
                            result = driver.FindElement(By.XPath(param.XPath)).GetAttribute(param.Attribute) ?? "";
                        }
                        catch (NoSuchElementException ex)
                        {
                            ////log

                        }

                        var existingJobResponse = _context.JobResponses.FirstOrDefault(jr => jr.JobParameterId == param.Id && jr.ParamOrder == job.ParamOrder);
                        if (existingJobResponse != null)
                        {
                            existingJobResponse.Value = result ?? "";
                        }
                        else
                        {
                            var jobResponse = new JobResponse()
                            {
                                JobParameterId = param.Id,
                                Value = result ?? "",
                                ParamOrder = job.ParamOrder,
                            };

                            _context.JobResponses.Add(jobResponse);
                        }
                    }
                }

                _context.SaveChanges();

            }
        }

    }
}
