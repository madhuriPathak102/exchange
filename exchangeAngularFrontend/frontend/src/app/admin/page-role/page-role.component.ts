import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-page-role',
  templateUrl: './page-role.component.html',
  styleUrls: ['./page-role.component.scss'],
})
export class PageRoleComponent implements OnInit {
  pageRoleFormGroup: FormGroup;
  roleList: any;
  roleOptions: any = [];
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<PageRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.pageRoleFormGroup = this._formBuilder.group({
      admin: ['', [Validators.required]],
    });
  }
  onSubmit() {
    Swal({
      title: 'Role Reset Access',
      text: 'Reset of role has been successfully updated',
      type: 'success',
      confirmButtonText: 'Close',
    });
  }
}
