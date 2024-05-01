import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  selectedColor: any;
  selectedTextColor: any;
  isActive: boolean = true;
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userDetails = window.sessionStorage.getItem('AUTH_USER');
    this.userDetails = JSON.parse(this.userDetails);
    console.log('this.userDetails', this.userDetails);
  }

  ngOnInit(): void {
    // let menuicn = document.querySelector('.menuicn');
    // let nav = document.querySelector('.navcontainer');
    //menuicn.addEventListener('click', () => {
    //alert('Testing Responsive')
    // nav.classList.toggle('navclose');
    // this.sideBarActive();
    // });
  }

  dashboardToggel() {
    let nav = document.querySelector('.navcontainer');
    nav.classList.toggle('navclose');
    this.isActive = !this.isActive;
  }

  logOut() {
    try {
      this.authService.logout().subscribe({
        next: (data) => {
          if (data.status == true) {
            this.authService.setLoginStatus(false);
            this.authService.setVerifyStatus(false);
            this.router.navigate(['/signin']);
          }
        },

        error: (err) => {
          if (err.error.data.errors) {
            this.toastr.warning(Object.values(err.error.data.errors)[0] as any);
          } else {
            this.toastr.error(err.error.message as any);
          }
        },
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }
}
