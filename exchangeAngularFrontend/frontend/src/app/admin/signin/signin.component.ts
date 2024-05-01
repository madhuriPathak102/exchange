import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  loading = false;
  isError: boolean;
  errorMessage: any;
  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['admin@gmail.com', [Validators.required]],
      password: ['12345', Validators.required]
    });
  }


  Save() {

    //console.log(this.form.value.email);
    //console.log(this.form.value.password);

    const formdata = new FormData();
    formdata.append('email', this.form.value.email);
    formdata.append('password', this.form.value.password);

    this.loading = true;

    this.authService.login(formdata).subscribe({
      next: data => {

        if (data.status === 200) {
          this.isError = false;
          this.loading = false;
          this.errorMessage = '';
          localStorage.setItem('data', JSON.stringify(data.body.data));
          this.toastr.success("User logged in successfully !")
          this.router.navigate(['/admin/setting']);
        }
        else {
          this.isError = true;
          this.errorMessage = data.body.data.message;
        }
      },
      error: err => {
        this.loading = false;
        const errorMessage = JSON.stringify(err)
        this.toastr.error(errorMessage);
      }
    });
  }

}
