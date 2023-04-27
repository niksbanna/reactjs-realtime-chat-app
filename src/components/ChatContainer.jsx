import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { addMessagesRoute, getMessagesRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function getMsg() {
      try {
        if (currentChat) {
          const response = await axios.post(getMessagesRoute, {
            from: currentUser.id,
            to: currentChat._id,
          });
          setMessages(response.data.projectMessages);
        }
      } catch (error) {
        console.log("Error fetching all messages.");
      }
    }
    if (currentChat !== undefined) getMsg();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(addMessagesRoute, {
      from: currentUser.id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser.id,
      message: msg
    });

    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMessage({fromSelf: false, message: msg});
      } )
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
  }, [messages]);


  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat.avatarImage} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className="chat-message">
            {messages.map((msg) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        msg.fromSelf ? "sended" : "received"
                      }`}
                      >
                      <div className="content">
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <Messages /> */}
          <div className="chat-input">
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
@media screen and (max-width: 425px) { 
  *{
    font-size: 12px;
  }
  .content {
    padding: 0.7rem !important;
  }
  .submit {
    padding: 0.3rem !important;
  }
  .input-container {
    input {
      font-size: 1rem !important;
    }
  }
}

  padding-top: 1rem;
  gap: 0.3rem;
  display: grid;
  grid-template-rows: 10% 78% 12% ;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080) {
    grid-auto-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #fff;
        }
      }
    }
  }
  .chat-message {
    padding: 1rem 2rem;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
