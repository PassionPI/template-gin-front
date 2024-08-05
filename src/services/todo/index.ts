import { request } from "../request";

export type TodoItem = {
  id: number;
  done: boolean;
  title: string;
};

export const getTodo = async () => {
  return request<TodoItem[] | null>({
    url: "/api/todo/list",
    method: "post",
  });
};

export type AddTodoParams = {
  title: string;
  description?: string;
  deadline?: string;
};

export const addTodo = async (body: AddTodoParams) => {
  return request<TodoItem[]>({
    url: "/api/todo/add",
    method: "post",
    body,
  });
};
