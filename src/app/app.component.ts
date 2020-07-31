import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {Todo} from './model/Todo'
import {TODOService} from './todo.service'
import { OnlineOfflineServiceService } from './online-offline-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Online-Offline-Sync';
  form: FormGroup;

  todos: Todo[] = [];

  constructor(
    private readonly todoService: TODOService,
    public readonly onlineOfflineService: OnlineOfflineServiceService
  )  {
    this.form = new FormGroup({
      value: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // do something
   this.todoService.getAllTodos().then(data => {
      this.todos = data;
    console.log(data);
})
  }

  addTodo() {
    // do something else
this.todoService.addTodo(this.form.value)
    this.form.reset();
  }

  markAsDone(todo: Todo) {
    todo.done = !todo.done;
  }

  deleteAllRecords(){
  	this.todoService.sendItemsFromIndexedDb().then(data=>{
  		console.log(data);
  	})
  }
}
