interface IChat {
  content: string;
  author: "bot" | "human";
  image: string;
  firstName: string;
}

const BOT_IMAGE = "https://avatars.githubusercontent.com/ml/14048?s=82&v=4";

export const SingleChat = ({ author, content, image, firstName }: IChat) => {
  return (
    <div
      className="flex items-center gap-2 justify-end"
      style={{
        justifyContent: author === "bot" ? "start" : "end",
        flexDirection: author === "human" ? "row" : "row-reverse",
      }}
    >
      <div className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-gray-800">
        <span className="font-bold underline">
          {author === "bot" ? "AI" : firstName}
        </span>
        <p className="text-sm leading-snug">{content}</p>
      </div>
      <img
        alt="Avatar"
        className="rounded-full h-10 w-10 bg-white"
        height="40"
        src={author === "bot" ? BOT_IMAGE : image}
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
    </div>
  );
};
