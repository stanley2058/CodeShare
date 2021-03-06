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
import {
  MatTooltipModule,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

// <-- Ace Import -->
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';

// import 'brace';

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
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HistoryComponent } from './history/history.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  wrap: true,
  wrapBehavioursEnabled: true,
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
    ProfileComponent,
    AboutComponent,
    HistoryComponent,
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
    MatCheckboxModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: ACE_CONFIG, useValue: DEFAULT_ACE_CONFIG },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
