import { login } from "@/services/login";
import { nav } from "@/utils/history";
import { Button, Form, Input, Typography } from "antd";

const onFinish = async (values: { username: string; password: string }) => {
  const { username, password } = values;
  const [error] = await login({ username, password });
  console.log("onFinish", error);
  if (!error) {
    nav.go("/");
  }
};

const Login: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Typography.Title level={2}>Login</Typography.Title>
        <Form
          name="basic"
          layout="vertical"
          style={{ width: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
