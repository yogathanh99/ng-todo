export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  editing: boolean;
}

export interface TodoInput {
  title: string;
  description: string;
}
