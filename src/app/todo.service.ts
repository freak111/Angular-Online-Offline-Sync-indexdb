
// Dexie solves three main issues with the native IndexedDB API:

// Ambiguous error handling
// Poor queries
// Code complexity

import { Injectable } from '@angular/core';
import {Todo} from './model/Todo';
import Dexie from 'dexie';
import { OnlineOfflineServiceService } from './online-offline-service.service';
@Injectable({
  providedIn: 'root'
})
export class TODOService {
private todos : Todo[]=[];
private db:any;
constructor(private readonly onlineOfflineService: OnlineOfflineServiceService) {
    // this.registerToEvents(onlineOfflineService);
    this.createDatabase();
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineServiceService){
  	onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
        // wehn online send item to indexdb
        this.sendItemsFromIndexedDb();

      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('MyTestDatabase');
    this.db.version(1).stores({
      todos: 'id,value,done'
    });
  }

  private addToIndexedDb(todo: Todo) {
    this.db.todos
      .add(todo)
      .then(async () => {
        const allItems: Todo[] = await this.db.todos.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

   async sendItemsFromIndexedDb() {
    const allItems: Todo[] = await this.db.todos.toArray();
    allItems.forEach((item: Todo) => {
      this.db.todos.delete(item.id).then(() => {
        console.log(`item ${item.id} sent and deleted locally`);
      });
    });
    return 'deleted all'
  }

addTodo(todo: Todo) {
    todo.id = Math.random();
    todo.done = false;
    this.todos.push(todo);
// checking for the system online
if(this.onlineOfflineService.isOnline){
	console.log("datapushed");
	this.addToIndexedDb(todo)
}


  }

  async getAllTodos() {
  	 const allItems: Todo[] = await this.db.todos.toArray();
  	 this.todos = allItems;
  	 	 console.log(allItems , this.todos);
    return this.todos;
  }
}
