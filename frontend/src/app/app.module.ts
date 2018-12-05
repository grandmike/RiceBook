import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent} from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import {HeadlineComponent} from './main/headline/headline.component';
import {ProfileComponent} from './profile/profile.component';
import {FollowingComponent} from './main/following/following.component';
import {PostsComponent} from './main/posts/posts.component';

export const routes: Routes = [ {path: '', component: AuthComponent, pathMatch: 'full'},
                                {path: 'auth', component: AuthComponent, pathMatch: 'full'},
                                {path: 'main', component: MainComponent, pathMatch: 'full'},
                                {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
                                //{path: 'profile', component: ProfileComponent, pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    LoginComponent,
    MainComponent,
    HeadlineComponent,
    FollowingComponent,
    PostsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
