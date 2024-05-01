import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { PageRoleComponent } from '../page-role/page-role.component';
import { PermissionPageComponent } from '../permission-page/permission-page.component';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-rolepermission',
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.scss'],
})
export class RolepermissionComponent implements OnInit {
  selectRole: any;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  openPageRoleDialog(): void {
    const dialogRef = this.dialog.open(PageRoleComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
        }
      },
    });
  }
  openPermissionPageRoleDialog(): void {
    const dialogRef = this.dialog.open(PermissionPageComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
        }
      },
    });
  }
  openCreateRoleDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
        }
      },
    });
  }
}
