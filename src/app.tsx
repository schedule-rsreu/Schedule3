import React from "react";
import { Layout, Schedule, TopBar, Wrapper } from "./components";
import { useInitialization } from "./hooks/useInitialization";

export const Main: React.FC = () => {
  useInitialization();

  return (
    <Layout>
      <Wrapper>
        <TopBar />
        <Schedule />
      </Wrapper>
    </Layout>
  );
};
