import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  exampleForm: FormGroup;
  clickEventSubscribtion: Subscription;

  constructor(
    public photoService: PhotoService,
    private router: Router,
    private fb: FormBuilder,
    public userService: UserService) {
      this.clickEventSubscribtion = this.photoService.getClickEvent()
      .subscribe(() => {
        this.likePhoto();
      });
    }


  creator: string = this.userService.currentUserId;
  likes = 0;
  hasLiked = [];

  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.exampleForm = this.fb.group({
      title: ['', Validators.required ],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  resetFields(): void {
    this.creator = this.userService.currentUserId;
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSubmit(value): void {
    this.photoService.createNewPhoto(value, this.creator, this.likes, this.hasLiked)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

  likePhoto(): void {
    this.likes++;
    this.hasLiked.push(this.userService.currentUserId);
  }

}
