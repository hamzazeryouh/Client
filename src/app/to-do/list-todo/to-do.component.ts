import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { todoList } from '../../Models/TodoList';


import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  //toDoList$!: Observable<any[]>;
  toDoListArray: todoList[] = [];
  sentTodoList!: todoList;
  activateAddEditInspectionComponent: boolean = false;

  modalTitle: string = '';

  constructor(private service: TodoListService) {}

  ngOnInit(): void {
    //this.toDoList$ = this.service.getToDoList();
    this.toDoListMap();
  }

  toDoListMap() {
    this.service.getToDoList().subscribe((data) => {
      this.toDoListArray = data;
      for (let i = 0; i < data.length; i++) {
        data[i].itemsNumber = data[i].toDoItemList?.length;
        var countDone: number = 0;
        for (let j = 0; j < data[i].toDoItemList?.length; j++)
        {
          if (data[i].toDoItemList[j].statut == true)
          {
            countDone++;
          }
        }
        data[i].itemsNumerDone = countDone;
      }
    });
  }

  modalAdd() {
    this.modalTitle = 'Ajout nouvelle liste';
    var toDoList: any = {
      Id: 0,
      titre: '',
      description: 'description',
    };
    this.sentTodoList = toDoList;
    this.activateAddEditInspectionComponent = true;
  }

  modalClose() {
    //refresh data
    //this.toDoList$ = this.service.getToDoList();
    this.toDoListMap();
    this.activateAddEditInspectionComponent = false;
  }

  modalEdit(item: todoList) {
    this.modalTitle = 'Edit To Do List';
    this.sentTodoList = item;
    this.activateAddEditInspectionComponent = true;
  }

  deleteItem(item: any) {
    if (confirm(`Are you sure you want to delete inspection ${item.id}`)) {
      this.service.deleteToDoList(item.id).subscribe((res) => {
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) showDeleteSuccess.style.display = 'none';
        }, 4000);

        //this.toDoList$ = this.service.getToDoList();
        this.toDoListMap();
      });
    }
  }
}
