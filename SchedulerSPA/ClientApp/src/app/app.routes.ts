import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "src/app/counter/counter.component";
import { FetchDataComponent } from "src/app/fetch-data/fetch-data.component";
import { HomeComponent } from "src/app/home/home.component";
import { SchedulerComponent } from "src/app/http-scheduler/scheduler.component";
import { HttpRecordFormComponent } from "./http-scheduler/http-record-form/http-record-form.component";
import { HttpRecordComponent } from "./http-scheduler/http-record/http-record.component";

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "counter", component: CounterComponent },
    { path: "fetch-data", component: FetchDataComponent },

    // { path: "scheduler", component: SchedulerComponent, children: [
    //     { path: "", redirectTo: "view", pathMatch: "full" },
    //     { path: "view", component: HttpRecordComponent, outlet: "scheduler" },
    //     { path: "record", component: HttpRecordFormComponent, outlet: "scheduler" },
    // ]},

    // { path: "record", component: HttpRecordFormComponent, outlet: "scheduler" },
    // { path: "", redirectTo: "catalog", pathMatch: "full" },
    // { path: "basket", component: BasketComponent },
    // { path: "catalog", component: CatalogComponent },
    // { path: "orders", component: OrdersComponent },
    // { path: "orders/:id", component: OrdersDetailComponent },
    // { path: "order", component: OrdersNewComponent },
];

export const AppRoutes = RouterModule.forRoot(routes);
// { relativeLinkResolution: "legacy" }
