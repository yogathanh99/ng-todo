import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { trigger, transition, style, animate } from '@angular/animations';

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
  todoTitle: string;
  idForTodo: number;
  filter: string;
  anyRemainingModel: boolean;

  constructor() {}

  ngOnInit(): void {
    this.anyRemainingModel = true;
    this.filter = 'all';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'Finish Angular',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Finish HW',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'Todo Something',
        completed: true,
        editing: false,
      },
    ];
  }

  onAddTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos = [
      ...this.todos,
      {
        id: this.idForTodo,
        title: this.todoTitle,
        completed: false,
        editing: false,
      },
    ];

    this.todoTitle = '';
    this.idForTodo++;
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

  onDeleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  remaining(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  isAtLeastOneCompleted(): boolean {
    return this.todos.filter((todo) => todo.completed).length > 0;
  }

  onClearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  handleCheckAllTodos(e: InputEvent): void {
    this.todos.forEach(
      (todo) => (todo.completed = (e.target as HTMLInputElement).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    console.log(this.remaining());
    return this.remaining() !== 0;
  }

  handleTodosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.completed);
    }

    return this.todos;
  }
}
