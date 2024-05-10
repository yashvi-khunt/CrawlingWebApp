using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OAuthLogin.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_Job_Tables : Migration
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
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastExecuted = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_AspNetUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    ParamOrder = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_JobParameters_JobId",
                table: "JobParameters",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobResponses_JobParameterId",
                table: "JobResponses",
                column: "JobParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_CreatedById",
                table: "Jobs",
                column: "CreatedById");
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
