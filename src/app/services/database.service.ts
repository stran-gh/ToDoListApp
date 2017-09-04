import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../models/user.model';
import { Chore } from '../models/chore.model';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Injectable()
export class DatabaseService{
	constructor(private http: Http){}

	currentUserKey: string;

	storeUser(user: string, chore: Chore){
		return this.http.post('https://todoproject-8af70.firebaseio.com/data.json', new User(user, chore));
	}

	storeChore(user: string, choreName: string){
		//create post object
		var postData = {
			user: user,
			chore: {
				title: choreName,
				description: "test"
			}
		};
		var updates = {};
		updates['/data/' + this.currentUserKey] = postData;
		return firebase.database().ref().update(updates);

	}

	getCurrentUserKey(user: string){
		var data = firebase.database().ref("data");
		data.once('value', (snapshot) => {
			var list = snapshot.val();
			for(let key in list){
				if(user == (list[key].user)){
					this.currentUserKey = key;
				}
			}
		});
	}

	getUsers() : Promise<any> {
		var data = firebase.database().ref("data");
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
		var database = firebase.database().ref("data");

		database.once('value', function(snapshot) {
				var test = snapshot.val();

				for(let key in test){
					if(user == (test[key].user)){
						firebase.database().ref("/data/" + key).remove();
					}
				}
			});	
	}
}