import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgentComponent } from '../agent/agent.component';
import { CreatorComponent } from '../creator/creator.component';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent {
  roleTypeFormGroup: FormGroup;
  searchFormGroup: FormGroup;
  userListOptions: any[] = [];
  roleOptions: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.roleTypeFormGroup = this._formBuilder.group({
      role: ['', [Validators.required]],
    });
    this.searchFormGroup = this._formBuilder.group({
      selectedParameter: ['', [Validators.required]],
      slectedValue: ['', [Validators.required]],
    });
    this.fetchUserList();
    this.getRoleList();
    this.search();
  }
  openDialog() {
    if (this.roleTypeFormGroup.value.role == 'agent') {
      this.getDialogAgent();
    } else {
      this.getDialogCreator();
    }
  }
  getDialogCreator(): void {
    const dialogRef = this.dialog.open(CreatorComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.fetchUserList();
        }
      },
    });
  }
  getDialogAgent() {
    const dialogRef = this.dialog.open(AgentComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.fetchUserList();
        }
      },
    });
  }
  object = {
    page: 1,
    perPage: 10,
  };
  totalElements: any = 1;
  public peginator(event: PageEvent) {
    this.object = {
      page: event.pageIndex + 1,
      perPage: event.pageSize,
    };
    this.search();
  }
  search() {
    this.userService
      .commonGetAPI(
        `admin/agent/list?show_row=${this.object.perPage}&page=${this.object.page}&key=${this.searchFormGroup.value.selectedParameter}&value=${this.searchFormGroup.value.slectedValue}`
      )
      .subscribe({
        next: (res) => {
          if (res.body.status == true) {
            this.totalElements = res.body.data.total;
            this.userListOptions = res.body.data.data;
          } else {
            this.totalElements = 1;
            this.userListOptions = [];
            this.toastr.error(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  fetchUserList() {
    this.userService.commonGetAPI('admin/agent/list').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.userListOptions = res.body.data.data;
          this.totalElements = res.body.data.total;
        } else {
          this.totalElements = 1;
          this.userListOptions = [];
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  arrayToString(array: any[]): string {
    return array.join(', ');
  }
  resetFilter() {
    this.searchFormGroup.reset();
    this.fetchUserList();
  }
  updateAgentList(data: any) {
    const dialogRef = this.dialog.open(AgentComponent, {
      data,
      backdropClass: 'bdrop',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.fetchUserList();
        }
      },
    });
  }
  updateCreatorList(data: any) {
    const dialogRef = this.dialog.open(CreatorComponent, {
      data,
      backdropClass: 'bdrop',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.fetchUserList();
        }
      },
    });
  }
  updateUserList(val: any) {
    if (val.user_type == 'agent') {
      this.updateAgentList(val);
    } else {
      this.updateCreatorList(val);
    }
  }
  getRoleList() {
    this.userService.commonGetAPI('admin/masters/role').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.roleOptions = res.body.data.data;
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
}
