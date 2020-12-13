import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  editForm: FormGroup;
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

  onSubmit(value): void {
    value.title = this.item.title;
    value.description = this.item.description;
    value.imageUrl = this.item.imageUrl;
    this.photoService.updatePhoto(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/photos']);
      }
    );
  }



}
