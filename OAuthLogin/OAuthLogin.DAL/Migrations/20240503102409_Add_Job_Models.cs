using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OAuthLogin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_Job_Models : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b125c38-95e7-452e-9878-d4889c61fcb2");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "0367e3a5-748c-4b88-b4e8-a07a16f91b1c", "7d7d76ff-837b-4915-8f0e-72bd8fbe1ffc" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0367e3a5-748c-4b88-b4e8-a07a16f91b1c");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7d7d76ff-837b-4915-8f0e-72bd8fbe1ffc");

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LevelXPath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobParameters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    ParameterName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    XPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLevelParameter = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobParameters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobParameters_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobParameterId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Order = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobResponses_JobParameters_JobParameterId",
                        column: x => x.JobParameterId,
                        principalTable: "JobParameters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_JobParameters_JobId",
                table: "JobParameters",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobResponses_JobParameterId",
                table: "JobResponses",
                column: "JobParameterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobResponses");

            migrationBuilder.DropTable(
                name: "JobParameters");

            migrationBuilder.DropTable(
                name: "Jobs");

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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0367e3a5-748c-4b88-b4e8-a07a16f91b1c", null, "Admin", null },
                    { "3b125c38-95e7-452e-9878-d4889c61fcb2", null, "User", null }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "FirstName", "IsActivated", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "7d7d76ff-837b-4915-8f0e-72bd8fbe1ffc", 0, "b0ccc8b0-441c-4ee1-9b33-c203e80656bf", new DateTime(2024, 4, 23, 15, 43, 31, 971, DateTimeKind.Local).AddTicks(4418), "Admin@example.com", true, null, true, null, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEI9NK9oy/OIQo4gEB9kDOHCLmK8qtLw5K4eHUlhAz0wZVDJDEM7PGvdX32czOW9wAQ==", null, false, "b6b6b7e1-75d4-4bc6-aa9e-be2523b46cf5", false, "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "0367e3a5-748c-4b88-b4e8-a07a16f91b1c", "7d7d76ff-837b-4915-8f0e-72bd8fbe1ffc" });
        }
    }
}
