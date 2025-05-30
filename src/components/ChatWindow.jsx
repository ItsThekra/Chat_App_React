
export default function ChatWindow({ currentUser, messages }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-lg text-sm max-w-[70%] shadow-md break-words whitespace-pre-wrap ${
            msg.sender === currentUser
              ? "bg-green-500 self-end text-white"
              : "bg-gray-700 self-start text-white"
          }`}
        >
          <span className="font-bold lowercase">{msg.sender}:</span> {msg.text}
        </div>
      ))}
    </div>
  );
}