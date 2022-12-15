import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HuespedPageRoutingModule } from './huesped-routing.module';

import { HuespedPage } from './huesped.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HuespedPageRoutingModule
  ],
  declarations: [HuespedPage]
})
export class HuespedPageModule {}
