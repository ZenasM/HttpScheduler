# HttpScheduler
A basic HTTP request scheduler POC. Included is a .NET Core API, a simple SPA for CRUD operations, and an sample Executor service.

## SchedulerApi
This project uses EF Core Migrations. 
Configure a database on appsettings.json and create/update your database. 
More information regarding migrations can be found [here](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/).

Build and run the SchedulerApi project. This will expose an API endpoint allowing CRUD operations on an HttpRecord.

## SchedulerSpa
Build and run the SchedulerSpa project. This will open a SPA running on Angular.

Navigating to the "/scheduler" path shows components where you can run CRUD operations on HttpRecords exposed by the SchedulerApi.

Modify the `src/environment/environment.ts` file if you're having problems with connecting to the SchedulerApi endpoints.

## HttpExecutor
This is a sample service that executes HttpRecords.
The service polls the SchedulerApi for requests that are soon to be scheduled to be run and runs those requests.
There is both a Channel and TPL example of handling requests.
