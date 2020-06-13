import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { RxStomp, RxStompConfig, RxStompState } from '@stomp/rx-stomp';
import { Project } from './Project';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly API_POTO   = window.location.host.includes("localhost") ? "http" : "https";
  readonly WS_POTO    = window.location.host.includes("localhost") ? "ws" : "wss";
  readonly API_HOST   = window.location.host.includes("localhost") ? "localhost:8080" : "stanley-server.ddns.net:8443";
  readonly API_PREFIX = this.API_POTO + "://" + this.API_HOST + "/";
  readonly WS_PREFIX  = this.WS_POTO + "://" + this.API_HOST + "/";

  readonly API_URI    = this.API_PREFIX + "api/projects/";
  readonly SOCKET_URI = this.WS_PREFIX + "socket";
  readonly SOCK_URI   = this.API_PREFIX + "sockjs";

  connInput: HTMLInputElement;
  sockInput: HTMLInputElement;
  durationInput: HTMLInputElement;
  statusDiv: HTMLDivElement;
  logDiv: HTMLDivElement;

  mainProject: Project;

  private readonly stompConfig: RxStompConfig = {
    brokerURL: this.SOCKET_URI,
    reconnectDelay: 200
  };
  private rxStomp: RxStomp;
  private rxStompList: RxStomp[];

  private mainStomp$: Subscription;
  private stomps$: Subscription[];
  private stompsValidate: boolean[];

  getCodeBodyWebsocketObserverable(shortCode: string, rxStomp: RxStomp): Observable<any> {
    if (!shortCode) return null;
    return rxStomp.watch('/websocket/contentBody/' + shortCode);
  }

  getCommentWebsocketObserverable(shortCode: string, rxStomp: RxStomp): Observable<any> {
    if (!shortCode) return null;
    return rxStomp.watch('/websocket/comments/' + shortCode);
  }

  sendSocketMessage(destination: string, body: string, rxStomp: RxStomp): void {
    rxStomp.publish({destination, body});
  }

  webSocketConnected(rxStomp: RxStomp): BehaviorSubject<RxStompState> {
    return rxStomp.connectionState$;
  }

  ngOnInit(): void {
    this.rxStompList = [];
    this.stomps$ = [];
    this.stompsValidate = [];

    this.rxStomp = new RxStomp();
    this.rxStomp.configure(this.stompConfig);

    this.connInput = document.getElementById('connInput') as HTMLInputElement;
    this.sockInput = document.getElementById('sockInput') as HTMLInputElement;
    this.durationInput = document.getElementById('durationInput') as HTMLInputElement;
    this.statusDiv = document.querySelector('.status') as HTMLDivElement;
    this.logDiv = document.querySelector('.log') as HTMLDivElement;

    this.mainStomp$ = this.getCodeBodyWebsocketObserverable('123456', this.rxStomp)
    .pipe(map((message) => JSON.parse(message.body) as Project))
    .subscribe(next => this.mainProject = next);

    fetch(this.API_URI + '123456').then(res => res.json()).then((res: Project) => this.mainProject = res);
    this.rxStomp.activate();
  }
  ngOnDestroy() {
    this.mainStomp$?.unsubscribe();
  }

  start() {
    this.connInput.disabled = true;
    this.sockInput.disabled = true;
    this.logDiv.innerHTML = "";

    for (let i = 0; i < parseInt(this.connInput.value); ++i) {
      const conn = new RxStomp();
      conn.configure(this.stompConfig);
      conn.activate();
      this.rxStompList.push(conn);
    }

    this.rxStompList.forEach((conn, i) => {
      this.stomps$.push(
        this.getCodeBodyWebsocketObserverable('123456', conn)
        .pipe(map((message) => JSON.parse(message.body) as Project))
        .subscribe(next => {
          this.stompsValidate[i] = (next.body === this.mainProject.body);
        })
      );
    });

    this.runTest();
  }

  stop() {
    this.rxStompList.forEach(conn => conn?.deactivate());
    this.rxStompList = [];
    
    this.stomps$.forEach(sub => sub?.unsubscribe());
    this.stomps$ = [];
    this.stompsValidate = [];

    this.connInput.disabled = false;
    this.sockInput.disabled = false;
  }

  runTest() {
    const intervalTime = 300;
    const connections: Subscription[] = [];
    const status: boolean[] = [];
    let errorCount = 0;
    let round = 0;

    this.rxStompList.forEach((conn, i) => {
      connections.push(
        this.webSocketConnected(conn).subscribe(next => {
          status[i] = (next === RxStompState.OPEN)
        })
      );
    });

    const waitTime = Math.log10(parseInt(this.connInput.value)) * 5000;

    this.statusDiv.innerHTML = "WAITING: " + waitTime;
    setTimeout(() => {

      const timer = setInterval(() => {
        this.statusDiv.innerHTML = "RUNNING";
        const wsProject = {
          body: this.mainProject.body,
          author: uuidv4(),
          language: 'javascript',
          isReadonly: false
        };
  
        this.sendSocketMessage('/ws/contentBody/123456', JSON.stringify(wsProject), this.rxStomp);
        
        setTimeout(() => {
          this.logDiv.innerHTML = `<p>Round: ${++round}</p>`;
          status.forEach((st, i) => {
            if (!st || !this.stompsValidate[i]) ++errorCount;
          });
          if (errorCount) this.logDiv.innerHTML += `<p>ERROR: ${errorCount}</p>`;
        }, 200);
      }, intervalTime);
      setTimeout(() => {
        clearInterval(timer);
        
        setTimeout(() => {
          connections.forEach(con => con?.unsubscribe());
          this.statusDiv.innerHTML = "STOPPED";
          this.stop();
        }, 250);
      }, parseInt(this.durationInput.value));
    }, waitTime);
  }
}
