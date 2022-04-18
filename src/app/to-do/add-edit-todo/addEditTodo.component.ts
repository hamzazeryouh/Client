import { Component, Input, OnInit } from '@angular/core';
import { todoItem } from 'src/app/Models/TodoItem';
import { todoList } from 'src/app/Models/TodoList';

import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-addEditTodo',
  templateUrl: './addEditTodo.component.html',
  styleUrls: ['./addEditTodo.component.css'],
})
export class AddEditTodoComponent implements OnInit {
  newTodo: string;
  titre: string;

  @Input() todoList!: todoList;
  currentItemsList!: todoList;

  constructor(private service: TodoListService) {
    this.titre = '';
    this.newTodo = '';
  }

  ngOnInit() {
    if (this.todoList) {
      this.titre = this.todoList.titre;
    }
  }

  addTodoItemToList() {
    var newItemToAdd: todoItem = {
      id: 0,
      titre: this.newTodo,
      statut: false,
      description: 'ma description',
    };

    if (this.todoList) {
      if (this.todoList.toDoItemList)
        this.todoList.toDoItemList.push(newItemToAdd);
      if (!this.todoList.toDoItemList) {
        this.todoList.toDoItemList = [];
        this.todoList.toDoItemList.push(newItemToAdd);
      }
    }
    this.newTodo = '';
  }

  saveToDoList() {
    if (this.todoList.Id == 0) {
      if (!this.todoList.toDoItemList)
        this.todoList.toDoItemList = [];
      this.service.addToDoList(this.todoList).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
    } else {
      this.service
        .updateToDoList(this.todoList.Id, this.todoList)
        .subscribe((res) => {
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
        });
    }

    //show success
    var showAddSuccess = document.getElementById('add-success-alert');
    if (showAddSuccess) {
      showAddSuccess.style.display = 'block';
    }
    setTimeout(function () {
      if (showAddSuccess) showAddSuccess.style.display = 'none';
    }, 4000);

    this.titre = '';
  }

  deleteTodo(item: todoItem, index: any) {
    if (item.id != 0) {
      this.service.deleteToDoItem(item.id).subscribe((res) => {});
    }
    this.todoList.toDoItemList?.splice(index, 1);
  }
}
