import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-rounting.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
