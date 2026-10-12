import { ChatInput, ChatMessages } from "../components/Chat";
import { useState } from "react";
import { useParams } from "react-router";
import { useLoaderData } from "react-router";

    


export async function clientLoader({ params }) {

    await new Promise((resolve) => setTimeout(resolve, 500));

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
    ];
    return {
        threadId: params.threadId,
        messages: defaultMessages
    };

    
}


export default function chatThread() {
  const {threadId, messages} =useLoaderData();
    
  const addMessage = (content) => {
    console.log("Message submitted:", content);
    console.log("(Data mutations will be implemented in the next phase)");
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