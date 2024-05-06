using Hangfire_Demo.Models;
using Microsoft.AspNetCore.Mvc;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Hangfire_Demo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        [HttpGet("url")]
        public IActionResult GetAllPokemons(string url)
        {
            var pokemonProducts = new List<PokemonProduct>();

            // to open chrome in headless mode
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArguments("headless");


            //starting a selenium instance
            using (var driver = new ChromeDriver(chromeOptions))
            {
                //navigating to the target page in the browser
                driver.Navigate().GoToUrl(url);


                // getting the HTML product elements 
                var productHTMLElements = driver.FindElements(By.CssSelector("li.product"));

                
                // iterating over them to scrape the data of interest 
                foreach(var product in productHTMLElements) {

                    // scraping logic
                    var purl = product.FindElement(By.CssSelector("a")).GetAttribute("href");
                    var image = product.FindElement(By.CssSelector("img")).GetAttribute("src");
                    var name = product.FindElement(By.CssSelector("H2")).Text;
                    var price = product.FindElement(By.XPath("//*[@id=\"main\"]/ul/li[1]/a[1]/span/span")).Text;

                    driver.Navigate ().GoToUrl(purl);
                    var description = driver.FindElement(By.XPath("//*[@id=\"product-759\"]/div[2]/div[1]/p")).Text;

                    var pokemonProduct = new PokemonProduct()
                    {
                        Name = name,
                        Price = price,
                        Url = purl,
                        Image = image,
                        Description = description
                    };

                    pokemonProducts.Add(pokemonProduct);
                }


                return Ok(pokemonProducts);
                
            }
        }
    }
}
