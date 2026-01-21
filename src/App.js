import { useState } from "react";

function ChatUI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim()==='') return;

    setChat((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);

    const res = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat((prev) => [...prev, { sender: "bot", text: data.reply }]);

    setMessage("");
    setLoading(false);
  };

  return (
    <div
      style={{
        width: 380,
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        🤖 AI Chatbot
      </h2>

      <div
        style={{
          height: 400,
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 10,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#fafafa",
        }}
      >
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              maxWidth: "75%",
              padding: "8px 12px",
              borderRadius: 10,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: "#000000",
              color: "#fff" 
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <p style={{ opacity: 0.6, fontStyle: "italic" }}>Thinking...</p>
        )}
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          gap: 10,
        }}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 15px",
            background: "#007AFF",
            border: "none",
            borderRadius: 8,
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatUI;