import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { todoList } from '../Models/TodoList';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  readonly mySIRHAPIUrl = 'https://localhost:7019/api';

  constructor(private http: HttpClient) {}

  getToDoList(): Observable<any[]> {
    return this.http.get<any>(this.mySIRHAPIUrl + '/ToDoLists');
  }

  getToDoListTyped(): Observable<todoList[]> {
    return this.http.get<todoList[]>(this.mySIRHAPIUrl + '/ToDoLists');
  }

  addToDoList(data: any) {
    return this.http.post(this.mySIRHAPIUrl + '/ToDoLists', data);
  }

  updateToDoList(id: number, data: any) {
    return this.http.put(this.mySIRHAPIUrl + `/ToDoLists/${data.id}`, data);
  }

  deleteToDoList(id: number|string){
    return this.http.delete(this.mySIRHAPIUrl + `/ToDoLists/${id}`);
  }

  deleteToDoItem(id: number){
    return this.http.delete(this.mySIRHAPIUrl + `/ToDoItems/${id}`);
  }

}
