using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OAuthLogin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_UpdatedBy_Date_Fields_in_Job : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Jobs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "Jobs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4cb468ac-fd4a-4181-9ae9-6023e37e590a", null, "User", null },
                    { "e2e3ec1a-a06b-4517-b045-100418dcec91", null, "Admin", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "b46329ec-5eaa-4b77-9679-663aaf4a166b", 0, "1cca9e45-1cbc-4ece-bf88-3908bf422c76", new DateTime(2024, 5, 22, 11, 1, 0, 590, DateTimeKind.Local).AddTicks(8149), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEBsDFB6c4PqQg9kJoibdDKYec/GddtMIfXverHLzYdP29n/AOkZpEAi4VnxOHoIwKg==", null, false, "38fe5398-23b2-422c-ae02-a3bbff819a9f", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "e2e3ec1a-a06b-4517-b045-100418dcec91", "b46329ec-5eaa-4b77-9679-663aaf4a166b" });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_UpdatedById",
                table: "Jobs",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_UpdatedById",
                table: "Jobs",
                column: "UpdatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_UpdatedById",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_UpdatedById",
                table: "Jobs");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4cb468ac-fd4a-4181-9ae9-6023e37e590a");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "e2e3ec1a-a06b-4517-b045-100418dcec91", "b46329ec-5eaa-4b77-9679-663aaf4a166b" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2e3ec1a-a06b-4517-b045-100418dcec91");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b46329ec-5eaa-4b77-9679-663aaf4a166b");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Jobs");

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
    }
}
