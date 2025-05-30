import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

const API_URL = "https://683a1f0b43bb370a8671e6c9.mockapi.io/messages";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (text) => {
    const newMsg = {
      sender: user,
      text: text,
    };
    await axios.post(API_URL, newMsg);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/bg.jpg')] bg-cover">
      <div className="w-[90%] h-[80vh] rounded-xl bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] p-6 text-white overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Welcome {user}</h2>
          <button onClick={handleLogout} className="text-sm bg-red-500 px-3 py-1 rounded">Logout</button>
        </div>
        <ChatWindow currentUser={user} messages={messages} />
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}