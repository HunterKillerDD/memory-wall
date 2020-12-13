import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';



@NgModule({
  declarations: [PhotoListComponent,
    PhotoDetailsComponent,
    PhotoFormComponent,
    EditPhotoComponent],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    PhotoFormComponent
  ],
  exports: [
    PhotoListComponent,
    PhotoDetailsComponent
  ]
})
export class PhotoModule { }
