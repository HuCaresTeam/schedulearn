using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedTeams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "LimitId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Limits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LimitOfConsecutiveLearningDays = table.Column<int>(nullable: false),
                    LimitOfLearningDaysPerMonth = table.Column<int>(nullable: false),
                    LimitOfLearningDaysPerQuarter = table.Column<int>(nullable: false),
                    LimitOfLearningDaysPerYear = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Limits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LimitId = table.Column<int>(nullable: false),
                    ManagerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Teams_Limits_LimitId",
                        column: x => x.LimitId,
                        principalTable: "Limits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Teams_Users_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "CEO");

            migrationBuilder.UpdateData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "CTO");

            migrationBuilder.InsertData(
                table: "JobTitles",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { 7, "Financial analyst" },
                    { 3, "CFO" },
                    { 5, "Database analyst" },
                    { 4, "Software developer" },
                    { 6, "Accountant" }
                });

            migrationBuilder.InsertData(
                table: "Limits",
                columns: new[] { "Id", "LimitOfConsecutiveLearningDays", "LimitOfLearningDaysPerMonth", "LimitOfLearningDaysPerQuarter", "LimitOfLearningDaysPerYear" },
                values: new object[,]
                {
                    { 1, 3, 2, 3, 4 },
                    { 2, 2, 1, 3, 3 },
                    { 3, 1, 2, 2, 2 }
                });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Learning description", "Learning" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Programming description", "Programming" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name", "ParentTopicId" },
                values: new object[] { "Object oriented programming description", "Object oriented programming", 2 });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name", "ParentTopicId" },
                values: new object[] { "Procedural programming description", "Procedural programming", 2 });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "Name", "ParentTopicId" },
                values: new object[,]
                {
                    { 5, "Java description", "Java", 3 },
                    { 7, "C description", "C", 4 },
                    { 8, "Pascal description", "Pascal", 4 },
                    { 9, "Finances description", "Finances", 1 },
                    { 6, "C# description", "C#", 3 }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "Name", "Surname" },
                values: new object[] { "Vadovu.Vadovas@schedulearn.com", "Vadovu", "Vadovas" });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "LimitId", "ManagerId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 2 }
                });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "Name", "ParentTopicId" },
                values: new object[,]
                {
                    { 10, "Corporate finance description", "Corporate finance", 9 },
                    { 11, "Public finance description", "Public finance", 9 }
                });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "Name", "ParentTopicId" },
                values: new object[,]
                {
                    { 12, "Short term financial management description", "Short term financial management", 10 },
                    { 16, "Longer term financial management description", "Longer term financial management", 10 },
                    { 20, "Identification of required expenditure of a public sector entity description", "Identification of required expenditure of a public sector entity", 11 },
                    { 21, "Sources of entity's revenue description", "Sources of entity's revenue", 11 },
                    { 22, "Debt issuance for public works projects description", "Debt issuance for public works projects", 11 }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "Name", "Surname", "TeamId" },
                values: new object[] { "Technologiju.Vadovas@schedulearn.com", "Technologiju", "Vadovas", 1 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "JobTitleId", "LimitId", "Name", "Password", "Surname", "TeamId" },
                values: new object[,]
                {
                    { 3, "Finansu.Vadovas@schedulearn.com", 3, null, "Finansu", null, "Vadovas", 1 },
                    { 4, "Vardenis.Pavardenis@schedulearn.com", 4, null, "Vardenis", null, "Pavardenis", 2 },
                    { 5, "Petras.Petrauskas@schedulearn.com", 4, null, "Petras", null, "Petrauskas", 2 },
                    { 6, "Jonas.Jonauskas@schedulearn.com", 5, 3, "Jonas", null, "Jonauskas", 2 }
                });

            migrationBuilder.UpdateData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "TopicId", "UserId" },
                values: new object[] { "Mokausi Object oriented programming", 2, 4 });

            migrationBuilder.InsertData(
                table: "LearningDays",
                columns: new[] { "Id", "DateFrom", "DateTo", "Description", "TopicId", "UserId" },
                values: new object[,]
                {
                    { 2, new DateTime(2020, 4, 26, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified), "Mokausi Java", 4, 4 },
                    { 3, new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 17, 0, 0, 0, DateTimeKind.Unspecified), "Mokausi C#", 5, 4 },
                    { 4, new DateTime(2020, 4, 27, 11, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 27, 14, 30, 0, 0, DateTimeKind.Unspecified), "Mokausi Procedural programming", 3, 4 },
                    { 5, new DateTime(2020, 4, 26, 10, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 18, 0, 0, 0, DateTimeKind.Unspecified), "Mokausi Object oriented programming", 2, 5 },
                    { 6, new DateTime(2020, 4, 27, 13, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 16, 30, 0, 0, DateTimeKind.Unspecified), "Mokausi C#", 5, 5 },
                    { 7, new DateTime(2020, 4, 26, 10, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 13, 0, 0, 0, DateTimeKind.Unspecified), "Mokausi Capital budgeting", 16, 3 }
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "LimitId", "ManagerId" },
                values: new object[] { 3, 3, 3 });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "Name", "ParentTopicId" },
                values: new object[,]
                {
                    { 13, "Debtors management description", "Debtors management", 12 },
                    { 14, "Inventory management description", "Inventory management", 12 },
                    { 15, "Cash management description", "Cash management", 12 },
                    { 17, "Capital budgeting description", "Capital budgeting", 16 },
                    { 18, "Sources of capital description", "Sources of capital", 16 },
                    { 19, "Dividend policy description", "Dividend policy", 16 }
                });

            migrationBuilder.InsertData(
                table: "LearningDays",
                columns: new[] { "Id", "DateFrom", "DateTo", "Description", "TopicId", "UserId" },
                values: new object[,]
                {
                    { 8, new DateTime(2020, 4, 26, 14, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified), "Mokausi Sources of capital", 17, 3 },
                    { 9, new DateTime(2020, 4, 26, 15, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 26, 17, 0, 0, 0, DateTimeKind.Unspecified), "Mokausi Dividend policy", 18, 3 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "JobTitleId", "LimitId", "Name", "Password", "Surname", "TeamId" },
                values: new object[,]
                {
                    { 7, "Tomas.Tomauskas@schedulearn.com", 6, null, "Tomas", null, "Tomauskas", 3 },
                    { 8, "John.Cena@schedulearn.com", 7, null, "John", null, "Cena", 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_LimitId",
                table: "Users",
                column: "LimitId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TeamId",
                table: "Users",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_LimitId",
                table: "Teams",
                column: "LimitId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ManagerId",
                table: "Teams",
                column: "ManagerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Limits_LimitId",
                table: "Users",
                column: "LimitId",
                principalTable: "Limits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Limits_LimitId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Limits");

            migrationBuilder.DropIndex(
                name: "IX_Users_LimitId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_TeamId",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "LearningDays",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LimitId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "Software developer");

            migrationBuilder.UpdateData(
                table: "JobTitles",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "Accountant");

            migrationBuilder.InsertData(
                table: "LearningDays",
                columns: new[] { "Id", "DateFrom", "DateTo", "Description", "TopicId", "UserId" },
                values: new object[] { 1, new DateTime(2020, 4, 25, 16, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 4, 25, 17, 30, 0, 0, DateTimeKind.Unspecified), "Mokausi", 3, 1 });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name" },
                values: new object[] { "aaaa", "AAAA" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name" },
                values: new object[] { "bbbb", "BBBB" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name", "ParentTopicId" },
                values: new object[] { "cccc", "CCCC", 1 });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name", "ParentTopicId" },
                values: new object[] { "dddd", "DDDD", 3 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "Surname" },
                values: new object[] { "Vardenis", "Pavardenis" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "Surname" },
                values: new object[] { "John", "Cena" });
        }
    }
}
