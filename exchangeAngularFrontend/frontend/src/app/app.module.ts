import { CUSTOM_ELEMENTS_SCHEMA, NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './admin/common/sidebar/sidebar.component';
import { HeaderComponent } from './admin/common/header/header.component';
import { FooterComponent } from './admin/common/footer/footer.component';
import { SigninComponent } from './admin/signin/signin.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule} from '@angular/common/http';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AutoTabDirective } from './directive/auto-tab.directive';
import { ToastrModule, provideToastr } from 'ngx-toastr';

import { NgxSearchPipeModule } from 'ngx-search-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NG_PROGRESS_CONFIG, NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { SignupComponent } from './admin/signup/signup.component'; 
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    // SidebarComponent,
    // HeaderComponent,
    // FooterComponent,
    SigninComponent,
    SignupComponent,
    AutoTabDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    MaterialModule,
    NgxSearchPipeModule,
    MatStepperModule,
    NgxSpinnerModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule
  ],
  providers: [authInterceptorProviders,provideAnimations(), // required animations providers
  provideToastr(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    NgxSpinnerModule,
    NgProgressModule
  ]

})
export class AppModule { }
