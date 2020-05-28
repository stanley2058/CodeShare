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
    
    console.log(this.uuidInput)
    console.log(this.nameInput)
    this.uuidInput.addEventListener('click', () => {
      if (!this.uuidReadonly) return;
      this.uuidInput.select();
      this.uuidInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
      
      this.snackBar.open("Copied!!", "OK", { duration: 2000 });
    });
  }

  get name(): string { return localStorage.getItem(AppComponent.LS_KEY_USER); }
  get uuid(): string { return localStorage.getItem(AppComponent.LS_KEY_UUID); }

  generateUUID() {
    AppComponent.GenerateUUID();
    window.location.reload();
  }

  toggleInput() {
    if (this.uuidReadonly) {
      this.uuidInput.select();
    } else {
      const refresh = this.uuidInput.value !== this.uuid;
      localStorage.setItem(AppComponent.LS_KEY_UUID, this.uuidInput.value);
      if (refresh) window.location.reload();
    }

    this.uuidReadonly = !this.uuidReadonly;
  }

  usernameChanged() {
    localStorage.setItem(AppComponent.LS_KEY_USER, this.nameInput.value);
  }
}
