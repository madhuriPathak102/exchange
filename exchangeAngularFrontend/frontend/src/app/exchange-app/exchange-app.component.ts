import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserSeviceService } from 'src/app/user/user-sevice.service';
@Component({
  selector: 'app-exchange-app',
  templateUrl: './exchange-app.component.html',
  styleUrls: ['./exchange-app.component.css'],
})
export class ExchangeAppComponent implements OnInit {
  userListOptions: any[] = [];
  fetchFormGroup!: FormGroup;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserSeviceService
  ) {}
  ngOnInit(): void {
    this.fetchUserList();
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
        `exchanges/${this.object.perPage}&page=${this.object.page}&key=${this.fetchFormGroup.value.icon}&value=${this.fetchFormGroup.value._id}`
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == true) {
            this.totalElements = res.total;
            this.userListOptions = res;
          } else {
            this.totalElements = 1;
            this.userListOptions = [];
            this.toastr.error(res.body.message);
          }
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  fetchUserList() {
    this.userService.commonGetAPI('exchanges').subscribe({
      next: (res: any) => {
        console.log('response==>', res.status);
        this.userListOptions = res;
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
