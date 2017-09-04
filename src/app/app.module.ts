import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component'; 

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './services/auth-guard.service';
import { DatabaseService } from './services/database.service';



@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    ToDoListComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
  	NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [UserService, AuthService, AuthGuard, DatabaseService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
