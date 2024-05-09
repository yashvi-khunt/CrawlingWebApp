using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OAuthLogin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class change_ParamOrder_in_JobResponse_to_Int : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "ParamOrder",
                table: "JobResponses",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3ea79330-9249-46ee-bc13-85cacc149a49", null, "User", null },
                    { "e95e4d1a-3d9f-4377-93c8-262bab017cb8", null, "Admin", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "36a66be9-dc6d-4078-ad11-e314236d81f1", 0, "895fd5e4-9fc5-4efe-9a6d-09c973155c84", new DateTime(2024, 5, 8, 17, 39, 11, 495, DateTimeKind.Local).AddTicks(6175), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEMtCIWcCJtZPrDUXP2CAxU27QSyh0Ifa1pSSNILLQgtckbHgR9G4kqi7S8VjHPtvFA==", null, false, "c13841ef-6e12-47dd-a0dc-8272773986eb", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "e95e4d1a-3d9f-4377-93c8-262bab017cb8", "36a66be9-dc6d-4078-ad11-e314236d81f1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ea79330-9249-46ee-bc13-85cacc149a49");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "e95e4d1a-3d9f-4377-93c8-262bab017cb8", "36a66be9-dc6d-4078-ad11-e314236d81f1" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e95e4d1a-3d9f-4377-93c8-262bab017cb8");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "36a66be9-dc6d-4078-ad11-e314236d81f1");

            migrationBuilder.AlterColumn<string>(
                name: "ParamOrder",
                table: "JobResponses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

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
    }
}
