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
			private databaseService: DatabaseService){
	}

	ngOnInit(){
		this.displayUserAndCC();

	}

	userArray:string[] = [];
	userName:string;
	baseChoreCount: number = 0;
	userList: User[] = [];

	
	displayUserAndCC(){
			return this.databaseService.getUsersToList().then(
				(result) => {
					this.userList = result;
				}
			);
	}

	selectUser(event, user){
		this.selectedUser = user;
		this.userService.currentUser.emit(this.selectedUser);
		this.databaseService.getCurrentUserKey(this.selectedUser);
		this.databaseService.getChores().then(
			(result) => this.databaseService.currentUserChores.emit(result)
		);
		this.displayUserAndCC();
	}

	deleteUser(user){
		this.databaseService.deleteUser(user);
		this.userService.currentUser.emit(null);
		this.displayUserAndCC();
	}

	addNewUser(){
		if(this.userName == null || this.userName == ""){
			//Do nothing
		}
		else{
			this.databaseService.storeUser(this.userName, null, this.baseChoreCount)
			.subscribe(
				(response) => console.log(response),
				(error) => console.log(error)
			);
			this.userName = "";
		}	
		setTimeout(() => {
				this.displayUserAndCC();
			}, 500);
	}
	
	

	
}