import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: ':shortCode', component: EditorComponent },
  { path: '**', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static readonly API_URI = "http://localhost:8080/api/";
  static readonly SOCKET_URI = "ws://localhost:8080/socket";
}
