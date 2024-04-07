import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeAppComponent } from './exchange-app/exchange-app.component';

const routes: Routes = [{ path: 'exchange', component: ExchangeAppComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
