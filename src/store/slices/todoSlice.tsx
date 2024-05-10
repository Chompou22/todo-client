import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

interface TodoState extends Array<Todo> {}

export const todoSlice = createSlice({
  name: "todos",
  initialState: [] as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
    toggleCompleted: (
      state,
      action: PayloadAction<{ id: number; taskCompleted: boolean }>
    ) => {
      const { id, taskCompleted } = action.payload;
      const todo = state.find((todo) => todo.id === id);

      if (todo) {
        todo.completed = !taskCompleted;
      }
    },
    editTodo: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const todo = state.find((todo) => todo.id === id);

      if (todo) {
        todo.isEditing = true;
      }
    },
    editTask: (state, action: PayloadAction<{ id: number; task: string }>) => {
      const { id, task } = action.payload;
      const todo = state.find((todo) => todo.id === id);

      if (todo) {
        todo.task = task;
        todo.isEditing = false;
      }
    },
  },
});

export const { addTodo, toggleCompleted, deleteTodo, editTodo, editTask } =
  todoSlice.actions;

export default todoSlice.reducer;
