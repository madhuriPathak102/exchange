import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form1: boolean = true;
  firstForm: FormGroup;
  secondForm: FormGroup;
  hide = true;
  hideConfirm = true;
  isError = false;
  loading = false;
  errorMessage: any;
  body: any;
  submitted: false;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.firstForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', Validators.required, Validators.minLength(8)],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });

    this.secondForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      companyName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  get passwordInput() { return this.firstForm.get('password'); }


  formSubmit() {
    const firstForm = this.firstForm.value;
    const secondForm = this.secondForm.value;

    const body = {
      email: firstForm.email,
      password: firstForm.password,
      name: secondForm.name,
      company_name: secondForm.companyName,
      mobile_number: secondForm.mobile
    }
    this.loading = true;
    localStorage.removeItem('data')
    this.authService.register(body).subscribe({
      next: data => {
        if (data.status === 200) {
          this.isError = false;
          this.loading = false;
          this.errorMessage = '';
          localStorage.setItem('data', JSON.stringify(data.body.data));
          this.toastr.success("User registered successfully !")
          this.router.navigate(['/admin/setting']);
        }
        else {
          this.isError = true;
          this.errorMessage = data.body.data.message;
        }
      },
      error: err => {
        this.loading = false;
        const errorMessage = err.error.errors
        const keys = Object.keys(errorMessage);
        const firstKey = keys[0];
        const firstError = errorMessage[firstKey];
        this.toastr.error(firstError);
      }
    });
  }

  // Define the passwordMatchValidator function
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const passwordValue = passwordControl.value;
      const confirmPasswordValue = confirmPasswordControl.value;

      if (passwordValue !== confirmPasswordValue) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
    }

    return null;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
