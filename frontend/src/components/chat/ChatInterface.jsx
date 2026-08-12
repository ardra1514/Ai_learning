import React, { useState, useEffect, useRef, useContext } from "react";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";


import { AuthContext} from "../../context/AuthContext";

import Spinner from "../../components/common/Spinner";
import MarkdownRenderer from "../../components/common/MarkdownRenderer";
import aiService from "../../services/aiServices";

const ChatInterface = () => {
  const { id: documentId } = useParams();

  const { user } = useContext(AuthContext);

  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setInitialLoading(true);

        const response =
          await aiService.getChatHistory(documentId);

        setHistory(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchChatHistory();
  }, [documentId]);



useEffect(() => {
  scrollToBottom();
}, [history]);

const handleSendMessage = async (e) => {
  e.preventDefault();

  if (!message.trim()) return;

  const userMessage = {
    role: "user",
    content: message,
    timestamp: new Date(),
  };

  setHistory((prev) => [...prev, userMessage]);
  setMessage("");
  setLoading(true);

  try {
    const response = await aiService.chat(
      documentId,
      userMessage.content
    );

    const assistantMessage = {
      role: "assistant",
      content: response.data.answer,
      timestamp: new Date(),
      relevantChunks: response.data.relevantChunks,
    };

    setHistory((prev) => [...prev, assistantMessage]);
  } catch (error) {
    console.error("Chat error:", error);

    const errorMessage = {
      role: "assistant",
      content: "Sorry, I encountered an error",
      timestamp: new Date(),
    };

    setHistory((prev) => [...prev, errorMessage]);
  } finally {
    setLoading(false);
  }
};

const renderMessage = (msg, index) => {
  const isUser = msg.role === "user";

  return (
    <div
      key={index}
      className={`flex items-start gap-4 mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-lg shrink-0">
          <Sparkles
            className="w-5 h-5 text-white"
            strokeWidth={2}
          />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] p-5 rounded-3xl shadow-md transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] text-white rounded-br-lg"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-lg"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-7 whitespace-pre-wrap">
            {msg.content}
          </p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:mb-3">
            <MarkdownRenderer content={msg.content} />
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-11 h-11 rounded-2xl bg-[var(--secondary-dark)] text-white flex items-center justify-center font-semibold shadow-lg shrink-0">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </div>
  );
};

if (initialLoading) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-white rounded-3xl border border-slate-200 shadow-lg">

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-xl shadow-[var(--teal)]/20 animate-pulse">
        <MessageSquare
          className="w-10 h-10 text-white"
          strokeWidth={2}
        />
      </div>

      <Spinner />

      <h3 className="mt-6 text-xl font-semibold text-[var(--secondary-dark)]">
        Loading Chat
      </h3>

      <p className="mt-2 text-sm text-[var(--slate-blue)]">
        Fetching your conversation history...
      </p>

      <div className="mt-8 flex gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-bounce"></span>
        <span
          className="w-2 h-2 rounded-full bg-[var(--light-blue)] animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full bg-[var(--teal-dark)] animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

    </div>
  );
}



 return (
  <div className="flex flex-col h-[75vh] bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50">

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-xl shadow-[var(--teal)]/20">
            <MessageSquare
              className="w-10 h-10 text-white"
              strokeWidth={2}
            />
          </div>

          <h3 className="mt-6 text-2xl font-bold text-[var(--secondary-dark)]">
            Start a Conversation
          </h3>

          <p className="mt-2 text-sm text-[var(--slate-blue)] max-w-md">
            Ask anything about this document. I can summarize,
            explain concepts, answer questions, and help you learn.
          </p>
        </div>
      ) : (
        history.map(renderMessage)
      )}

      <div ref={messagesEndRef} />

      {loading && (
        <div className="flex items-center gap-4 mt-6">

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-lg">
            <Sparkles
              className="w-5 h-5 text-white"
              strokeWidth={2}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 px-5 py-4">

            <div className="flex gap-2 mb-2">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[var(--teal)] animate-bounce"
                style={{ animationDelay: "0ms" }}
              />

              <span
                className="w-2.5 h-2.5 rounded-full bg-[var(--light-blue)] animate-bounce"
                style={{ animationDelay: "150ms" }}
              />

              <span
                className="w-2.5 h-2.5 rounded-full bg-[var(--teal-dark)] animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>

            <p className="text-sm text-slate-500">
              AI is thinking...
            </p>

          </div>

        </div>
      )}

       </div>

    {/* Chat Input */}
    <form
      onSubmit={handleSendMessage}
      className="border-t border-slate-200 bg-white p-4"
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about this document..."
          disabled={loading}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white flex items-center justify-center disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </form>

  </div>

);
};

export default ChatInterface;