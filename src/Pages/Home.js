import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { MyAppBar } from "../Components/Dashboard/Dashboard";

import {
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  MainContainer,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import axios from "axios";

const API_KEY = "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";

const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

const Home = () => {

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ConverseBot! Ask me anything!",
      sentTime: "just now",
      sender: "ConverseBot"
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

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ConverseBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "davinci",
      "prompt": systemMessage.content,
      "temperature": 0.8,
      "max_tokens": 60,
      "stop": ["\n"]
    }

    apiRequestBody["prompt"] += "\nUser: " + apiMessages[apiMessages.length - 1].content;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        apiRequestBody,
        { headers: headers }
      );
      const { choices } = response.data;
      const botMessage = choices[0].text.trim();
      setMessages([...chatMessages, { message: botMessage, sender: "ConverseBot" }]);
    } catch (error) {
      console.error(error);
    }

    setIsTyping(false);
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                  minHeight: "550px",
                  maxHeight: "550px",
                },
                '@media (min-width: 768px)': { // adjust height for tablets and larger screens
                  minHeight: "700px",
                  maxHeight: "700px",
                },
                '@media (min-width: 1024px)': { // adjust height for laptops and larger screens
                  minHeight: "800px",
                  maxHeight: "800px",

                },
              }}>
                <MainContainer style={{margin:"10px", borderStyle:"none"}}>
                  <ChatContainer>
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={isTyping ? <TypingIndicator content="ConverseBot is typing" /> : null}
                    >
                      {messages.map((message, i) => {
                        console.log(message)
                        return <Message key={i} model={message} />
                      })}
                    </MessageList>
                    <MessageInput placeholder="Type message here"
                      onSend={handleSend} />
                  </ChatContainer>
                </MainContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;