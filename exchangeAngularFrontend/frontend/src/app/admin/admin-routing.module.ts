import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../_services/auth-guard.service';
import { SettingComponent } from './setting/setting.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { MaterialModule } from '../shared/material.module';
import { BucreationComponent } from './bucreation/bucreation/bucreation.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { CustomFieldComponent } from './custom-field/custom-field.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'listing',
    component: UserlistComponent
  },
  {
    path: 'bucreation',
    component: BucreationComponent
  },
  {
    path: 'user-dashboard',
    component: UserdashboardComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent
  },
  {
    path: 'rolelist',
    component: RolelistComponent
  },
  {
    path: 'custom-field',
    component: CustomFieldComponent
  },
  {
    path: 'rolepermission',
    component: RolepermissionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
