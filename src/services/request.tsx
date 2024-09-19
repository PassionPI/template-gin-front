// fetch的封装, api与fetch对象传参保持一致
// 新增能力
// 	- 参数支持search, 参数格式与URLSearchParams参数相同
//	- 自动 parse json
//  - 自动处理错误

import { loginAuthPending } from "@/services/login/token";
import { createFetch, error, json, wait } from "@passion_pi/fetch";
import { Card, notification, Tag } from "antd";

export const request = createFetch(
  error,
  wait({
    until: () => loginAuthPending,
    pathWhiteList: ["/open/pem", "/open/login", "/open/sign", "/api/ping"],
  }),
  json(),
  async (ctx, next) => {
    const { url, method } = ctx;

    const x = await next();

    const [err, , meta] = x;

    if (err != null) {
      return x;
    }

    const { response } = meta;

    if (response.status != 200) {
      const message = await response.text().then(
        (x) => x || "Empty Error!",
        () => "Unknown Error!",
      );
      notification.warning({
        message: "请求错误",
        description: (
          <>
            <Tag>{response.status}</Tag>
            <Tag>{method}</Tag>
            <Tag>{url.pathname}</Tag>
            <Card size="small">{message}</Card>
          </>
        ),
      });
      return [new Error(message), null, meta];
    }

    return x;
  },
);
