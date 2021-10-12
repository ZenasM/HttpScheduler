using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SchedulerApi.Migrations
{
    public partial class HttpRecordmodelchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "HttpRecord",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Time",
                table: "HttpRecord",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "HttpRecord",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "HttpRecord");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "HttpRecord");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "HttpRecord");
        }
    }
}
