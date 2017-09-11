import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatabaseService } from '../services/database.service';
import { User } from '../models/user.model';
import { Chore } from '../models/chore.model'; 


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

	userName:string; // Name inputted by users to add from forms
	baseChoreCount: number = 0; // Count added with every new user
	userList: User[] = []; // User List retrieved with the amount of chores
	currCC: number = 0; // Chorecount of the current user

	ngOnInit(){
		// Initial display
		this.displayUserAndCC();

		// Listen for change to the current chore count and properly displays
		this.databaseService.currentChoreCount.subscribe(
			(resultCC: number) => {
				this.currCC = resultCC;
				this.displayUserAndCC();
			}
		);


	}
	
	// All users with their chores and count are added to the list.
	displayUserAndCC(){
			return this.databaseService.getUsersToList().then(
				(result) => {
					this.userList = result;
				}
			);
	}

	// Method to display the proper fields of a user when selected
	selectUser(event, user){
		this.selectedUser = user;
		this.userService.currentUser.emit(this.selectedUser);
		this.databaseService.getCurrentUserKey(this.selectedUser);
		this.databaseService.getChores().then(
			(result) => this.databaseService.currentUserChores.emit(result)
		);
		this.displayUserAndCC();
	}

	// Deletes the selected user from the database.
	deleteUser(user){
		this.databaseService.deleteUser(user);
		this.userService.currentUser.emit(null);
		this.displayUserAndCC();
	}

	// Method activated from the Add User button, stores a new user
	// in the database and displays on the list.
	addNewUser(){
		if(this.userName == null || this.userName == ""){
			alert("This field cannot be empty!");
		}
		else{
			this.databaseService.storeUser(
					this.userName, null, this.baseChoreCount)
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