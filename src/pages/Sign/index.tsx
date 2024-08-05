import { sign_up } from "@/services/login";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const Sign: React.FC = () => {
  const nav = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    const { username, password } = values;

    const [error] = await sign_up({ username, password });
    console.error("onFinish", error);
    if (!error) {
      nav("/");
    }
  };

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
        <Typography.Title level={2}>Sign</Typography.Title>
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

export default Sign;
