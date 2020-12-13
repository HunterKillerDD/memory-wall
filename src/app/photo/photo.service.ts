import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPhoto } from '../shared/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import {from} from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore) {
    }


  getPhotos(): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      this.firestore.collection('photos').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      });
    }));
  }

  getPhoto(photoKey): Observable<any> {
    return this.firestore.collection('photos').doc(photoKey).valueChanges();
  }

  createNewPhoto(value, creator, likes, hasLiked): Promise<any> {
    return this.firestore.collection('photos').add({
      title: value.title,
      imageUrl: value.imageUrl,
      description: value.description,
      _creator: creator,
      _likes: likes,
      _hasLiked: hasLiked
    });
  }

  sendClickEvent(): void {
     this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  deletePhoto(photoKey): Promise<any> {
    return this.firestore.collection('photos').doc(photoKey).delete();
  }

  updatePhoto(photoKey, value): Promise<any> {
    return this.firestore.collection('photos').doc(photoKey).set(value);
  }
}
