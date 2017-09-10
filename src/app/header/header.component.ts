import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }

  // Method logs user out from firebase authentication
  onLogout(){
  	this.authService.logout();
  }
}
