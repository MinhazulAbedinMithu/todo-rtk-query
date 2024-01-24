import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TFilter = "high" | "medium" | "low";
export type TTodo = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  isCompleted: boolean;
};

export interface ITodoState {
  todos: TTodo[];
  filteredTodos: TTodo[];
  filterOption: string;
}
const initialState: ITodoState = {
  todos: [],
  filteredTodos: [],
  filterOption: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: ITodoState, action: PayloadAction<TTodo>) => {
      state.todos = [...state.todos, action.payload];
      state.filteredTodos = state.todos;
    },
    updateTodo: (state: ITodoState, action: PayloadAction<TTodo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload?.id ? action.payload : todo
      );
      state.filteredTodos = state.todos;
    },
    removeTodo: (state: ITodoState, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.filteredTodos = state.todos;
    },
    toggleComplete: (state: ITodoState, action: PayloadAction<string>) => {
      const newTodos: TTodo[] = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      newTodos.sort((a, b) => {
        return (a.isCompleted ? 1 : 0) - (b.isCompleted ? 1 : 0);
      });
      state.todos = newTodos;
      state.filteredTodos = state.todos;
    },

    applyFilter: (state: ITodoState, action: PayloadAction<string>) => {
      state.filterOption = action.payload;
      state.filteredTodos =
        action.payload !== "all"
          ? state.todos.filter((todo) => todo.priority === action.payload)
          : state.todos;
    },
  },
});

export default todoSlice.reducer;

export const { addTodo, updateTodo, removeTodo, toggleComplete, applyFilter } =
  todoSlice.actions;
