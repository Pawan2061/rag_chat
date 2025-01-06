"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { SingleChat } from "./ui/singlechat";
import { Filter } from "bad-words";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { BotThinking } from "./ui/bot";

const filter = new Filter();

interface IMessage {
  content: string;
  author: "bot" | "human";
}

export function Chat() {
  const [query, setQuery] = useState("");
  const [generating, setGenerating] = useState(false);
  const [dialogueClosed, setDialogueClosed] = useState(false);

  const [messages, setMessages] = useState<IMessage[]>([
    {
      author: "bot",
      content: "Hello! How can I assist you today? 👋",
    },
  ]);

  const handleClick = async () => {
    if (!query) return;
    setGenerating(true);
    setMessages((prev) => [
      ...prev,
      {
        author: "human",
        content: filter.clean(query),
      },
    ]);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: query }),
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL!, options);
      const { data } = await res.json();
      setMessages((prev) => [...prev, { author: "bot", content: data }]);
      setGenerating(false);
      setQuery("");
    } catch (e) {
      console.log(e);
    }
  };

  if (!dialogueClosed)
    return (
      <AlertDialog open={!dialogueClosed}>
        <AlertDialogContent className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              Welcome to Chat
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Before we begin, please review and accept our Terms of Service to
              continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              onClick={() => setDialogueClosed(true)}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setDialogueClosed(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Accept & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

  return (
    <section className="h-[85vh] flex flex-col justify-between max-w-3xl mx-auto border-x border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl rounded-t-xl">
      <div className="flex flex-col w-full">
        <header className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Chat Assistant</h1>
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto"
          style={{
            maxHeight: "calc(85vh - 8rem)",
          }}
        >
          <div className="container px-4 py-6 mx-auto flex flex-col gap-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <SingleChat
                  {...msg}
                  image="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                  firstName="pawan"
                  key={i}
                />
              ))}
              {generating && <BotThinking />}
            </div>
          </div>
        </main>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
        <div className="container mx-auto">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <Input
              disabled={generating}
              onChange={(e) => setQuery(e.currentTarget.value)}
              value={query}
              className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
            <Button
              type="submit"
              disabled={generating}
              className="h-10 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {generating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
