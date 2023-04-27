import React from "react";
import styled from "styled-components";
import Robot from "../assests/robot.gif";

export default function Welcome({ currentUser }) {
  return (
    <>
      <Container>
        <img src={Robot} alt="robot" />
        <h1>
          Welcome <span>{currentUser.username}! </span>
        </h1>
        <h3>Please select a chat to Start Messaging.</h3>
      </Container>
    </>
  );
}
const Container = styled.div`
@media screen and (max-width: 425px) {
  h1 {
    font-size: 1.5rem !important;
  }
  h3 {
    font-size: 1rem !important;
    margin-left: 20px;
  }
  img {
    height: 10rem !important;
  }
}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
