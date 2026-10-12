

/**
 * Sidebar Components
 *
 * This file demonstrates React component organization and modularity:
 * 1. Multiple related components in one file
 * 2. Import/export patterns for sharing components
 * 3. Component composition and hierarchy
 * 4. File organization for better project structure
 */

import { useState } from "react";
import { Link, href, } from "react-router";



/**
 * SidebarHeader Component
 *
 * Handles the top section of the sidebar with title and new chat button.
 * This component demonstrates single responsibility and reusability.
 */
function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <h2 className="chatbot-title">Chatbot</h2>
      <Link to="/chat/new" className="new-chat-btn">
        + New
      </Link>
    </div>
  );
}

/**
 * ChatThreadItem Component
 *
 * A reusable component for individual chat thread links.
 * Demonstrates props usage: receives href and title from parent component.
 * This pattern allows the same component structure with different data.
 */
function ChatThreadItem({title, id, onDeleteThread}) {

  function handleDeleteClick(event){
    event.stopPropagation();
    if(onDeleteThread){
        onDeleteThread(id);
    }
  }

  return (
    <li className="chat-thread-item">
      <div className="chat-thread-item-content">
        <Link to={href("/chat/:threadId", { threadId: id })}
        className="chat-thread-link">
        {title}
      </Link>
      <button type="button" aria-label={`Delete thread ${title}`} onClick={handleDeleteClick}>&times;</button>
      </div>
      
    </li>
  );
}

/**
 * ChatThreadsList Component
 *
 * Now receives data via PROP DRILLING! This demonstrates:
 * 1. PROP DRILLING: Data flows Layout -> Sidebar -> ChatThreadsList
 * 2. COMPONENT REUSABILITY: Can work with any threads array passed as props
 * 3. DATA FLOW: Shows how data moves through multiple component layers
 * 4. CONSISTENT PATTERNS: Uses same props.data.map() pattern as ChatMessages
 */
function ChatThreadsList({threads =[], onDeleteThread}) {
    const [searchValue, setSearchValue] = useState("");
    
    const handleSearchChange =(event) => {
        setSearchValue(event.target.value);
    };

    const filteredThreads =threads.filter((thread) =>
         thread.title.toLowerCase().includes(searchValue.toLowerCase()),);
  return (
    <nav className="chat-threads-list" aria-label="Chat threads">
        <input className="search-input" value={searchValue} onChange={handleSearchChange} placeholder="Search conversations..." />
      <ul>
        {/* Using props.threads - data passed down through prop drilling! */}
        {filteredThreads.map(({id, title}) => (
          <ChatThreadItem
            key={id}
            
            title={title}
            id={id}
            onDeleteThread={onDeleteThread}
          />
        ))}
      </ul>
    </nav>
  );
}

/**
 * SidebarFooter Component
 *
 * Handles the user profile section at the bottom of the sidebar.
 * Demonstrates component modularity and independence.
 */
function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <Link to="/profile" className="user-profile">
        <img
          src="https://ui-avatars.com/api/?name=Batman&background=0D0D0D&color=fff&size=40"
          alt="User avatar"
          className="user-avatar"
          width={30}
          height={30}
        />
        <span className="user-name">Batman</span>
      </Link>
    </div>
  );
}

/**
 * Main Sidebar Component
 *
 * Now demonstrates PROP DRILLING - receiving props and passing them down:
 * 1. PROPS ACCEPTANCE: Receives 'threads' prop from Layout parent
 * 2. PROP DRILLING: Passes threads down to ChatThreadsList child
 * 3. INTERMEDIATE COMPONENT: Acts as bridge between Layout and ChatThreadsList
 * 4. COMPONENT COMPOSITION: Combines multiple components while managing data flow
 */
export default function Sidebar({threads, onDeleteThread}) {
  return (
    <aside className="sidebar">
      {/* Component composition with prop drilling */}
      <SidebarHeader />
      <ChatThreadsList threads={threads}
      onDeleteThread={onDeleteThread} />
      <SidebarFooter />
    </aside>
  );
}
