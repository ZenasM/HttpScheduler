import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IConfiguration } from "../models/configuration.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {
  private settingsLoadedSource = new Subject();
  public settingsLoaded$ = this.settingsLoadedSource.asObservable();
  public isReady: boolean = false;
  public serverSettings: IConfiguration;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.load();
  }

  private load(): void {
    const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
    let url = `${baseURI}Home/Configuration`;
    this.http.get(url).subscribe((response: IConfiguration) => {
      this.serverSettings = response;
      console.log('server settings loaded', response);
      //this.serverSettings = response as IConfiguration;
      //console.log(this.serverSettings);
      //this.storageService.store('identityUrl', this.serverSettings.identityUrl);
      //this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
      //this.storageService.store('signalrHubUrl', this.serverSettings.signalrHubUrl);
      //this.storageService.store('activateCampaignDetailFunction', this.serverSettings.activateCampaignDetailFunction);
      this.isReady = true;
      //this.settingsLoadedSource.next();
    });
  }
}
