
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OAuthLogin.BLL.Mapper;
using OAuthLogin.BLL.Repositories;
using OAuthLogin.BLL.Services;
using OAuthLogin.BLL.SQLRepository;
using OAuthLogin.DAL.Helper;
using OAuthLogin.DAL.Models;

namespace OAuthLogin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddAutoMapper(typeof(MappingProfile));

            //Identity
            builder.Services.AddDbContext<OAuthDbContext>(
               options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<OAuthDbContext>()
            .AddDefaultTokenProviders();

            //Email Configuration
            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
            builder.Services.AddTransient<IEmailService, EmailService>();
            //  builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IProcedureManager, ProcedureManager>();
            builder.Services.AddTransient<ILoginHistoryService, LoginHistoryService>();



            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
.AddCookie().AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
                googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
                googleOptions.SignInScheme = IdentityConstants.ExternalScheme;
            });


            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true;

                // Default Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;
            });

            builder.Services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromDays(1));

            //CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });



            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
