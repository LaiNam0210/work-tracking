import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { UnauthorizedPageRoutingModule } from './unauthorized-page-routing.module';
import { UnauthorizedPageComponent } from './unauthorized-page.component';

@NgModule({
  declarations: [UnauthorizedPageComponent],
  imports: [CommonModule, UnauthorizedPageRoutingModule, MatButtonModule]
})
export class UnauthorizedPageModule {}
