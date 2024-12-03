import React from "react";
import { Layout, Schedule, TopBar, Wrapper } from "./components";
import { useInit } from "./hooks/useInit";

export const Main: React.FC = () => {
  useInit();

  return (
    <Layout>
      <Wrapper>
        <TopBar />
        <Schedule />
      </Wrapper>
    </Layout>
  );
};
