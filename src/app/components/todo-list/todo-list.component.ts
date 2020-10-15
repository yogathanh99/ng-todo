import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { trigger, transition, style, animate } from '@angular/animations';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' })),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  idForTodo: number;
  filter: string;
  anyRemainingModel: boolean;

  constructor(private todoService: TodoService) {}

  get list() {
    return this.todoService.get();
  }

  ngOnInit(): void {
    this.anyRemainingModel = true;
    this.filter = 'all';
  }

  onEditTodo(todo: Todo): void {
    todo.editing = true;
  }

  onDoneEdit(todo: Todo): void {
    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;
  }

  onCancelEdit(todo: Todo): void {
    todo.editing = false;
  }

  onDeleteTodo(id: string): void {
    this.todoService.delete(id);
  }

  remaining(): number {
    return this.list.filter((todo) => !todo.completed).length;
  }

  isAtLeastOneCompleted(): boolean {
    return this.list.filter((todo) => todo.completed).length > 0;
  }

  onClearCompleted(): void {
    this.todoService.clearCompleted();
  }

  handleCheckAllTodos(e: InputEvent): void {
    this.list.forEach(
      (todo) => (todo.completed = (e.target as HTMLInputElement).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  handleTodosFiltered(): Todo[] {
    this.todos = [...this.list];
    if (this.filter === 'all') {
      return this.list;
    } else if (this.filter === 'active') {
      return this.list.filter((todo) => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.list.filter((todo) => todo.completed);
    }

    return this.todos;
  }
}
