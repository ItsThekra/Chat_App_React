export default function ChatWindow({ currentUser, messages }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded max-w-[70%] ${
            msg.sender === currentUser ? "bg-green-500 self-end" : "bg-gray-700 self-start"
          }`}
        >
          <span className="font-bold">{msg.sender}: </span>
          {msg.text}
        </div>
      ))}
    </div>
  );
}