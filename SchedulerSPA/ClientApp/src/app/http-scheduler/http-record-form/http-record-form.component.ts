import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs/operators";
import { HttpMethod, IHttpRecord } from "src/app/shared/models/http-record.model";
import { HttpRecordService as HttpRecordService } from "../http-record.service";

@Component({
    selector: "app-http-record-form",
    templateUrl: "./http-record-form.component.html"
})
export class HttpRecordFormComponent implements OnInit {
    public recordForm: FormGroup;
    public isEdit: boolean = false;
    public httpMethods = HttpMethod;
    private httpRecord: IHttpRecord = <IHttpRecord>{};

    constructor(private recordService: HttpRecordService,
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private toastr: ToastrService) {
        this.recordForm = this.fb.group({
            time  : [new Date().toISOString().slice(0, -1), Validators.required],
            method: [HttpMethod.GET, Validators.required],
            uri   : ["", Validators.required],
            token : [""],
            body  : [""],
        });
    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params["id"]) {
                this.isEdit = true;
                const id = +params["id"]; // (+) converts string 'id' to a number
                this.recordService.getRecord(id).subscribe((data) => { this.httpRecord = data; this.fillForm(this.httpRecord); });
            }
        });
    }

    public submit(): void {
        this.httpRecord.time = this.recordForm.controls["time"].value;
        this.httpRecord.method = this.recordForm.controls["method"].value;
        this.httpRecord.uri = this.recordForm.controls["uri"].value;
        this.httpRecord.token = this.recordForm.controls["token"].value;
        this.httpRecord.body = this.recordForm.controls["body"].value;
        if (this.isEdit) {
            this.recordService.editRecord(this.httpRecord.httpRecordId, this.httpRecord).subscribe((data) => {
                this.toastr.success("Success!");
                console.log(data);
                this.router.navigate(["/scheduler"]);
            });
        } else {
            this.recordService.addRecord(this.httpRecord).subscribe((data) => {
                this.toastr.success("Success!");
                console.log(data);
                this.router.navigate(["/scheduler"]);
            });
        }
    }

    public delete(): void {
        this.recordService.deleteRecord(this.httpRecord.httpRecordId);
        this.toastr.success("Success!");
        this.router.navigate(["/scheduler"]);
    }

    protected fillForm(record: IHttpRecord): void {
        const tempTime = new Date(record.time);
        const dateTimeLocalValue = (new Date(tempTime.getTime() - tempTime.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
        this.recordForm.controls["time"].setValue(dateTimeLocalValue);
        this.recordForm.controls["method"].setValue(record.method);
        this.recordForm.controls["uri"].setValue(record.uri);
        this.recordForm.controls["token"].setValue(record.token);
        this.recordForm.controls["body"].setValue(record.body);
    }
}
