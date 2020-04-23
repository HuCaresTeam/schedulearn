using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulearnBackend.Migrations
{
    public partial class AddedTopic4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Topics_TopicId",
                table: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Topics_TopicId",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "Topics");

            migrationBuilder.AddColumn<int>(
                name: "ParentTopicId",
                table: "Topics",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Topics_ParentTopicId",
                table: "Topics",
                column: "ParentTopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Topics_ParentTopicId",
                table: "Topics",
                column: "ParentTopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Topics_ParentTopicId",
                table: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Topics_ParentTopicId",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "ParentTopicId",
                table: "Topics");

            migrationBuilder.AddColumn<int>(
                name: "TopicId",
                table: "Topics",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Topics_TopicId",
                table: "Topics",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Topics_TopicId",
                table: "Topics",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
