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

	currentUserKey: string;
	currentUserChores = new EventEmitter<Chore[]>();
	choreCount = new EventEmitter<number>();


	storeUser(user: string, chores: Chore, choreCount: number){
		return this.http.post('https://todoproject-8af70.firebaseio.com/data.json', new User(user, chores, choreCount));
	}

	storeChore(user: string, choreName: string, choreDescription: string){
		var data = firebase.database().ref("/data/"+ this.currentUserKey);

		//create post object for chore to add to db
		var postData = {
					chore: choreName,
					description: choreDescription
				};	
		data.child("chores").push(postData); 
	}

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

	getChoreCount(user: string) : number{
		var data = firebase.database().ref("/data/" + this.currentUserKey);
		var choreCount = 0;
		data.once('value', function(snapshot){
			choreCount = snapshot.val().choreCount;
		})
		return choreCount;
	}

	getChores() : Promise<any> {
		var data = firebase.database().ref("/data/" + this.currentUserKey + "/chores");
		return new Promise<any>((resolve, reject) => {
			data.once('value', (snapshot) => {
				var choresList: Chore[] = [];
				var list = snapshot.val();
				var choreCount = 0;

				for(let key in list){
					choresList.push(new Chore(list[key].chore, list[key].description));
					choreCount++;
				}
				//updating chorecount
				var ccData = firebase.database().ref("/data/" + this.currentUserKey);
				var updates = {};
				updates["/choreCount/"] = choreCount;
				ccData.update(updates);

				resolve(choresList);
			});
		})
		
	}

	getUsers() : Promise<any> {
		var data = firebase.database().ref("/data/");
		let userArray: string[] = [];
		return new Promise<any>((resolve, reject) => {
			data.on('value', function(snapshot) {

				userArray = [];
				var dataList = snapshot.val();

				for( let key in dataList ){
					userArray.push(dataList[key].user);
				}
				resolve(userArray);
			});
		})
	}

	//experimental to see if we can get count from database
	getUsersToList() : Promise<any>{
		var data = firebase.database().ref("/data/");
		let userList: User[] = [];
		return new Promise<any>((resolve, reject) => {
			data.on('value', function(snapshot){
				userList = [];
				var dataList = snapshot.val();
				for(let key in dataList){
					userList.push(new User(dataList[key].user, null, dataList[key].choreCount));
				}
				resolve(userList);
			})
		});
	}

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

	deleteChore(choreName: string, user: string){
		var database = firebase.database().ref("/data/" + this.currentUserKey + "/chores/");
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
					firebase.database().ref("/data/" + userKey + "/chores/" + key).remove();
				}
			}
		})
	}
}