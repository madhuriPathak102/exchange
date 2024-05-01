import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SettingComponent } from './setting/setting.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { BucreationComponent } from './bucreation/bucreation/bucreation.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RolelistComponent } from './rolelist/rolelist.component';
import { CustomFieldComponent } from './custom-field/custom-field.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AgentComponent } from './agent/agent.component';
import { CreatorComponent } from './creator/creator.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';
import { PageRoleComponent } from './page-role/page-role.component';
import { PermissionPageComponent } from './permission-page/permission-page.component';
import { CreateRoleComponent } from './create-role/create-role.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SettingComponent,
    UserdashboardComponent,
    BucreationComponent,
    UserlistComponent,
    RolelistComponent,
    CustomFieldComponent,
    AdminDashboardComponent,
    AgentComponent,
    CreatorComponent,
    RolepermissionComponent,
    PageRoleComponent,
    PermissionPageComponent,
    CreateRoleComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
