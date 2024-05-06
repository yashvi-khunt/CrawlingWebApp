using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OAuthLogin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class change_field_name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94a5ff6f-e874-4d2a-8df7-bd99a0bc84be");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "186a38bc-0016-4523-8f7a-445099c04ed0", "af4e53c2-e353-46a1-8611-e64fc83a8815" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "186a38bc-0016-4523-8f7a-445099c04ed0");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "af4e53c2-e353-46a1-8611-e64fc83a8815");

            migrationBuilder.RenameColumn(
                name: "Order",
                table: "JobResponses",
                newName: "ParamOrder");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "015a9111-4ff1-4a3c-8be9-be17e316d54d", null, "User", null },
                    { "bfe0aad1-d739-4ee8-ad4e-aaf3b87de946", null, "Admin", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "695a5676-65e6-4587-9353-916b38852796", 0, "68e850ac-f02c-4cd5-80c5-2a9d26ec2844", new DateTime(2024, 5, 3, 17, 3, 3, 227, DateTimeKind.Local).AddTicks(4645), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEHlKlbaxg/S/BmxcAkUlINKCQhg0x6ra81QiCY1CYnFl/kRDdn/dSUo9Tj1sPJ/jSQ==", null, false, "7a6f343e-175a-4054-a009-06dc273ec906", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "bfe0aad1-d739-4ee8-ad4e-aaf3b87de946", "695a5676-65e6-4587-9353-916b38852796" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "015a9111-4ff1-4a3c-8be9-be17e316d54d");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "bfe0aad1-d739-4ee8-ad4e-aaf3b87de946", "695a5676-65e6-4587-9353-916b38852796" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bfe0aad1-d739-4ee8-ad4e-aaf3b87de946");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "695a5676-65e6-4587-9353-916b38852796");

            migrationBuilder.RenameColumn(
                name: "ParamOrder",
                table: "JobResponses",
                newName: "Order");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "186a38bc-0016-4523-8f7a-445099c04ed0", null, "Admin", null },
                    { "94a5ff6f-e874-4d2a-8df7-bd99a0bc84be", null, "User", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "af4e53c2-e353-46a1-8611-e64fc83a8815", 0, "0a43f74f-8868-4e12-be4c-9879b07c125c", new DateTime(2024, 5, 3, 15, 54, 8, 466, DateTimeKind.Local).AddTicks(5664), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEGQrGIuyXkWu6wxH5PPJ/+wZnaePFNIwnrwd0lVORE1hpbcKzvU3kFBYfC0RpN+etQ==", null, false, "ca9647aa-4fd3-4f48-8e36-90211e912336", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "186a38bc-0016-4523-8f7a-445099c04ed0", "af4e53c2-e353-46a1-8611-e64fc83a8815" });
        }
    }
}
