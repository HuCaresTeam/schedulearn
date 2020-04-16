using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedTopic6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discription",
                table: "Topics");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Topics",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Topics");

            migrationBuilder.AddColumn<string>(
                name: "Discription",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
