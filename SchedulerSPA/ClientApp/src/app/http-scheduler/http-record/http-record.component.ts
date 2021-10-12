import { Component } from "@angular/core";
import { HttpRecordService } from "src/app/http-scheduler/http-record.service";
import { IHttpRecord } from "src/app/shared/models/http-record.model";

@Component({
  selector: "app-http-record",
  templateUrl: "./http-record.component.html"
})
export class HttpRecordComponent {
  public httpRecords: IHttpRecord[];

  constructor(private recordsService: HttpRecordService) {
    this.recordsService.getRecords()
      .subscribe((records) => this.httpRecords = records);
  }

}
