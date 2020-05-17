import { Component, OnInit } from '@angular/core';
import { Theme } from './objects/Theme';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from "crypto-js";
import { Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static readonly API_URI = "http://localhost:8080/api/projects/";
  static readonly SOCKET_URI = "ws://localhost:8080/socket";
  static readonly LS_KEY_UUID = "codeshare-uuid";
  static readonly LS_KEY_USER = "codeshare-username";
  static readonly LS_KEY_THEME = "codeshare-theme";
  static ThemeType = "dark";
  static ThemeTypeSubject = new Subject<string>();

  static ChangeTheme(theme: Theme) {
    (document.getElementById('themeAsset') as HTMLLinkElement).href = `assets/${theme}`;
    AppComponent.ThemeType = (theme === Theme.DeeppurpleAmber || theme === Theme.IndigoPink) ? "light" : "dark";
    AppComponent.ThemeTypeSubject.next();
  }

  static GenerateUUID(): string {
    const uuid = uuidv4();
    localStorage.setItem(AppComponent.LS_KEY_UUID, uuid);
    return uuid;
  }

  static CompareUUID(uuidHash: String) {
    return CryptoJS.SHA256(localStorage.getItem(AppComponent.LS_KEY_UUID)).toString(CryptoJS.enc.Hex) === uuidHash;
  }
  
  ngOnInit(): void {
    if (!localStorage.getItem(AppComponent.LS_KEY_UUID)) AppComponent.GenerateUUID();
    if (!localStorage.getItem(AppComponent.LS_KEY_USER)) localStorage.setItem(AppComponent.LS_KEY_USER, "Anonymous");
    if (!localStorage.getItem(AppComponent.LS_KEY_THEME)) localStorage.setItem(AppComponent.LS_KEY_THEME, Theme.PurpleGreen);
    AppComponent.ChangeTheme(localStorage.getItem(AppComponent.LS_KEY_THEME) as Theme);
  }
}
