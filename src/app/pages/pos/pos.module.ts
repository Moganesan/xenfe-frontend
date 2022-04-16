import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PosComponent } from './pos.component';
import { WidgetsModule } from '../../_metronic/partials';

@NgModule({
  declarations: [PosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PosComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class PosModule {}
