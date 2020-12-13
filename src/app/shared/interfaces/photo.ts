import { IUser } from './user';

export interface IPhoto {
    likes: number;
    photos: string[];
    _id: string;
    photoTitle: string;
    userId: IUser;
    created_at: string;
    updatedAt: string;
    __v: number;
}
