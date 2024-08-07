import { actionTodo, storeTodo } from "@/app/todo";
import { Button, Card, Checkbox, Input, List, Space, Typography } from "antd";
import type { FC } from "react";
import { memo } from "react";

type Props = unknown;

const Todo: FC<Props> = memo(() => {
  const { todoList, input } = storeTodo((state) => state);

  return (
    <Card styles={{ body: { width: 600 } }}>
      <Space.Compact style={{ width: "100%" }}>
        <Input variant="filled" value={input} onChange={actionTodo.onInput} />
        <Button type="primary" onClick={actionTodo.add}>
          Add
        </Button>
      </Space.Compact>
      <List
        dataSource={todoList}
        renderItem={(item) => {
          const { id, done, title } = item;
          return (
            <List.Item key={`${id}-${done}`}>
              <Checkbox
                checked={done}
                onChange={(e) => {
                  const done = e.target.checked;
                  actionTodo.toggle(id, done);
                }}
              >
                <Typography.Text delete={done}>{title}</Typography.Text>
              </Checkbox>
            </List.Item>
          );
        }}
      />
    </Card>
  );
});

export default Todo;
