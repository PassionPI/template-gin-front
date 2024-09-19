import type { FC } from "react";
import { memo } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const MobileLayout: FC<Props> = memo(() => {
  return (
    <>
      <Outlet />
    </>
  );
});

export default MobileLayout;
