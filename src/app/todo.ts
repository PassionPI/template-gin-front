import {
  addTodo,
  delTodo,
  getTodo,
  TodoItem,
  updateTodo,
} from "@/services/todo";
import { message } from "antd";
import { create } from "zustand";

export const storeTodo = create<{
  input: string;
  todoList: TodoItem[];
}>()(() => ({
  input: "",
  todoList: [],
  // addTodo: (todo) => set((state) => ({ todoList: [...state.todoList, todo] })),
  // removeTodo: (todo) =>
  //   set((state) => ({ todoList: state.todoList.filter((t) => t !== todo) })),
  // clearTodo: () => set({ todoList: [] }),
}));

export const actionTodo = {
  async init() {
    const [err, todo] = await getTodo();
    if (err) {
      return;
    }
    storeTodo.setState({ todoList: todo || [] });
  },
  async add() {
    const input = storeTodo.getState().input;
    if (!input) {
      message.info("Please enter the title");
      return;
    }
    const [err] = await addTodo({ title: storeTodo.getState().input });
    if (err) {
      return;
    }
    actionTodo.init();
  },
  async del(id: number) {
    if (id == null) {
      message.info("Please enter the id");
      return;
    }
    const [err] = await delTodo(id);
    if (err) {
      return;
    }
    actionTodo.init();
  },
  async toggle(id: number, done: boolean) {
    const [err] = await updateTodo({ id, done });
    if (err) {
      return;
    }
    actionTodo.init();
  },
  onInput(e: React.ChangeEvent<HTMLInputElement>) {
    storeTodo.setState({ input: e.target.value });
  },
};
