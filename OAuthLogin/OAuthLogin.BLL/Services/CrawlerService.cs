using Microsoft.EntityFrameworkCore;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.BLL.SQLRepository;
using OAuthLogin.DAL.Helper;
using OAuthLogin.DAL.Models;
using OAuthLogin.DAL.ViewModels;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System.Runtime.InteropServices;

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

        public async Task<Job> AddCrawlingJob(VMAddCrawlingJob vMAddCrawlingJob, string userId)
        {
            var newJob = new Job
            {
                Name = vMAddCrawlingJob.JobName,
                URL = vMAddCrawlingJob.URL,
                CreatedById = userId,
                CreatedDate = DateTime.Now,
            };

            await _context.Jobs.AddAsync(newJob);
            _context.SaveChanges();
            var jobParameters = vMAddCrawlingJob.Parameters.Select(item => new JobParameter
            {
                ParameterName = item.Param,
                XPath = item.Xpath,
                Attribute = item.Attribute,
                IsLevelParameter = item.IsLevelParam,
                JobId = newJob.Id,
            }).ToList();

            await _context.JobParameters.AddRangeAsync(jobParameters);
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return newJob;
        }

        public async Task<VMGetCrawlingJobs> GetAllCrawlingJobs(VMGetCrawlingJobsInput vMGetCrawlingJobsInput)
        {
            var crawlingJobs = _procedureManager.ExecStoreProcedureMulResults<StoredProcedureCommonModel, VMSpGetCrawlingJobs>(StoredProcedure.GetCrawlingJobs, vMGetCrawlingJobsInput);

            return new VMGetCrawlingJobs
            {
                Count = (int)crawlingJobs.Item1[0].Count,
                CrawlingJobs = crawlingJobs.Item2
            };
        }

        public async Task<List<VMJobResponseForJobId>> GetResponseForJobId(int JobId)
        {
            var spParam = new VMJobResponseInputModel { JobId = JobId };
            var response = _procedureManager.ExecStoreProcedureMulResults<StoredProcedureCommonModel, VMSPJobResponse>(StoredProcedure.GetResponseForJobId, spParam);

            var jobResponse = response.Item2.GroupBy(r => r.ParamOrder)
                                             .Select(g => new VMJobResponseForJobId
                                             {
                                                 ParamOrder = g.Key,
                                                 Data = g.Select(job => new VMJobResponseData
                                                 {
                                                     ParameterName = job.ParameterName,
                                                     Value = job.Value,
                                                     Attribute = job.Attribute
                                                 }).ToList()
                                             }).ToList();

            return jobResponse;
        }

        public async Task TriggerJob(int jobId)
        {
            await GetData(jobId);
            await GetDetailsData(jobId);
        }

        private ChromeDriver CreateChromeDriver()
        {
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments("headless");
            return new ChromeDriver(chromeOptions);
        }

        private Task NavigateToUrlAsync(ChromeDriver driver, string url,/* bool shouldWait*/ string xpath)
        {

            driver.Navigate().GoToUrl(url);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(20);
            //if (shouldWait)
            //{
            try
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                var res = wait.Until(x => x.FindElements(By.XPath(xpath)));
                return Task.FromResult(res.Count);
            }
            catch (Exception)
            {
                Console.WriteLine("Page timed out after 10 secs.");
                return null;
            }
            //}
        }

        private async Task ProcessJobParametersAsync(ChromeDriver driver, List<JobParameter> jobParams, string pxpath)
        {
            var results = driver.FindElements(By.XPath(pxpath));

            if (results.Count == 0) return;
            int count = 1;
            foreach (var result in results)
            {

                foreach (var param in jobParams)
                {
                    if (param.ParameterName == "ParentEl") continue;

                    var res = result.FindElement(By.XPath($".{param.XPath}"));
                    Console.WriteLine(res.Text);
                    var existingJobResponse = await _context.JobResponses
                        .FirstOrDefaultAsync(jr => jr.JobParameterId == param.Id && jr.ParamOrder == count);

                    if (existingJobResponse != null)
                    {
                        existingJobResponse.Value = res.GetAttribute(param.Attribute) ?? "";
                    }
                    else
                    {
                        var jobResponse = new JobResponse
                        {
                            JobParameterId = param.Id,
                            Value = res.GetAttribute(param.Attribute) ?? "",
                            ParamOrder = count
                        };
                        await _context.JobResponses.AddAsync(jobResponse);
                    }
                }
                count++;
            }
        }

        private async Task ProcessDetailParametersAsync(ChromeDriver driver, List<JobParameter> jobParams, int paramOrder)
        {
            foreach (var param in jobParams)
            {
                string result = string.Empty;
                try
                {
                    result = driver.FindElement(By.XPath(param.XPath)).GetAttribute(param.Attribute) ?? "";
                }
                catch (NoSuchElementException)
                {
                    // log error if needed
                }

                var existingJobResponse = await _context.JobResponses
                    .FirstOrDefaultAsync(jr => jr.JobParameterId == param.Id && jr.ParamOrder == paramOrder);

                if (existingJobResponse != null)
                {
                    existingJobResponse.Value = result ?? "";
                }
                else
                {
                    var jobResponse = new JobResponse
                    {
                        JobParameterId = param.Id,
                        Value = result ?? "",
                        ParamOrder = paramOrder
                    };
                    await _context.JobResponses.AddAsync(jobResponse);
                }
            }
        }

        public async Task GetData(int jobId)
        {
            var job = await _context.Jobs.FindAsync(jobId);
            if (job == null) return;

            job.LastExecuted = DateTime.Now;
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync();

            var jobParams = await _context.JobParameters
                .Where(p => p.JobId == job.Id && !p.IsLevelParameter)
                .ToListAsync();

            using (var driver = CreateChromeDriver())
            {
                var parentxpath = jobParams.Find(x => x.ParameterName == "ParentEl").XPath;
                await NavigateToUrlAsync(driver, job.URL, parentxpath);
                await ProcessJobParametersAsync(driver, jobParams, parentxpath);
            }

            await _context.SaveChangesAsync();
        }

        public async Task GetDetailsData(int jobId)
        {
            var jobParams = await _context.JobParameters
                .Where(j => j.JobId == jobId && j.IsLevelParameter)
                .ToListAsync();

            var jobs = await _context.JobResponses
                .Include(j => j.JobParameter)
                .Where(j => j.JobParameter.JobId == jobId && j.JobParameter.ParameterName == "nextURL")
                .ToListAsync();

            using (var driver = CreateChromeDriver())
            {
                foreach (var job in jobs)
                {
                    driver.Navigate().GoToUrl(job.Value);
                    await ProcessDetailParametersAsync(driver, jobParams, job.ParamOrder);
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<VMAddCrawlingJob> GetFormByJobId(int jobId)
        {
            var job = _context.Jobs.Include(j => j.Parameters).FirstOrDefault(j => j.Id == jobId);


            if (job == null)
            {
                throw new NotFoundException(); // or throw an exception, or handle as per your logic
            }

            var vmAddCrawlingJob = new VMAddCrawlingJob
            {
                JobName = job.Name,
                URL = job.URL,
                Parameters = job.Parameters.Select(param => new ParameterModel
                {
                    Param = param.ParameterName,
                    Xpath = param.XPath,
                    Attribute = param.Attribute,
                    IsLevelParam = param.IsLevelParameter,
                }).ToList(),
            };
            return vmAddCrawlingJob;
        }


        public async Task<Job> EditCrawlingJob(int jobId, VMAddCrawlingJob vMAddCrawlingJob, string userId)
        {
            // Retrieve the existing job with parameters
            var existingJob = await _context.Jobs.Include(j => j.Parameters).FirstOrDefaultAsync(j => j.Id == jobId);

            if (existingJob == null)
            {
                throw new NotFoundException("Job not found");
            }

            // Update job details
            existingJob.Name = vMAddCrawlingJob.JobName;
            existingJob.URL = vMAddCrawlingJob.URL;
            existingJob.UpdatedById = userId;
            existingJob.UpdatedDate = DateTime.Now;

            // Update parameters
            var existingParameters = existingJob.Parameters.ToList();

            // Remove parameters that are not in the new list
            foreach (var existingParam in existingParameters)
            {
                if (!vMAddCrawlingJob.Parameters.Any(p => p.Param == existingParam.ParameterName && p.Xpath == existingParam.XPath))
                {
                    _context.JobParameters.Remove(existingParam);
                }
            }

            // Update and add parameters
            foreach (var paramModel in vMAddCrawlingJob.Parameters)
            {
                var existingParam = existingParameters.FirstOrDefault(p => p.ParameterName == paramModel.Param && p.XPath == paramModel.Xpath);

                if (existingParam != null)
                {
                    // Update existing parameter
                    existingParam.Attribute = paramModel.Attribute ?? "textContent";
                    existingParam.IsLevelParameter = paramModel.IsLevelParam;
                }
                else
                {
                    // Add new parameter
                    var newParam = new JobParameter
                    {
                        ParameterName = paramModel.Param,
                        XPath = paramModel.Xpath,
                        Attribute = paramModel.Attribute,
                        IsLevelParameter = paramModel.IsLevelParam,
                        JobId = existingJob.Id
                    };
                    await _context.JobParameters.AddAsync(newParam);
                }
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return existingJob;
        }
    }
}
