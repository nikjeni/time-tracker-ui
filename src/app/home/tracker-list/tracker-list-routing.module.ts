import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerListPage } from './tracker-list.page';

const routes: Routes = [
  {
    path: '',
    component: TrackerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerListPageRoutingModule { }
