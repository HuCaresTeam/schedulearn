using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedHashedPasswords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Programer's limits");

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Accountant's limits");

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Financial analyst limits");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw="});

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Password" },
                values: new object[] { "nFPklLJY0yznpMS5Zdu9pNRJG+ZOaFCbFI+R+huBGFw=" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: null);

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: null);

            migrationBuilder.UpdateData(
                table: "Limits",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: null);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "Password",
                value: "123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "Password",
                value: "123");
        }
    }
}
