import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HuespedPage } from './huesped.page';

const routes: Routes = [
  {
    path: '',
    component: HuespedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HuespedPageRoutingModule {}
