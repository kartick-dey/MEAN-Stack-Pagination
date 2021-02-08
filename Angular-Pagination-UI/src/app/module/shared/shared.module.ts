import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/sort-pipe.pipe';
import { UserSearchPipe } from './pipes/user-search-pipe.pipe';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SortPipe,
    UserSearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    CommonModule,
    SortPipe,
    UserSearchPipe
  ]
})
export class SharedModule { }
