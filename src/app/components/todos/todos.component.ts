import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent  implements OnInit {

 
  todoForm  !: FormGroup;
  tasks :  Task[] = [];
  inProgress : Task [] = [];
  done : Task[] = [];
  updateIndex !: any;
  isEditEnable : boolean = false;
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  donee = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem( 
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  constructor(private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      item:['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description : this.todoForm.value.item,
      done:false,
    })
    this.todoForm.reset();
  }

  updateTask(){
   this.tasks[this.updateIndex].description = this.todoForm.value.item;
   this.tasks[this.updateIndex].done = false; 
   this.todoForm.reset();
   this.updateIndex = undefined;  
   this.isEditEnable = false;
  }

  deleteTask(i : number){
    this.tasks.splice(i,1);
  }

  deleteinProgress(i : number){
    this.inProgress.splice(i,1);
  }

  deleteinDone(i : number){
    this.done.splice(i,1);
  }

  onEdit(item: Task, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnable = true;
  }
}
