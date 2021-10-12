import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IConfiguration } from "../models/configuration.model";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: "root",
})
export class ConfigurationService {
    private settingsLoadedSource = new Subject();
    public settingsLoaded$ = this.settingsLoadedSource.asObservable();
    public isReady = false;
    public serverSettings: IConfiguration;

    constructor(private http: HttpClient,
                private storageService: StorageService) {
        this.load();
    }

    private load(): void {
        const baseURI = document.baseURI.endsWith("/")
            ? document.baseURI
            : `${document.baseURI}/`;
        const url = `${baseURI}Home/Configuration`;
        this.http.get(url).subscribe((response: IConfiguration) => {
            this.serverSettings = response;
            console.log("Server settings loaded.", this.serverSettings);
            this.isReady = true;
            this.settingsLoadedSource.next();
        });
    }
}
