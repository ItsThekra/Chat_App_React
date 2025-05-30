import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

const API_URL = "https://683a1f0b43bb370a8671e6c9.mockapi.io/messages";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const newMsg = {
      sender: user,
      text: text,
    };
    await axios.post(API_URL, newMsg);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/bg.jpg')] bg-cover px-2">
      <div className="w-full max-w-4xl h-[80vh] rounded-xl bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] p-6 text-white flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Welcome {user}</h2>
          <button onClick={handleLogout} className="text-sm bg-red-500 px-3 py-1 rounded">Logout</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatWindow currentUser={user} messages={messages} />
          <div ref={scrollRef} />
        </div>
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
