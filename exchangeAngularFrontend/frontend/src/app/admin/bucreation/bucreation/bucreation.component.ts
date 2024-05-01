import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bucreation',
  templateUrl: './bucreation.component.html',
  styleUrls: ['./bucreation.component.css'],
})
export class BucreationComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  busForm: FormGroup;
  depForm: FormGroup;
  categoriesForm: FormGroup;
  subCategoriesForm: FormGroup;
  buOptions: any[];
  deptOptions: any[];
  catOptions: any[];
  tabValue: number = 0;
  ngOnInit(): void {
    this.busForm = this._formBuilder.group({
      buName: ['', Validators.required],
    });
    this.depForm = this._formBuilder.group({
      buName: ['', Validators.required],
      deptName: ['', Validators.required],
    });
    this.categoriesForm = this._formBuilder.group({
      deptName: ['', Validators.required],
      categoryName: ['', Validators.required],
    });
    this.subCategoriesForm = this._formBuilder.group({
      categoryName: ['', Validators.required],
      subCategoryName: ['', Validators.required],
    });
  }
  saveBUName() {
    let busForm = this.busForm.value;
    const formData = new FormData();
    formData.append('title', busForm.buName);
    this.userService
      .commonPostDataAPI('admin/masters/business-unit', formData)
      .subscribe({
        next: (res) => {
          if (res.body.status == true) {
            this.toastr.success(res.body.message);
            this.busForm.get('buName').setValue('');
            this.fetchBUName();
            this.tabValue = 1;
          } else {
            this.toastr.error(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  saveDeptName() {
    let depForm = this.depForm.value;
    const formData = new FormData();
    formData.append('title', depForm.deptName);
    formData.append('businessUnit_id', depForm.buName);
    this.userService
      .commonPostDataAPI('admin/masters/department', formData)
      .subscribe({
        next: (res) => {
          if (res.body.status == true) {
            this.toastr.success(res.body.message);
            this.depForm.get('deptName').setValue('');
            this.fetchDeptName();
            this.tabValue = 2;
          } else {
            this.toastr.error(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  saveCatName() {
    let categoriesForm = this.categoriesForm.value;
    const formData = new FormData();
    formData.append('title', categoriesForm.categoryName);
    formData.append('department_id', categoriesForm.deptForm);
    formData.append('show_on', 'B');
    this.userService
      .commonPostDataAPI('admin/masters/category', formData)
      .subscribe({
        next: (res) => {
          if (res.body.status == true) {
            this.toastr.success(res.body.message);
            this.categoriesForm.get('categoryName').setValue('');
            this.fetchCatName();
            this.tabValue = 3;
          } else {
            this.toastr.success(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  saveSubCatName() {
    let subCategoriesForm = this.subCategoriesForm.value;
    const formData = new FormData();
    formData.append('title', subCategoriesForm.subCategoryName);
    formData.append('category_id', subCategoriesForm.categoryName);
    this.userService
      .commonPostDataAPI('admin/masters/subcategory', formData)
      .subscribe({
        next: (res) => {
          if (res.body.status == true) {
            this.toastr.success(res.body.message);
            this.subCategoriesForm.get('subCategoryName').setValue('');
            setTimeout(() => {
              this.router.navigate(['/admin/userlist']);
            }, 1000);
          } else {
            this.toastr.error(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  fetchBUName() {
    this.userService.commonGetAPI('admin/masters/business-unit').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.buOptions = res.body.data;
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  fetchDeptName() {
    this.userService.commonGetAPI('admin/masters/department').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.deptOptions = res.body.data;
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  fetchCatName() {
    this.userService.commonGetAPI('admin/masters/category').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.catOptions = res.body.data;
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
