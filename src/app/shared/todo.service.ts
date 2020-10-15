import { Injectable } from '@angular/core';
import { Todo, TodoInput } from '../interfaces/todo';
import { v4 as uuidv4 } from 'uuid';

let list: Todo[] = [];

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  get(): Todo[] {
    return list;
  }

  add(todo: TodoInput): void {
    list = [
      ...list,
      { ...todo, id: uuidv4(), completed: false, editing: false },
    ];
  }

  delete(id: string): void {
    list = list.filter((todo) => todo.id !== id);
  }

  clearCompleted(): void {
    list = list.filter((todo) => !todo.completed);
  }
}
