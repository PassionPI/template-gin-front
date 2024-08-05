import type { FC } from "react";
import { memo } from "react";
import Todo from "./Todo";

const Home: FC = memo(() => {
  return (
    <>
      <Todo />
    </>
  );
});

export default Home;
