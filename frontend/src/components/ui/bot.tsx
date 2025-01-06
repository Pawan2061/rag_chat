const BOT_IMAGE = "https://avatars.githubusercontent.com/ml/14048?s=82&v=4";

export const BotThinking = () => {
  return (
    <div
      className="flex items-center gap-2 justify-end"
      style={{
        justifyContent: "start",
        flexDirection: "row-reverse",
      }}
    >
      <div className="bg-gray-100 rounded-xl px-4 py-2 dark:bg-gray-800">
        <span className="font-bold underline">AI</span>
        <p className="text-sm leading-snug animate-bounce">Thinking...</p>
      </div>
      <img
        alt="Avatar"
        className="rounded-full h-10 w-10 bg-white animate-spin"
        height="40"
        src={BOT_IMAGE}
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
    </div>
  );
};
