import { ITask } from './../model/ITask';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {


  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updatedIndex!: any;
  isEditEnabled: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updatedIndex = i;
    this.isEditEnabled = true;



  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false

    })

    this.todoForm.reset();

  }

  updateTask() {
    this.tasks[this.updatedIndex].description = this.todoForm.value.item;
    this.tasks[this.updatedIndex].done = false;
    this.todoForm.reset();
    this.updatedIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number) {
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }






  drop(event: CdkDragDrop<ITask[]>) {
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

}
