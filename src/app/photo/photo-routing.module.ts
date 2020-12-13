import { RouterModule, Routes } from '@angular/router';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoListComponent } from './photo-list/photo-list.component';

const routes: Routes = [
    {
        path: 'photos',
        component: PhotoListComponent
    },
    {
        path: 'new-photo',
        component: PhotoFormComponent
    },
    {
        path: 'photo-details/:id',
        component: PhotoDetailsComponent
    },
    {
        path: 'photo-edit/:id',
        component: EditPhotoComponent
    }
];

export const PhotoRoutingModule = RouterModule.forChild(routes);
