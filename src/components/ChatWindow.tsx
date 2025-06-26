import { useEffect, useLayoutEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import Input from "./Input";
import WelcomeScreen from "./ui/Welcome";
import Loader from "./ui/Loader";
import PostVsCode from "../utility/vscode/PostVsCode";

interface Message {
  text: string;
  isUser: boolean;
}

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { isUser: true, text: msg }]);
    setIsLoading(true);

    const fileMentions = Array.from(msg.matchAll(/@([\w.-]+)/g)).map(
      (match) => match[1],
    );
    console.log(fileMentions);

    // If @file is mentioned, request it from the extension
    if (fileMentions.length > 0) {
      PostVsCode({
        type: "files-prompt",
        data: { prompt: msg, files: fileMentions },
      });
    } else {
      // If no file, optionally send to OpenAI or just log
      PostVsCode({
        type: "send-request",
        data: { prompt: msg },
      });
    }
  };
  useLayoutEffect(()=>{
    PostVsCode({type:'get-chats',data:{}})
  },[])

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const msg = event.data;
      const { response, type } = msg;
      if (type === "files-prompt") {
        setMessages((prev) => [...prev, { text: response, isUser: false }]);
        setIsLoading(false);
      } else if (type === "send-request") {
        setMessages((prev) => [...prev, { text: response, isUser: false }]);
      }else if(type==="chat-history"){
        console.log('res frontend');
        console.log(response)
        setMessages(response)
      }else if(type==="clear-chats"){
        setMessages([])
      }
      setIsLoading(false);
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <div className="flex h-dvh max-w-[calc(100dvw-1rem)] flex-1 flex-col bg-transparent pb-2">
      {messages.length ? (
        <div className="no-scrollbar mb-2 flex flex-1 flex-col gap-2 overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg.text} isUser={msg.isUser} />
          ))}
          {isLoading && <Loader />}
        </div>
      ) : (
        <WelcomeScreen />
      )}
      <div className="flex flex-col gap-2">
        <Input onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatWindow;
