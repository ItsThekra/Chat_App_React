// components/MessageInput.jsx
import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 p-2 rounded text-black border"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="bg-blue-500 px-4 py-2 rounded text-white" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}