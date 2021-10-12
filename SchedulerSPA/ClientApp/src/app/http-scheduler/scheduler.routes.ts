import { RouterModule, Routes } from "@angular/router";
import { HttpRecordFormComponent } from "src/app/http-scheduler/http-record-form/http-record-form.component";
import { HttpRecordComponent } from "src/app/http-scheduler/http-record/http-record.component";
import { SchedulerComponent } from "src/app/http-scheduler/scheduler.component";

export const routes: Routes = [
    { path: "scheduler", component: SchedulerComponent, children: [
        { path: "", component: HttpRecordComponent, outlet: "scheduler" },
        { path: "record", component: HttpRecordFormComponent, outlet: "scheduler" },
        { path: "record/:id", component: HttpRecordFormComponent, outlet: "scheduler" },
    ]},
];

export const SchedulerRoutes = RouterModule.forChild(routes);
