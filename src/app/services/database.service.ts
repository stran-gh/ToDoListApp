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


	storeUser(user: string, chores: Chore){
		return this.http.post('https://todoproject-8af70.firebaseio.com/data.json', new User(user, chores));
	}

	storeChore(user: string, choreName: string, choreDescription: string){
		var data = firebase.database().ref("/data/"+ this.currentUserKey);

		//create post object
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

	getChores(user: string) : Promise<any> {
		var data = firebase.database().ref("/data/" + this.currentUserKey + "/chores");
		return new Promise<any>((resolve, reject) => {
			data.once('value', (snapshot) => {
				var choresList: Chore[] = [];
				var list = snapshot.val();
				for(let key in list){
					choresList.push(new Chore(list[key].chore, list[key].description));
				}
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

	deleteChore(choreName: string){
		var database = firebase.database().ref("/data/" + this.currentUserKey + "/chores/");
		var userKey = this.currentUserKey;
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