import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IHttpRecord } from '../models/http-record.model';
import { ConfigurationService } from '../services/configuration.service';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: "root"
})
export class HttpRecordsService {
  private recordsUrl: string = '';

  constructor(private service: DataService, private configurationService: ConfigurationService) {
    this.recordsUrl = this.configurationService.serverSettings.schedulerUrl;

    //if (this.configurationService.isReady)
    //  this.ordersUrl = this.configurationService.serverSettings.schedulerUrl;
    //else
    //  this.configurationService.settingsLoaded$.subscribe(x => this.ordersUrl = this.configurationService.serverSettings.schedulerUrl);

  }

  public getRecords(): Observable<IHttpRecord[]> {
    let url = this.recordsUrl + '/api/HttpRecords/';

    return this.service.get(url).pipe<IHttpRecord[]>(tap((response: any) => {
      return response;
    }));
  }

  //public cancelOrder(orderNumber: number): Observable<any> {
  //  let url = this.recordsUrl + '/o/api/v1/orders/cancel';
  //  let data = { OrderNumber: orderNumber };

  //  return this.service.putWithId(url, data).pipe<any>(tap(() => {
  //    return;
  //  }));
  //}

  public getRecord(id: number): Observable<IHttpRecord> {
    let url = this.recordsUrl + '/api/HttpRecords/' + id;

    return this.service.get(url).pipe<IHttpRecord>(tap((response: any) => {
      return response;
    }));
  }

}

