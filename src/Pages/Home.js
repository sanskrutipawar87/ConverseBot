import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { MyAppBar } from "../Components/Dashboard/Dashboard";

import {
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const API_KEY = "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";

const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

const Home = () => {

  const [display, setdisplay] = useState('chatbot')
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      });
  }

  return (
    <>
      <MyAppBar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Home Page */}
            <Grid item xs={12}>
              <Paper sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                maxHeight: "100vh", // set minimum height to full viewport height
                height: "100%", // set height to 100% of parent container
                overflow: "hidden", // hide overflow to prevent scrolling

                '@media (min-width: 320px)': { // adjust height for phones and larger screens
                  minHeight: "85vh",
                  maxHeight: "85vh"
                },

                '@media (min-width: 600px)': { // adjust height for tablets and larger screens
                  minHeight: "85vh",
                  maxHeight: "85vh"
                },
                '@media (min-width: 768px)': { // adjust height for laptops and larger screens
                  minHeight: "85vh",
                  maxHeight: "85vh"
                },
                '@media (min-width: 1024px)': { // adjust height for laptops and larger screens
                  minHeight: "100vh",
                  maxHeight: "100vh"
                },

                '@media (min-width: 1920px)': { // adjust height for laptops and larger screens
                  minHeight: "85vh",
                  maxHeight: "85vh"
                },

              }}>

                <ChatContainer style={{ margin: "10px" }}>
                  <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                  >
                    {messages.map((message, i) => {
                      console.log(message)
                      return <Message key={i} model={message} />
                    })}
                  </MessageList>
                  <MessageInput placeholder="Type message here"
                    onSend={handleSend} />
                </ChatContainer>

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;