import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'Chore List';

  ngOnInit(){
  	firebase.initializeApp({
  		apiKey: "AIzaSyCwIZz-iV48zx0GyFo8zDW4DCpxqDQ2Z-k",
    	authDomain: "todoproject-8af70.firebaseapp.com",
      databaseURL: "https://todoproject-8af70.firebaseio.com"
  	});
  }
}
