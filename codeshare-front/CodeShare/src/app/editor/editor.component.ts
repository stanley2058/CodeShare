import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AceComponent } from 'ngx-ace-wrapper';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../objects/Project';
import { AppComponent } from '../app.component';
import { FilenameMapping } from '../objects/FilenameMapping';
import domtoimage from 'dom-to-image';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor: AceComponent;
  private shortCode: string;

  readonly = false;
  saved = false;
  
  editorMode = "javascript";
  fontSize = "16px";
  editorTheme = "tomorrow_night_eighties";
  value = "";

  project: Project;
    
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    this.shortCode = this.route.snapshot.paramMap.get('shortCode');
    if (this.shortCode) this.fetchProject();
    else {
      this.project = new Project();
      
      this.project.UUID = AppComponent.GetHashUUID();
      this.project.author = localStorage.getItem(AppComponent.LS_KEY_USER);
      this.project.body = this.value;
      this.project.id = null;
      this.project.shortCode = null;
      this.project.comments = [];
    }
  }

  ngAfterViewInit() {
    this.editor.directiveRef.ace().commands.addCommand({
      name: 'Save',
      bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
      exec: (editor) => {
          if (!this.readonly) document.getElementById('btnSave').click();
      },
      readOnly: true
    });
    
    const commentSection = (document.querySelector('.comment') as HTMLDivElement);
    commentSection.scrollTop = commentSection.scrollHeight - commentSection.clientHeight;
    this.checkTheme();
    AppComponent.ThemeTypeSubject.subscribe(() => this.checkTheme());
  }

  copyAction(event: MouseEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    
    this.snackBar.open("Copied!!", "OK", { duration: 2000});
  }

  fontSizeChanged() {
    this.editor.directiveRef.ace().setFontSize(this.fontSize);
  }

  checkTheme() {
    (document.querySelector(".comment") as HTMLDivElement).classList.remove("comment-dark");
    (document.querySelector(".comment") as HTMLDivElement).classList.remove("comment-light");
    (document.querySelector(".option-panel") as HTMLDivElement).classList.remove("option-panel-light");
    (document.querySelector(".option-panel") as HTMLDivElement).classList.remove("option-panel-dark");
    if (AppComponent.ThemeType === 'light') {
      (document.querySelector(".comment") as HTMLDivElement).classList.add("comment-light");
      (document.querySelector(".option-panel") as HTMLDivElement).classList.add("option-panel-light");
    } else {
      (document.querySelector(".comment") as HTMLDivElement).classList.add("comment-dark");
      (document.querySelector(".option-panel") as HTMLDivElement).classList.add("option-panel-dark");
    }

    this.editorTheme = AppComponent.ThemeType === 'light' ? "chrome" : "tomorrow_night_eighties";
  }

  fetchProject() {
    fetch(AppComponent.API_URI + this.shortCode, {
      method: "GET",
      mode: "cors"
    }).then(res => {
      if (res.ok) return res.json();
      return null;
    }).then((res: Project) => {
      if (res) {
        this.project = res;
        this.updateProject();
        this.saved = true;
      }
    });
  }

  updateProject() {
    this.editorMode = this.project.language;
    this.value = this.project.body;
    this.readonly = this.project.isReadonly;
    this.shortCode = this.project.shortCode;
    if (AppComponent.CompareUUID(this.project.UUID)) this.readonly = false;
  }

  getShareUrl(): string {
    if (this.shortCode) return location.protocol + '//' + location.host + '/' + this.shortCode;
    return '';
  }

  downloadProjectImage() {
    domtoimage.toPng(document.querySelector('ace')).then(dataUrl => {
      const link = document.createElement('a');
      link.download = `codeshare-project${this.shortCode ? `-${this.shortCode}` : ""}.png`;
      link.href = dataUrl;
      link.click();
    });
  }

  downloadProjectFile() {
    const link = document.createElement('a');
    link.download = `codeshare-project${this.shortCode ? `-${this.shortCode}` : ""}.${FilenameMapping.getExtension(this.editorMode)}`;
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.value);
    link.click();
  }

  saveProject() {
    this.project.language = this.editorMode;
    this.project.body = this.value;

    fetch(AppComponent.API_URI, { 
      method: 'POST',
      body: JSON.stringify(this.project),
      mode: "cors",
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.ok) return res.json();
      return null;
    }).then(res => {
      if (res) {
        this.project = res;
        this.updateProject();
        this.saved = true;
        this.location.go(this.shortCode);

        this.snackBar.open("Saved!!", "OK", { duration: 2000});
      }
    });
  }

  readonlyChanged(event: MatCheckboxChange) {
    if (this.project) this.project.isReadonly = event.checked;
  }
}
