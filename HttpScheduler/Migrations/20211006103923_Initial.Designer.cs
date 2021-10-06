﻿// <auto-generated />
using HttpScheduler.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace SchedulerApi.Migrations
{
    [DbContext(typeof(RecordContext))]
    [Migration("20211006103923_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HttpScheduler.Model.HttpRecord", b =>
                {
                    b.Property<int>("HttpRecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Body")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Method")
                        .HasColumnType("int");

                    b.Property<string>("Uri")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("HttpRecordId");

                    b.ToTable("HttpRecord");
                });
#pragma warning restore 612, 618
        }
    }
}
