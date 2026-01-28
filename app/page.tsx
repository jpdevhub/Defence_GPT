"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ArmyGPTLogo from "./assets/defensechatbot.jpeg";
import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionsRow from "./components/PromptSuggessionsRow";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

// Generate unique ID without hydration issues
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const noMessages = messages.length === 0;

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      content,
      role: "user"
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      
      if (data.message) {
        const assistantMessage: Message = {
          id: generateId(),
          content: data.message.content,
          role: "assistant"
        };
        setMessages([...updatedMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: generateId(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant"
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  // Prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <main>
      {/* Only show logo when there are no messages */}
      {noMessages && (
        <Image 
          src={ArmyGPTLogo} 
          width={150} 
          height={150}
          alt="DefenseGPT Logo" 
          priority
        />
      )}
      <section className={noMessages ? "" : "populated"}>
        {noMessages ? (
          <>
            <p className="starter-text">
              Welcome to DefenseGPT!
              Your AI assistant for defense and military affairs.
              Ask anything about global defense, military technologies, or geopolitics.
            </p>
            <br/>
            <PromptSuggestionsRow onPromptClick={handlePrompt}/>
          </>
        ) : (
          <>
            <div className="chat-container">
              {messages.map((message) => (
                <Bubble key={message.id} message={message}/>
              ))}
              {isLoading && <LoadingBubble/>}
              <div ref={messagesEndRef} className="scroll-anchor" />
            </div>
          </>
        )}
      </section>
      <form onSubmit={handleSubmit} className="chat-form">
        <input 
          className="question-box" 
          onChange={(e) => setInput(e.target.value)} 
          value={input} 
          placeholder="Ask me about defense and military topics..." 
          disabled={isLoading}
        />
        <input 
          type="submit" 
          className="send-button"
          value={isLoading ? "..." : "Send"}
          disabled={isLoading || !input.trim()}
        />
      </form>
    </main>
  );
};

export default Home;