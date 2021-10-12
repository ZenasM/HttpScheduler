import { Component } from "@angular/core";
import { ConfigurationService } from "./shared/services/configuration.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "app";

  constructor() { }
  // TODO: Should we init ConfigService here?
}
