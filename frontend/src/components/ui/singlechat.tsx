import React from "react";

interface IChat {
  content: any;
  author: "bot" | "human";
  image: string;
  firstName: string;
}

const BOT_IMAGE = "https://avatars.githubusercontent.com/ml/14048?s=82&v=4";

export const SingleChat = ({ author, content, image, firstName }: IChat) => {
  const messageContent =
    typeof content === "object" && content.data ? content.data : content;

  return (
    <div
      className="flex items-start gap-3 mb-4"
      style={{
        justifyContent: author === "bot" ? "start" : "end",
        flexDirection: author === "human" ? "row-reverse" : "row",
      }}
    >
      <img
        alt={`${author === "bot" ? "AI" : firstName} Avatar`}
        className="rounded-full h-8 w-8 bg-white flex-shrink-0"
        src={author === "bot" ? BOT_IMAGE : image}
        style={{
          aspectRatio: "1",
          objectFit: "cover",
        }}
      />

      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          author === "bot"
            ? "bg-gray-100 dark:bg-gray-800"
            : "bg-blue-500 dark:bg-blue-600 text-white"
        }`}
      >
        <span className="text-xs font-semibold block mb-1">
          {author === "bot" ? "AI" : firstName}
        </span>
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {messageContent}
        </p>
      </div>
    </div>
  );
};

export default SingleChat;
