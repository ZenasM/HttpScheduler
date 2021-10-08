import { Component } from "@angular/core";
import { IHttpRecord } from "../models/http-record.model";
import { HttpRecordsService } from "./httpRecords.service";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent {
  public httpRecords: IHttpRecord[];

  constructor(private recordsService: HttpRecordsService) {
    this.recordsService.getRecords()
      .subscribe((records) => this.httpRecords = records);
  }

}
