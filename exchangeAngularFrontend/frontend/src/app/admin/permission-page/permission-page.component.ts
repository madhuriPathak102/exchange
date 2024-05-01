import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.scss'],
})
export class PermissionPageComponent implements OnInit {
  permissionPageFomData: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<PermissionPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.permissionPageFomData = this._formBuilder.group({
      fromRole: ['', [Validators.required]],
      toRole: ['', [Validators.required]],
    });
  }

  onSubmit() {
    Swal({
      title: 'Change Permission',
      text: 'Are you want to change current permission?',
      showCancelButton: true,
      confirmButtonText: 'Change Permission',
      cancelButtonText: 'Close',
    }).then(function () {
      Swal('Permission Updated', 'Successfully Updated', 'success');
    });
  }
}
