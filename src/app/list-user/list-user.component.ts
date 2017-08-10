import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent{
	@Input() selectedUser: string;
	constructor(private userService:UserService){}

	userArray:string[] = this.userService.userArray;
	
	selectUser(event, user){
		this.selectedUser = user;
		this.userService.currentUser.emit(this.selectedUser);
		
	}
}