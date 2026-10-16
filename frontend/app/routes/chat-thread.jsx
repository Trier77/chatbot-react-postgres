import { ChatInput, ChatMessages } from "../components/Chat";
import { useState } from "react";
import { useParams } from "react-router";
import { useLoaderData } from "react-router";

    


export async function clientLoader({ params }) {

  const threadId = params.threadId;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const threadUrl = `${supabaseUrl}/rest/v1/threads?id=eq.${threadId}&select=*`
  

  const threadResponse = await fetch(threadUrl, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
   });

   const threadData = await threadResponse.json();
   const thread = threadData[0];

    if (!thread){
      throw new Error("Thread not found",{status:404})
    }

    const messageUrl = `${supabaseUrl}/rest/v1/messages?thread_id=eq.${threadId}&select=*&ordercreated_at.asc`

    const messageResponse = await fetch(messageUrl, {
      headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
   });

    if (!messageResponse){
      throw new Error(`Messages not found: ${messageResponse.status}`)
    }
    const messages = await messageResponse.json(); 
    return {thread, messages}
    }

    
    

    // await new Promise((resolve) => setTimeout(resolve, 500));

    // const defaultMessages = [
    // {
    //     id: 1,
    // type: "user",
    // content: "This is user's original message"
    // },
    // {
    //     id: 2,
    //     type: "bot",
    //     content: "This is the first bot response"
    // }
    // ];
    // return {
    //     threadId: params.threadId,
    //     messages: defaultMessages
    // };

    
    



export default function chatThread() {
  const {thread, messages} =useLoaderData();
    
  const addMessage = (content) => {
    console.log("Message submitted:", content);
    console.log("(Data mutations will be implemented in the next phase)");
  };
  
  return (
    <main className="chat-container">
    <h2 className="chat-thread-header">{thread.title}</h2>
      <ChatMessages messages={messages}/>

      {/* Chat input area */}
      <ChatInput onAddMessage={addMessage}/>
      
    </main>
  );
}