import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './admin/signin/signin.component';
import { SignupComponent } from './admin/signup/signup.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  // {
  //   path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  // },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
