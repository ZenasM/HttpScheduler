import { Component } from "@angular/core";
import { IHttpRecord } from "../shared/models/http-record.model";
import { HttpRecordService } from "./http-record.service";

@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.component.html"
})
export class SchedulerComponent {
  public httpRecords: IHttpRecord[];

  constructor(private recordsService: HttpRecordService) {
    this.recordsService.getRecords()
      .subscribe((records) => this.httpRecords = records);
  }

}
