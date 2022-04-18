import { todoItem } from "../Models/TodoItem";



export class todoList {
    Id:number=0;
    titre: string = "";
    description: string = "";
    creationDate: string ="";
    itemsNumber: number = 0;
    itemsNumerDone: number = 0;
    toDoItemList?: todoItem[];
}
