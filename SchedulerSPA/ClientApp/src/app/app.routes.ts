import { RouterModule, Routes } from "@angular/router";
import { CounterComponent } from "src/app/counter/counter.component";
import { FetchDataComponent } from "src/app/fetch-data/fetch-data.component";
import { HomeComponent } from "src/app/home/home.component";

export const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "counter", component: CounterComponent },
    { path: "fetch-data", component: FetchDataComponent },
];

export const AppRoutes = RouterModule.forRoot(routes);
