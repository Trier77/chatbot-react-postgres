import { ChatInput, ChatMessages } from "../components/Chat";
import { useState } from "react";
import { useParams } from "react-router";
const defaultMessages = [
    {
        id: 1,
    type: "user",
    content: "This is user's original message"
    },
    {
        id: 2,
        type: "bot",
        content: "This is the first bot response"
    }
    
]



export default function chatThread() {
  const [messages, setMessages] =useState(defaultMessages);
    const {threadId} = useParams();
  const addMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: content
    };

    setMessages([...messages, newMessage]);
  };
  
  return (
    <main className="chat-container">
    <h2 className="chat-thread-header">Conversation {threadId}</h2>
      <ChatMessages messages={messages}/>

      {/* Chat input area */}
      <ChatInput onAddMessage={addMessage}/>
      
    </main>
  );
}