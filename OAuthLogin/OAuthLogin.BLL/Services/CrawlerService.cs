
using Microsoft.EntityFrameworkCore;
using OAuthLogin.BLL.Repositories;
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
        public CrawlerService(OAuthDbContext dbContext)
        {
            _context = dbContext;
        }

        public Task<Job> AddCrawlingJob(VMAddCrawlingJob vMAddCrawlingJob)
        {
            var newJob = new Job
            {
                Name = vMAddCrawlingJob.JobName,
                URL = vMAddCrawlingJob.URL,
                LevelXPath = ""
            };
            _context.Jobs.Add(newJob);

            _context.SaveChanges();

            foreach (var item in vMAddCrawlingJob.Parameters)
            {
                var param = new JobParameter
                {
                    ParameterName = item.Param,
                    XPath = item.Xpath,
                    IsLevelParameter = item.IsLevelParam,
                    JobId = newJob.Id,
                };
                _context.JobParameters.Add(param);
            }

           // _context.SaveChanges();
            return Task.FromResult(newJob);
        }

        public Task<List<JobResponse>> GetData(int JobId)
        {
            var job = _context.Jobs.Where(j => j.Id == JobId).FirstOrDefault();
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
                    var count = 1;
                    foreach (var result in results)
                    {
                        var existingJobResponse = _context.JobResponses.FirstOrDefault(jr => jr.JobParameterId == param.Id && jr.ParamOrder == count.ToString());

                        if (existingJobResponse != null)
                        {
                            existingJobResponse.Value = param.ParameterName != "nextURL" ? result.Text : result.GetAttribute("href");
                        }
                        else
                        {
                            var jobResponse = new JobResponse()
                            {
                                JobParameterId = param.Id,
                                Value = param.ParameterName != "nextURL" ? result.Text : result.GetAttribute("href"),
                                ParamOrder = count.ToString(),
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
                            result = driver.FindElement(By.XPath(param.XPath)).GetAttribute("textContent") ?? "";
                        }catch (NoSuchElementException ex)
                        {
                            ////log
                            
                        }

                        var existingJobResponse = _context.JobResponses.FirstOrDefault(jr => jr.JobParameterId == param.Id && jr.ParamOrder == job.ParamOrder);
                        if (existingJobResponse != null)
                        {
                            existingJobResponse.Value = result;
                        }
                        else
                        {
                            var jobResponse = new JobResponse()
                            {
                                JobParameterId = param.Id,
                                Value = result,
                                ParamOrder = job.ParamOrder,
                            };

                            _context.JobResponses.Add(jobResponse);
                        }                    }
                }

                _context.SaveChanges();

            }
        }
      
    }
}
