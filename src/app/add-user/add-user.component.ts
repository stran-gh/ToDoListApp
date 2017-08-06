import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent{
	constructor(private userService: UserService){}

	userName:string;

	addNewUser(){
		if(this.userName == null || this.userName == ""){
			//Do nothing
		}
		else{
		this.userService.userArray.push(this.userName);
		this.userName = "";
		console.log(this.userService.userArray);
		}	
	}


}

