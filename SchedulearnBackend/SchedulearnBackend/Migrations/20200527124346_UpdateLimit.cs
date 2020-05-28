using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class UpdateLimit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Limits",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Limits");
        }
    }
}
