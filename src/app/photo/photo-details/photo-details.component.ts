import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { PhotoFormComponent } from '../photo-form/photo-form.component';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  item: any;
  key: string;
  constructor(
    public photoService: PhotoService,
    private route: ActivatedRoute,
    private firebase: AngularFirestore,
    public userService: UserService,
    private router: Router) {
      this.route.paramMap.subscribe(data => {
        this.key = data.get('id');
        });
    }

  ngOnInit(): void {
    this.photoService.getPhoto(this.key)
    .subscribe(result => {
      this.item = result;
    });
  }

  authCreator(): boolean {
    if (this.item._creator === this.userService.currentUserId) {
      return true;
    } else {
      return false;
    }
  }

  likePhoto(): void {
    console.log('HI');
    this.photoService.sendClickEvent();
  }

  hasLikedAuth(): boolean {
    return this.item._hasLiked.includes(this.userService.currentUserId);
  }

  delete(): void {
   this.photoService.deletePhoto(this.key)
   .then(
     res => {
       this.router.navigate(['/home']);
     },
     err => {
       console.log(err);
     }
   );
  }

  editPhoto(item): void {
    this.router.navigate(['/photo-edit/' + this.key]);
  }
}
