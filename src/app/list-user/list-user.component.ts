import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model';


@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent{
	@Input() selectedUser: string;
	constructor(private userService:UserService,
			private databaseService: DatabaseService){}

	ngOnInit(){
		this.displayUsers();
	}

	userArray:string[] = [];

	userName:string;

	displayUsers(){
			return this.databaseService.getUsers().then(
				(result) => this.userArray = result
			);
	}

	selectUser(event, user){
		this.selectedUser = user;
		this.userService.currentUser.emit(this.selectedUser);
		this.databaseService.getCurrentUserKey(this.selectedUser);
	}

	deleteUser(user){
		this.databaseService.deleteUser(user);
		this.userService.currentUser.emit(null);
		this.displayUsers();
	}

	addNewUser(){
		if(this.userName == null || this.userName == ""){
			//Do nothing
		}
		else{
			this.databaseService.storeUser(this.userName, null)
			.subscribe(
				(response) => console.log(response),
				(error) => console.log(error)
			);
			this.userName = "";
		}	
		setTimeout(() => {
				this.displayUsers();
			}, 500);
	}
	
	

	
}