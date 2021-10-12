import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConfigurationService } from "src/app/shared/services/configuration.service";
import { DataService } from "src/app/shared/services/data.service";
import { StorageService } from "src/app/shared/services/storage.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // No need to export as these modules don't expose any components/directive etc'
        HttpClientModule,
        HttpClientJsonpModule
    ],
    declarations: [
        // Pager,
        // Header,
        // Identity,
        // PageNotFoundComponent,
        // UppercasePipe
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // Providers, Components, directive, pipes
        // Pager,
        // Header,
        // Identity,
        // PageNotFoundComponent,
        // UppercasePipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers
                DataService,
                ConfigurationService,
                StorageService,
            ]
        };
    }
}
