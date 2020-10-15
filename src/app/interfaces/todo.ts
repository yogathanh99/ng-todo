export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  editing: boolean;
}

export interface TodoInput {
  title: string;
  description: string;
}
