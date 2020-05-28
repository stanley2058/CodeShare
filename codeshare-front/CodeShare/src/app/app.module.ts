import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// <-- Material Import -->
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

// <-- Ace Import -->
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import 'brace';

// <-- Ace Mode Import -->
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/csharp';
import 'brace/mode/python';
import 'brace/mode/xml';
import 'brace/mode/ruby';
import 'brace/mode/c_cpp';
import 'brace/mode/css';
import 'brace/mode/json';
import 'brace/mode/coffee';
import 'brace/mode/dockerfile';
import 'brace/mode/fortran';
import 'brace/mode/golang';
import 'brace/mode/jsp';
import 'brace/mode/kotlin';
import 'brace/mode/markdown';
import 'brace/mode/php';
import 'brace/mode/r';
import 'brace/mode/swift';
import 'brace/mode/yaml';

// <-- Ace Theme Import -->
import 'brace/theme/tomorrow_night_eighties';
import 'brace/theme/chrome';

// <-- Ace Extension Import -->
import 'brace/ext/language_tools';

// <-- Component Import -->
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { CommentComponent } from './comment/comment.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component'
import { HttpClientModule } from '@angular/common/http';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  enableBasicAutocompletion: true,
  fontSize: '16px',
  tabSize: 4,
};

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CommentComponent,
    HeaderComponent,
    CardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AceModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: ACE_CONFIG, useValue: DEFAULT_ACE_CONFIG },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
