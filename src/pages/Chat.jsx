import axios from "axios";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import {io} from 'socket.io-client';
const Contacts = React.lazy(() => import('../components/Contacts'));
const ChatContainer = React.lazy(() => import('../components/ChatContainer'));

function Chat() {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    getUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser.id)
    }
  }, [currentUser])

  useEffect(() => {
    async function getContacts() {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser.id}`);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error("Error getting user details from server");
      }
    }
    getContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Suspense fallback={ <div>Please wait...</div> } >
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          </Suspense>
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <Suspense fallback={<div>Please wait...</div>} >
              <ChatContainer
                currentUser={currentUser}
                currentChat={currentChat}
                socket={socket}
              />
            </Suspense>
          )}
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
@media screen and (max-width: 425px) {
  .container {
    width: 100vw !important;
    height: 100vh !important;
    grid-template-columns: 15% 85% !important;
  }
  
}
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    width: 85vw;
    height: 85vh;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
