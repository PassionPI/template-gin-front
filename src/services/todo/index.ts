import { request } from "../request";

export type TodoItem = {
  id: number;
  done: boolean;
  title: string;
};

export const getTodo = async () => {
  return request<TodoItem[] | null>({
    url: "/api/v1/todo/list",
    method: "post",
    search: {
      page: 0,
      size: 10,
    },
  });
};

export type AddTodoParams = {
  title: string;
  description?: string;
  deadline?: string;
};

export const addTodo = async (body: AddTodoParams) => {
  return request<TodoItem[]>({
    url: "/api/v1/todo/add",
    method: "post",
    body,
  });
};

export type UpdateTodoParams = {
  id: number;
  done: boolean;
};

export const updateTodo = async (body: UpdateTodoParams) => {
  return request<TodoItem[]>({
    url: "/api/v1/todo/put",
    method: "post",
    body: {
      ...body,
      deadline: new Date().toISOString(),
    },
  });
};

export const delTodo = async (id: number) => {
  return request<TodoItem[]>({
    url: "/api/v1/todo/del",
    method: "post",
    body: { id },
  });
};
