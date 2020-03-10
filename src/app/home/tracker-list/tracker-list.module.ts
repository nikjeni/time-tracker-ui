import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackerListPageRoutingModule } from './tracker-list-routing.module';

import { TrackerListPage } from './tracker-list.page';
import { ModelPagePage } from './model-page/model-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TrackerListPageRoutingModule
  ],
  declarations: [TrackerListPage, ModelPagePage],
  entryComponents: [ModelPagePage]
})
export class TrackerListPageModule { }
