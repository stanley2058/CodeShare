import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  histories: string[];

  constructor() { }

  ngOnInit(): void {
    fetch(AppComponent.API_URI + "user/" + AppComponent.GetHashUUID()).then(res => {
      if (res.ok) return res.json();
      return null;
    }).then(res => this.histories = res);
  }

  getUrl(str: string) {
    return window.location.origin + "/" + str.split(" ")[1];
  }
}
