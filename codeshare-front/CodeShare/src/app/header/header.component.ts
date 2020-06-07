import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { AppComponent } from '../app.component';
import { Theme } from '../objects/Theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input("isAboutPage") isAboutPage: boolean;
  readonly themeList = [
    {name: "Deep Purple & Amber (Light)", using: false, theme: Theme.DeeppurpleAmber},
    {name: "Indigo & Pink (Light)", using: false, theme: Theme.IndigoPink},
    {name: "Pink & Blue-grey (Dark)", using: false, theme: Theme.PinkBluegrey},
    {name: "Purple & Green (Dark)", using: false, theme: Theme.PurpleGreen}
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkThemeUsing();
  }

  openProfileDialog() {
    let dialogRef = this.dialog.open(ProfileComponent, {
      height: '300px',
      width: '300px',
      autoFocus: false
    });
  }

  checkThemeUsing() {
    this.themeList.forEach((theme) => theme.using = false);
    this.themeList.filter((theme) => theme.theme === localStorage.getItem(AppComponent.LS_KEY_THEME))[0].using = true;
  }

  changeTheme(theme: Theme) {
    localStorage.setItem(AppComponent.LS_KEY_THEME, theme);
    this.checkThemeUsing();
    AppComponent.ChangeTheme(theme);
  }

  getHome() {
    return window.location.origin;
  }

  getAboutPage() {
    return window.location.origin + '/about';
  }
}
