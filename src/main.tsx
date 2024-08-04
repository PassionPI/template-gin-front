import { AppRouter } from "@/routes/router";
import { ConfigProvider } from "antd";
import { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { fetchPubKey, isLogin } from "./services/login";

extend(duration);

fetchPubKey();
isLogin();

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ConfigProvider theme={{ token: { colorPrimary: "#0367c4" } }}>
        <RouterProvider router={AppRouter} />
      </ConfigProvider>
    </StrictMode>,
  );
} else {
  window.console.error("[id=root] element not found");
}
