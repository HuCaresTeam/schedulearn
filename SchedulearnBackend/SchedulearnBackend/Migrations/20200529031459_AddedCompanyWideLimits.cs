using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedCompanyWideLimits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 3, 12, "Company wide limits" });

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "LimitOfConsecutiveLearningDays", "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 3, 2, 4, "Programer's limits" });

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "LimitOfConsecutiveLearningDays", "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerQuarter", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 2, 1, 3, 3, "Accountant's limits" });

            migrationBuilder.InsertData(
                table: "Limits",
                columns: new[] { "Id", "LimitOfConsecutiveLearningDays", "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerQuarter", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 4, 1, 2, 2, 2, "Financial analyst limits" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "LimitId",
                value: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 2, 4, "Programer's limits" });

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "LimitOfConsecutiveLearningDays", "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 2, 1, 3, "Accountant's limits" });

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "LimitOfConsecutiveLearningDays", "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerQuarter", "LimitOfLearningDaysPerYear", "Name" },
                values: new object[] { 1, 2, 2, 2, "Financial analyst limits" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "LimitId",
                value: null);
        }
    }
}
