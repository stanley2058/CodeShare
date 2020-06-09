import { Component, OnInit } from '@angular/core';
import { Theme } from './objects/Theme';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from "crypto-js";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { RxStomp, RxStompConfig, RxStompState } from '@stomp/rx-stomp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static API_POTO = window.location.host.includes("localhost") ? "http" : "https";
  static WS_POTO = window.location.host.includes("localhost") ? "ws" : "wss";
  static API_HOST = window.location.host.includes("localhost") ? "localhost:8080" : "stanley-server.ddns.net:8443";
  static readonly API_PREFIX = AppComponent.API_POTO + "://" + AppComponent.API_HOST + "/";
  static readonly WS_PREFIX = AppComponent.WS_POTO + "://" + AppComponent.API_HOST + "/";

  static readonly API_URI = AppComponent.API_PREFIX + "api/projects/";
  static readonly SOCKET_URI = AppComponent.WS_PREFIX + "socket";
  static readonly SOCK_URI = AppComponent.API_PREFIX + "sockjs";
  static readonly LS_KEY_UUID = "codeshare-uuid";
  static readonly LS_KEY_USER = "codeshare-username";
  static readonly LS_KEY_THEME = "codeshare-theme";
  static readonly SessionUUID = uuidv4();

  static ThemeType = "dark";
  static ThemeTypeSubject = new Subject<string>();
  private static readonly stompConfig: RxStompConfig = {
    brokerURL: AppComponent.SOCKET_URI,
    reconnectDelay: 200
  };
  private static rxStomp: RxStomp;

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

  static GetHashUUID(): string {
    return CryptoJS.SHA256(localStorage.getItem(AppComponent.LS_KEY_UUID)).toString(CryptoJS.enc.Hex);
  }

  static CompareUUID(uuidHash: String) {
    return AppComponent.GetHashUUID() === uuidHash;
  }

  static GetCodeBodyWebsocketObserverable(shortCode: string): Observable<any> {
    if (!shortCode) return null;
    return AppComponent.rxStomp.watch('/websocket/contentBody/' + shortCode);
  }

  static GetCommentWebsocketObserverable(shortCode: string): Observable<any> {
    if (!shortCode) return null;
    return AppComponent.rxStomp.watch('/websocket/comments/' + shortCode);
  }

  static SendSocketMessage(destination: string, body: string): void {
    AppComponent.rxStomp.publish({destination, body});
  }

  static WebSocketConnected(): BehaviorSubject<RxStompState> {
    return AppComponent.rxStomp.connectionState$;
  }

  ngOnInit(): void {
    // socket
    AppComponent.rxStomp = new RxStomp();
    AppComponent.rxStomp.configure(AppComponent.stompConfig);
    AppComponent.rxStomp.activate();

    // localstorage
    if (!localStorage.getItem(AppComponent.LS_KEY_UUID)) AppComponent.GenerateUUID();
    if (!localStorage.getItem(AppComponent.LS_KEY_USER)) localStorage.setItem(AppComponent.LS_KEY_USER, "Anonymous");
    if (!localStorage.getItem(AppComponent.LS_KEY_THEME)) localStorage.setItem(AppComponent.LS_KEY_THEME, Theme.PurpleGreen);
    AppComponent.ChangeTheme(localStorage.getItem(AppComponent.LS_KEY_THEME) as Theme);
  }
}
