import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "src/app/shared/shared.module";
import { HttpRecordFormComponent } from "./http-record-form/http-record-form.component";
import { HttpRecordService } from "./http-record.service";
import { HttpRecordComponent } from "./http-record/http-record.component";
import { SchedulerComponent } from "./scheduler.component";
import { SchedulerRoutes } from "./scheduler.routes";

@NgModule({
    imports: [BrowserModule, SharedModule, SchedulerRoutes],
    declarations: [
        SchedulerComponent,
        HttpRecordComponent,
        HttpRecordFormComponent,
    ],
    providers: [HttpRecordService],
})
export class SchedulerModule {}
