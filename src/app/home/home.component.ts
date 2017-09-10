import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Chore List';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // Method checks if the user is logged in with Firebase
  isAuthenticated(){
  	return this.authService.isAuthenticated();
  }

}
