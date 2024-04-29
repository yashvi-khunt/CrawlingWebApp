
using Microsoft.AspNetCore.Identity;
using OAuthLogin.DAL.Helper;
using OAuthLogin.DAL.Models;


namespace OAuthLogin.BLL.Helpers
{
    public static class CreateUserFromSocialLoginExtension
    {
        

        public static async Task<ApplicationUser> CreateUserFromSocialLogin(this UserManager<ApplicationUser> userManager, OAuthDbContext context, ApplicationUser model, string LoginProviderSubject)
        {

            var loginProvider = "Google";
            //CHECKS IF THE USER HAS NOT ALREADY BEEN LINKED TO AN IDENTITY PROVIDER
            var user = await userManager.FindByLoginAsync(loginProvider,LoginProviderSubject);

            if (user is not null)
                return user; //USER ALREADY EXISTS.

            user = await userManager.FindByEmailAsync(model.Email);

            if (user is null)
            {
                user = new ApplicationUser
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    UserName = model.Email,
                    IsActivated = model.IsActivated,
                    CreatedDate = model.CreatedDate,
                };

                await userManager.CreateAsync(user);

                await userManager.AddToRoleAsync(user, "User");

                //EMAIL IS CONFIRMED; IT IS COMING FROM AN IDENTITY PROVIDER
                user.EmailConfirmed = true;

                await userManager.UpdateAsync(user);
                await context.SaveChangesAsync();
            }

            UserLoginInfo userLoginInfo = null;


            userLoginInfo = new UserLoginInfo(loginProvider, LoginProviderSubject, loginProvider.ToUpper());



            //ADDS THE USER TO AN IDENTITY PROVIDER
            var result = await userManager.AddLoginAsync(user, userLoginInfo);

            if (result.Succeeded)
                return user;

            else
                return null;
        }
    }
}
