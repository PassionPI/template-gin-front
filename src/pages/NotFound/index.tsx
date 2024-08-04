import { ROUTE } from "@/routes/router";
import { Button, Result } from "antd";
import type { FC } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = memo(() => {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, this page does not exist."
      extra={
        <Button type="primary" onClick={() => nav(ROUTE.home.__)}>
          Back Home
        </Button>
      }
    />
  );
});

export default NotFound;
