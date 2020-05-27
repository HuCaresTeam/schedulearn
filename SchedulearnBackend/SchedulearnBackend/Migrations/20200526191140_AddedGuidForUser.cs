using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedGuidForUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RegistrationGuid",
                table: "Users",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationGuid",
                value: new Guid("e4e131ee-6a7b-40d6-a6a8-cfbd32997a2a"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "RegistrationGuid",
                value: new Guid("5f4bfdaf-8b11-4df1-becf-fd31b1c47f6a"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "RegistrationGuid",
                value: new Guid("3dcbf76f-45cf-404e-9270-9f947fd68b9b"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "RegistrationGuid",
                value: new Guid("41584cd2-08fb-4b9f-8f43-080cb62bc07a"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "RegistrationGuid",
                value: new Guid("1effd040-aed1-42b4-9379-7cc72f218a56"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "RegistrationGuid",
                value: new Guid("78b1ea94-52f7-4066-936c-3861d2062305"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "RegistrationGuid",
                value: new Guid("cb26fa8c-70c2-4922-ac4c-09dcfc6285f9"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "RegistrationGuid",
                value: new Guid("f23c837c-8992-495c-a092-9f54c2fcdbaf"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegistrationGuid",
                table: "Users");
        }
    }
}
