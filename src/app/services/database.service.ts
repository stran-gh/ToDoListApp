import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user.model';
import { Chore } from '../models/chore.model';
import { EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Injectable()
export class DatabaseService{
	constructor(private http: Http){}

	// Firebase Key reused in many db methods
	currentUserKey: string;
 
	// EventEmitter used to display chores in to-do-list component
	currentUserChores = new EventEmitter<Chore[]>(); 

	// Used to update choreCount of a user anytime a chore is added/deleted
	currentChoreCount = new EventEmitter<number>();

	// Used for adding users to the database, checking for duplicates.
	addedUserExists : boolean = false;

	// Used for checking if duplicate chores are added.
	addedChoreExists : boolean = false;

	// Method to store a user in the database
	storeUser(user: string, chores: Chore, choreCount: number){
		return this.http.post(
			'https://todoproject-8af70.firebaseio.com/data.json',
			 new User(user, chores, choreCount)
			 );
	}

	// Method to store a chore in the database
	storeChore(user: string, choreName: string, choreDescription: string){
		// First check if a chore already exists in database for given user
		var data = firebase.database().ref(
				"/data/" + this.currentUserKey + "/chores");
		data.once('value', (snapshot) => {
			var list = snapshot.val();
			for(let key in list){
				if(list[key].chore == choreName){
					this.addedChoreExists = true;
				}	else {
					this.addedChoreExists = false;
				}
			}
		})
		if(this.addedChoreExists == false){
			// Entered chore does not exist, so we can push it on.
			data = firebase.database().ref("/data/"+ this.currentUserKey);
			// Create post object for chore to add to database
			var postData = {
					chore: choreName,
					description: choreDescription
			};	

			data.child("chores").push(postData); 
		}
		
	}

	// Called everytime a different user is selected to update the db key
	getCurrentUserKey(user: string){
		var data = firebase.database().ref("/data/");
		data.once('value', (snapshot) => {
			var list = snapshot.val();
			for(let key in list){
				if(user == (list[key].user)){
					this.currentUserKey = key;
				}
			}
		});
	}

	// Method to get amount of chores a user has from the database
	getChoreCount(user: string) : number{
		var data = firebase.database().ref("/data/" + this.currentUserKey);
		var choreCount = 0;
		data.once('value', function(snapshot){
			choreCount = snapshot.val().choreCount;
		})
		return choreCount;
	}

	// Method to return a promise, if resolved returns a list of chores 
	// associated with the current User.
	getChores() : Promise<any> {
		var data = firebase.database().ref(
				"/data/" + this.currentUserKey + "/chores");
		return new Promise<any>((resolve, reject) => {
			data.once('value', (snapshot) => {
				var choresList: Chore[] = [];
				var list = snapshot.val();
				var choreCount = 0;

				for(let key in list){
					choresList.push(new Chore(list[key].chore,
										list[key].description));
					choreCount++;
				}

				// Updating chorecount
				var ccData = firebase.database().ref(
						"/data/" + this.currentUserKey);
				var updates = {};
				updates["/choreCount/"] = choreCount;
				ccData.update(updates);

				resolve(choresList);
			});
		})
		
	}

	// Method returns a promise, if resolved, returns a list of User,
	// including the amount of chores they have.
	getUsersToList() : Promise<any>{
		var data = firebase.database().ref("/data/");
		let userList: User[] = [];
		return new Promise<any>((resolve, reject) => {
			data.on('value', function(snapshot){
				userList = [];
				var dataList = snapshot.val();
				for(let key in dataList){
					userList.push(new User(dataList[key].user, null,
											 dataList[key].choreCount));
				}
				resolve(userList);
			})
		});
	}

	checkUserKeyExists(user: string){
		var data = firebase.database().ref("/data");
		data.once('value', (snapshot) => {
			var list = snapshot.val();
			for(let key in list){
				if(user == (list[key].user)){
					this.addedUserExists = true;
					break;
				}	else {
					this.addedUserExists = false;
				}
			}
		})
	}



	// Method deletes a user from the database.
	deleteUser(user: string){
		var database = firebase.database().ref("/data/");

		database.once('value', function(snapshot) {
				var test = snapshot.val();

				for(let key in test){
					if(user == (test[key].user)){
						firebase.database().ref("/data/" + key).remove();
					}
				}
			});	
	}

	// Method deletes a chore form the database
	deleteChore(choreName: string, user: string){
		var database = firebase.database().ref(
						"/data/" + this.currentUserKey + "/chores/");
		var userKey = this.currentUserKey;

		//create post object for choreCount to update
  		var postDataCC = this.getChoreCount(user) - 1;
  		var updates = {};
  		updates["/choreCount/"] = postDataCC;

		firebase.database().ref("/data/"+ this.currentUserKey).update(updates);

		database.once('value', function(snapshot){
			var choreList = snapshot.val();
			for(let key in choreList){
				if(choreList[key].chore == choreName){
					firebase.database().ref(
							"/data/" + userKey + "/chores/" + key).remove();
				}
			}
		})
	}
}