import { actionTodo, storeTodo } from "@/app/todo";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Input, List, Space, Typography } from "antd";
import type { FC } from "react";
import { memo } from "react";

type Props = unknown;

const Todo: FC<Props> = memo(() => {
  const { todoList, input } = storeTodo((state) => state);

  return (
    <Card styles={{ body: { width: "100%" } }}>
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
            <List.Item
              key={`${id}-${done}`}
              extra={
                <Button
                  icon={<CloseOutlined />}
                  type="text"
                  size="small"
                  onClick={() => actionTodo.del(id)}
                />
              }
            >
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
