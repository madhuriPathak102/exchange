import { HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
  url = '../../../assets/images/default-user-icon-13.jpg';
  agentFormData: FormGroup;
  agentImageProfile: any;
  departmentOptions: any = [];
  roleOptions: any = [];
  categoryOptions: any = [];
  countryOptions: any = [];
  cityOptions: any = [];
  cityApiCallIdentifier: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.agentFormData = this._formBuilder.group({
      agentProfileImage: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      timezone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.getDepartmentList();
    this.getRoleList();
    this.getCategoryList();
    this.getCountryList();
    if (this.data) {
      this.cityApiCallIdentifier = true;
      this.onCountryChange(this.data.country);
      this.agentFormData.patchValue(this.data);
    } else {
      this.cityApiCallIdentifier = false;
    }
    // if (this.cityApiCallIdentifier == true) {
    //   this.onCountryChange(this.data.country);
    //   this.agentFormData.patchValue(this.data);
    // }
  }
  normalFileUpload(event, identifier): void {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('type', identifier);
      if (event.target.id == 'inputFile') {
        this.userService
          .commonImageUpload('admin/common/tmpfileupload', formData)
          .subscribe({
            next: (response) => {
              if (
                response.status == 200 ||
                response.status == true ||
                identifier == 'profile_image'
              ) {
                this.agentImageProfile = response.data;
                if (this.cityApiCallIdentifier == true) {
                  const image = this.agentImageProfile.find(
                    (image) => image.data == this.data.imgUrl
                  );
                  if (image) {
                    this.agentFormData.patchValue({
                      agentProfileImage: image.imgUrl,
                    });
                  }
                }
                this.toastr.success('Image uploaded successfully !');
              } else {
                this.toastr.error(response.message);
              }
            },
            error: (err) => {
              this.toastr.error(err.error.message);
            },
          });
      }
    }
  }
  onSubmit(): void {
    const formData = {
      name: this.agentFormData.value.name,
      mobile_number: this.agentFormData.value.mobile_number,
      email: this.agentFormData.value.email,
      profile_image: this.agentImageProfile,
      username: this.agentFormData.value.username,
      gender: this.agentFormData.value.gender,
      address: this.agentFormData.value.address,
      country: this.agentFormData.value.country,
      timezone: this.agentFormData.value.timezone,
      location: this.agentFormData.value.location,
      zip: this.agentFormData.value.zip,
      status: this.agentFormData.value.status,
      dob: this.agentFormData.value.dob,
      city: this.agentFormData.value.city,
      department_id: this.agentFormData.value.department_id,
      role_id: this.agentFormData.value.role_id,
      category_id: this.agentFormData.value.category_id,
      user_type: 'agent',
    };

    if (this.cityApiCallIdentifier == true) {
      this.userService
        .commonUpdateDataAPI('admin/agent/update/' + this.data.id, formData)
        .subscribe({
          next: (res) => {
            if (res.body.status == true) {
              console.log(formData);
              this.toastr.success(res.body.message);
              this.dialogRef.close(true);
            } else {
              this.toastr.error(res.body.message);
            }
          },
          error: (err) => {
            this.toastr.error(err.error.message);
          },
        });
    } else {
      this.userService
        .commonPostDataAPI('admin/agent/store', formData)
        .subscribe({
          next: (res) => {
            if (res.body.status == true) {
              console.log(this.data);
              this.toastr.success(res.body.message);
              this.dialogRef.close(true);
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
  getDepartmentList() {
    this.userService.commonGetAPI('admin/masters/department').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.departmentOptions = res.body.data;
          if (this.cityApiCallIdentifier == true) {
            const departmentList = this.departmentOptions.find(
              (deptOption) => deptOption.id == this.data.department_id
            );
            if (departmentList) {
              this.agentFormData.patchValue({
                department_id: departmentList.id,
              });
            }
          }
          console.log('data', this.agentFormData.value.department_id);
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  getRoleList() {
    this.userService.commonGetAPI('admin/masters/role').subscribe({
      next: (res) => {
        if (res.body.status == true) {
          this.roleOptions = res.body.data.data;
          if (this.cityApiCallIdentifier == true) {
            const roleLists = this.roleOptions.find(
              (roleOption) => roleOption.id == this.data.role_id
            );
            if (roleLists) {
              this.agentFormData.patchValue({
                role_id: roleLists.id,
              });
            }
          }
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  getCategoryList() {
    this.userService.commonGetAPI('admin/masters/category').subscribe({
      next: (res: any) => {
        if (res.body.status == true) {
          this.categoryOptions = res.body.data;
          if (this.cityApiCallIdentifier == true) {
            const categoryList = this.categoryOptions.find(
              (category) => category.id == this.data.category_id
            );
            if (categoryList) {
              this.agentFormData.patchValue({ category_id: categoryList.id });
            }
          }
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  getCountryList() {
    this.userService.commonGetAPI('admin/agent/county-list').subscribe({
      next: (res: any) => {
        if (res.body.status == true) {
          this.countryOptions = res.body.data;
          if (this.cityApiCallIdentifier == true) {
            const countryList = this.countryOptions.find(
              (country) => country.id == this.data.country
            );
            if (countryList) {
              this.agentFormData.patchValue({
                country: countryList.id,
              });
            }
          }
        } else {
          this.toastr.error(res.body.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
  onCountryChange(id) {
    this.userService
      .commonGetAPI(`admin/agent/city-list?country_id=${id}`)
      .subscribe({
        next: (res: any) => {
          if (res.body.status == true) {
            this.cityOptions = res.body.data;
            if (this.cityApiCallIdentifier == true) {
              const cityList = this.cityOptions.cities.find(
                (city) => city.id == this.data.city
              );
              if (cityList) {
                this.agentFormData.patchValue({ city: cityList.id });
              }
            }
          } else {
            this.toastr.error(res.body.message);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  onCityChange() {
    const time = this.cityOptions.country.timezones[0].zoneName;
    this.agentFormData.get('timezone').setValue(time);
  }
}
