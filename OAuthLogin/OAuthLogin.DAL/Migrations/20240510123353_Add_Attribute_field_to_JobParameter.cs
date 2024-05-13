using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OAuthLogin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_Attribute_field_to_JobParameter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ef33b5d7-1678-41ef-b246-51aff1376ee9");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "79ab6df2-c982-4c5f-a246-779a5b92a0fd", "22d0f874-6f4a-4451-8212-8c2d905d0ab2" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79ab6df2-c982-4c5f-a246-779a5b92a0fd");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "22d0f874-6f4a-4451-8212-8c2d905d0ab2");

            migrationBuilder.AddColumn<string>(
                name: "Attribute",
                table: "JobParameters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4d60fc01-913f-4e1e-b3bf-25969a46eb0f", null, "User", null },
                    { "be8127dd-276a-46a3-8054-d8adcaebbcc3", null, "Admin", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "9d615650-de58-4bed-8135-011a466e1878", 0, "c6a8f0a1-5430-4b15-91ee-5da8ab133215", new DateTime(2024, 5, 10, 18, 3, 51, 841, DateTimeKind.Local).AddTicks(6172), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAENChsxVrfGWly8WZU83b7Cxr3TLk92XO7E4hhJZY+y1JGcIWuR4yH2477yp0dOTguw==", null, false, "5b9374ae-9738-453f-a4ec-13cb43d51e04", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "be8127dd-276a-46a3-8054-d8adcaebbcc3", "9d615650-de58-4bed-8135-011a466e1878" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d60fc01-913f-4e1e-b3bf-25969a46eb0f");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "be8127dd-276a-46a3-8054-d8adcaebbcc3", "9d615650-de58-4bed-8135-011a466e1878" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be8127dd-276a-46a3-8054-d8adcaebbcc3");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9d615650-de58-4bed-8135-011a466e1878");

            migrationBuilder.DropColumn(
                name: "Attribute",
                table: "JobParameters");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "79ab6df2-c982-4c5f-a246-779a5b92a0fd", null, "Admin", null },
                    { "ef33b5d7-1678-41ef-b246-51aff1376ee9", null, "User", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "22d0f874-6f4a-4451-8212-8c2d905d0ab2", 0, "dcffdb33-7e81-4d0a-a9a2-f0ecafeb7ea2", new DateTime(2024, 5, 10, 13, 5, 4, 684, DateTimeKind.Local).AddTicks(1492), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEGtLTQFg0gg76k1WhPliYEgz1asYmhBcnm/Hq+QAmaoMEsvxUxDtenKwMP5hJu9p9g==", null, false, "e28ce2c9-bb4c-4693-afde-92267b708d10", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "79ab6df2-c982-4c5f-a246-779a5b92a0fd", "22d0f874-6f4a-4451-8212-8c2d905d0ab2" });
        }
    }
}
