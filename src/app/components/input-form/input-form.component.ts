import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoInput } from 'src/app/interfaces/todo';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  inputForm: FormGroup;
  input: TodoInput = {
    title: '',
    description: '',
  };

  constructor(private todoService: TodoService) {}

  get title() {
    return this.inputForm.get('title');
  }

  get description() {
    return this.inputForm.get('description');
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      title: new FormControl(this.input.title, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]*$/),
      ]),
      description: new FormControl(this.input.description, [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });
  }

  onAddTodo(inputForm: TodoInput): void {
    this.todoService.add(inputForm);
    this.inputForm.reset();
  }
}
