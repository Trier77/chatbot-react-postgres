
import { ChatInput, ChatMessages } from "../components/Chat";



export default function newChat() {
 
  
  return (
    <main className="chat-container">
        <h2 className="chat-thread-header">Say something smart</h2>
      <ChatMessages messages={[]}/>

      {/* Chat input area */}
      <ChatInput onAddMessage={() => {}}/>
      
    </main>
  );
}