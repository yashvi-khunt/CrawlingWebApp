using OAuthLogin.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace OAuthLogin.DAL.Helper
{
    public partial class OAuthDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<LoginHistory> LoginHistories { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobParameter> JobParameters { get; set; }
        public DbSet<JobResponse> JobResponses { get; set; }
        public OAuthDbContext(DbContextOptions<OAuthDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Seed Roles
            var adminRole = new IdentityRole("Admin");

            // Add normalised name in migrations
            builder.Entity<IdentityRole>().HasData(
               adminRole,
                new IdentityRole { Name = "User" }
                );

            //a hasher to hash the password before seeding the user to the db
            var hasher = new PasswordHasher<IdentityUser>();


            //Seeding the User to AspNetUsers table
            var admin = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                PasswordHash = hasher.HashPassword(null, "Admin@123"),
                Email = "Admin@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                EmailConfirmed = true,
                IsActivated = true,
                CreatedDate = DateTime.Now,
            };
            builder.Entity<ApplicationUser>().HasData(admin);


            //Seeding the relation between our user and role to AspNetUserRoles table
            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = adminRole.Id,
                    UserId = admin.Id
                }
            );
        }
    }
}

