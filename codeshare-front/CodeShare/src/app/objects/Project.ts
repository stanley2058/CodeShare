import { Comment } from './Comment';

export class Project {
    id: string;
    UUID: string;
    shortCode: string;
    author: string;
    language: string;
    isReadonly: boolean;
    body: string;
    comments: Comment[];
}