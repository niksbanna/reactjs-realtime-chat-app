import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiCLick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const handleEmojiPickerChange = () => {
    setEmojiPicker(!showEmojiPicker);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerChange} />
          {showEmojiPicker && (
            <EmojiPicker
              height={400}
              width={300}
              emojiStyle="native"
              onEmojiClick={handleEmojiCLick}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
@media screen and (max-width: 425px) {
  grid-template-columns: 15% 85% !important;
}
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width:720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    .emoji {
      padding-left: 0.5rem;
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #fbba08;
        cursor: pointer;
      }
      svg:hover {
        color: #ffff00c8;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -410px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 5%;
          &-thumb {
            background-color: #9186f3;
          }
        }
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .epr-emoji-category-label {
          background-color: #080420;
        }
      }
    }
    
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #fff;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width:720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      };
      svg {
        font-size: 2rem;
        color: #fff;
      }
      &:hover {
        cursor: pointer;
      opacity: 0.7;
    }
    }
  }
`;
