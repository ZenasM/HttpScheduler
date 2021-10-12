import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { SchedulerComponent } from "src/app/http-scheduler/scheduler.component";
import { SchedulerModule } from "src/app/http-scheduler/scheduler.module";
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { HomeComponent } from "./home/home.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    // SchedulerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
    }),

    AppRoutes,
    SharedModule.forRoot(),
    SchedulerModule,

    // RouterModule.forRoot([
    //   { path: "", component: HomeComponent, pathMatch: "full" },
    //   { path: "counter", component: CounterComponent },
    //   { path: "fetch-data", component: FetchDataComponent },
    //   { path: "scheduler", component: SchedulerComponent },
    // ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
