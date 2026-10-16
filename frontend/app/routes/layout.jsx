import { Outlet, useLoaderData } from "react-router";
import Sidebar from "../components/Sidebar";
import { useState } from "react";


// const initialiseThreads = [
//         {id:1, title:"How to learn programming"},
//         {id:2, title:"What are the best pizza toppings?"},
//         {id:3, title:"Can you explain quantum physics?"},
//         {id:4, title:"Help me create a morning routine"},
//         {id:5, title:"What should I do this weekend?"},
//         {id:6, title:"Why is the sky blue?"},
//         {id:7, title:"How do I learn a new language?"},
//         {id:8, title:"What's the meaning of life?"},
//         {id:9, title:"Tell me a funny joke"},
//         {id:10, title:"What's a healthy dinner idea?"},
//         {id:11, title:"Recommend me a good book"},
//         {id:12, title:"Give me a creative writing prompt"},
//         {id:13, title:"My computer is slow, help?"},
//         {id:14, title:"Tell me an interesting history fact"},
//     ]

/**
 * Layout Component
 *
 * Now demonstrates PROP DRILLING and DATA FLOW:
 * 1. DATA MANAGEMENT: Layout manages navigation threads data
 * 2. PROP DRILLING: Data flows Layout -> Sidebar -> ChatThreadsList
 * 3. CENTRALIZED CONTROL: Navigation data controlled at layout level
 * 4. COMPONENT COORDINATION: Parent coordinates data between child components
 */

export async function clientLoader() {

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const url = `${supabaseUrl}/rest/v1/threads?select=*&order=created_at.desc`

    // await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok){
      throw new Error(`Failed to fetch threads: ${response.status}`)
    }

    const threads = await response.json();
    return threads;

    // const defaultThreads = [
    // {id:1, title:"How to learn programming"},
    //     {id:"2", title:"What are the best pizza toppings?"},
    //     {id:"3", title:"Can you explain quantum physics?"},
    //     {id:"4", title:"Help me create a morning routine"},
    //     {id:"5", title:"What should I do this weekend?"},
    //     {id:"6", title:"Why is the sky blue?"},
    //     {id:"7", title:"How do I learn a new language?"},
    //     {id:"8", title:"What's the meaning of life?"},
    //     {id:"9", title:"Tell me a funny joke"},
    //     {id:"10", title:"What's a healthy dinner idea?"},
    //     {id:"11", title:"Recommend me a good book"},
    //     {id:"12", title:"Give me a creative writing prompt"},
    //     {id:"13", title:"My computer is slow, help?"},
    //     {id:"14", title:"Tell me an interesting history fact"},
    // ];
    // return {
    //     threads:defaultThreads
    // };

    
}
export default function Layout() {
  const threads =useLoaderData()
  const deleteThread = (threadId) => {
    console.log("Delete thread:", threadId);
    console.log("(Mutations will be implemented in the next phase)");
  }
  return (
    <div className="app-layout">
      <Sidebar threads={threads}
      onDeleteThread={deleteThread}/>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
