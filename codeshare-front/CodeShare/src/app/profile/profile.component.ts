import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  uuidInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  uuidReadonly = true;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.uuidInput = (document.getElementById('uuid') as HTMLInputElement);
    this.nameInput = (document.getElementById('username') as HTMLInputElement);
    
    this.uuidInput.addEventListener('click', () => {
      this.uuidInput.select();
      this.uuidInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
      
      this.snackBar.open("Copied!!", "OK", { duration: 2000});
    });
  }

  get name(): string { return localStorage.getItem(AppComponent.LS_KEY_USER); }
  get uuid(): string { return localStorage.getItem(AppComponent.LS_KEY_UUID); }

  generateUUID() {
    AppComponent.GenerateUUID();
  }

  toggleInput() {
    this.uuidReadonly = !this.uuidReadonly;
    this.uuidInput.value = '';
  }
}
