import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AceComponent } from 'ngx-ace-wrapper';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../objects/Project';
import { AppComponent } from '../app.component';

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
    
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.shortCode = this.route.snapshot.paramMap.get('shortCode');
    if (this.shortCode) this.fetchProject();
  }

  ngAfterViewInit() {
    this.editor.directiveRef.ace().commands.addCommand({
      name: 'Save',
      bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
      exec: (editor) => {
          console.log("test");
      },
      readOnly: true
    });

    if (this.saved) this.bindCopyListener();
    
    const commentSection = (document.querySelector('.comment') as HTMLDivElement);
    commentSection.scrollTop = commentSection.scrollHeight - commentSection.clientHeight;
    this.checkTheme();
    AppComponent.ThemeTypeSubject.subscribe(() => this.checkTheme());
  }

  bindCopyListener() {
    const copyInput = document.querySelector('.shareDisplay input') as HTMLInputElement;
    copyInput.addEventListener('click', () => {
        copyInput.select();
        copyInput.setSelectionRange(0, 99999);
        document.execCommand("copy");
        
        this.snackBar.open("Copied!!", "OK", { duration: 2000});
    });
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
        this.editorMode = this.project.language;
        this.value = this.project.body;
        this.readonly = this.project.isReadonly;
        if (AppComponent.CompareUUID(this.project.UUID)) this.readonly = false;
        this.saved = true;
      }
    });
  }

  getShareUrl(): string {
    if (this.shortCode) return location.protocol + '//' + location.host + '/' + this.shortCode;
    return '';
  }

  saveProject() {
    // post
    this.saved = true;
  }
}
