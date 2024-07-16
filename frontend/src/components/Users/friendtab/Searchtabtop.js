import React from "react";
import Top from "./Top";
import Buttonsection from "./Buttonsection";
import styled from "styled-components";
import DirectMessage from "./DirectMessage";
import { Outlet } from "react-router-dom";
const Searchtabtop = () => {
  return (
    <Flex>
      <Cover>
        <Top />
        <Buttonsection />
        <DirectMessage />
      </Cover>
      <Outlet />
    </Flex>
  );
};

export default Searchtabtop;

const Flex = styled.div`
  display: flex;
`;
const Cover = styled.div`
  max-width: 15rem;
  min-width: 15rem;

  background-color: #2b2d31;
`;
