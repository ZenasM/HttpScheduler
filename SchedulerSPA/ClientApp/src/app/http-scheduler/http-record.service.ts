import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { IHttpRecord } from "../shared/models/http-record.model";
import { ConfigurationService } from "../shared/services/configuration.service";
import { DataService } from "../shared/services/data.service";

@Injectable()
export class HttpRecordService {
    private recordsUrl = "";
    private endpoint = "/api/HttpRecords/";

    constructor(private service: DataService) {
        this.recordsUrl = environment.schedulerUrl;
    }

    public getRecord(id: number): Observable<IHttpRecord> {
        const url = `${this.recordsUrl}${this.endpoint}${id}`;

        return this.service.get(url).pipe<IHttpRecord>(
            tap((response: any) => {
                return response;
            })
        );
    }

    public getRecords(): Observable<IHttpRecord[]> {
        const url = `${this.recordsUrl}${this.endpoint}`;

        return this.service.get(url).pipe<IHttpRecord[]>(
            tap((response: any) => {
                return response;
            })
        );
    }

    public addRecord(record: IHttpRecord): Observable<IHttpRecord> {
        const url = `${this.recordsUrl}${this.endpoint}`;

        return this.service.post(url, record).pipe<IHttpRecord>(
            tap((response: any) => {
                return response;
            })
        );
    }

    public editRecord(id: number, record: IHttpRecord): Observable<IHttpRecord> {
        const url = `${this.recordsUrl}${this.endpoint}${id}`;

        return this.service.putWithId(url, record).pipe<IHttpRecord>(
            tap((response: any) => {
                return response;
            })
        );
    }

    public deleteRecord(id: number): void {
        const url = `${this.recordsUrl}${this.endpoint}${id}`;
        this.service.delete(url);
    }
}
