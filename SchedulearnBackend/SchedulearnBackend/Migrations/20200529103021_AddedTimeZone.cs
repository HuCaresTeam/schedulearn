using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedTimeZone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimezoneMinutes",
                table: "LearningDays",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 1,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 2,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 3,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 4,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 5,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 6,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 7,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 8,
                column: "TimezoneMinutes",
                value: 180);

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 9,
                column: "TimezoneMinutes",
                value: 180);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimezoneMinutes",
                table: "LearningDays");
        }
    }
}
