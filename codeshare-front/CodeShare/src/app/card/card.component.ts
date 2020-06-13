import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../objects/Comment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input("comment") comment: Comment;
  time: string;

  constructor() { }

  ngOnInit(): void {
    this.time = new Date(this.comment.timestamp).toLocaleString();
  }

  commentBody(comment: String) {
    return this.comment.commentString.replace('\r', '').split('\n');
  }
}
