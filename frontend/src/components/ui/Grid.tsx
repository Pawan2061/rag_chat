const GridBackground = () => {
  const cellSize = 40;
  const strokeColor = "#7f69ce";
  const strokeWidth = 1;
  const opacity = 0.2;

  const width = "100%";
  const height = "100%";

  return (
    <div className="fixed inset-0 -z-10">
      <svg
        width={width}
        height={height}
        className="w-full h-full"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id="grid"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default GridBackground;
