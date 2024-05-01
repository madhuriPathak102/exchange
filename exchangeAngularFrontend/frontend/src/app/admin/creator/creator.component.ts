import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
})
export class CreatorComponent implements OnInit {
  url = '../../../assets/images/default-user-icon-13.jpg';
  creatorFormData: FormGroup;
  creatorImageProfile: any;
  countryOptions: any = [];
  cityOptions: any = [];
  dataListApiIdentifire: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreatorComponent>,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.dataListApiIdentifire = true;
    } else {
      this.dataListApiIdentifire = false;
    }
  }
  ngOnInit(): void {
    this.creatorFormData = this._formBuilder.group({
      creatorProfileImage: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
      status: ['', [Validators.required]],
    });
    this.getCountryList();
    if (this.dataListApiIdentifire == true) {
      this.onCountryChange(this.data.country);
      this.creatorFormData.patchValue(this.data);
    }
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
                this.creatorImageProfile = response.data;
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
      name: this.creatorFormData.value.name,
      mobile_number: this.creatorFormData.value.mobile_number,
      email: this.creatorFormData.value.email,
      password: this.creatorFormData.value.password,
      profile_image: this.creatorImageProfile,
      username: this.creatorFormData.value.username,
      gender: this.creatorFormData.value.gender,
      address: this.creatorFormData.value.address,
      country: this.creatorFormData.value.country,
      timezone: this.creatorFormData.value.timezone,
      location: this.creatorFormData.value.location,
      zip: this.creatorFormData.value.zip,
      dob: this.creatorFormData.value.dob,
      city: this.creatorFormData.value.city,
      status: this.creatorFormData.value.status,
      user_type: 'creator',
    };
    if (this.dataListApiIdentifire == true) {
      this.userService
        .commonUpdateDataAPI('admin/agent/update/' + this.data.id, formData)
        .subscribe({
          next: (res) => {
            if (res.body.status == true) {
              this.toastr.success(res.body.message);
              console.log(formData);
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
    }
  }
  getCountryList() {
    this.userService.commonGetAPI('admin/agent/county-list').subscribe({
      next: (res: any) => {
        if (res.body.status == true) {
          this.countryOptions = res.body.data;
          if (this.dataListApiIdentifire == true) {
            const countryList = this.countryOptions.find(
              (country) => country.id == this.data.country
            );
            if (countryList) {
              this.creatorFormData.patchValue({
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
            if (this.dataListApiIdentifire == true) {
              const cityList = this.cityOptions.cities.find(
                (city) => city.id == this.data.city
              );
              if (cityList) {
                this.creatorFormData.patchValue({
                  city: cityList.id,
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
  onCityChange() {
    const time = this.cityOptions.country.timezones[0].zoneName;
    this.creatorFormData.get('timezone').setValue(time);
  }
}
