import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotoFormComponent } from '../photo-form/photo-form.component';
import { PhotoModule } from '../photo.module';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  items: Array<any>;

  constructor(
    private photoService: PhotoService,
    private router: Router) { }

  ngOnInit(): void {
    this.photoService.getPhotos()
    .subscribe(result => {
      this.items = result;
      console.log(result);

    });
  }

  getPhotoById(item): void {
    this.router.navigate(['/photo-details/' + item.payload.doc.id]);
  }

}
