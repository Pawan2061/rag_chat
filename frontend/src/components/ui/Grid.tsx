const AnimatedGridBackground = () => {
  const cellSize = 40;
  const strokeColor = "#7f69ce";
  const strokeWidth = 1;
  const opacity = 0.2;
  const width = "100%";
  const height = "100%";

  return (
    <div className="fixed inset-0 -z-10">
      <svg width={width} height={height} className="w-full h-full animate-grid">
        <defs>
          <pattern
            id="grid"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
            patternTransform="rotsate(0)"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          style={{ opacity }}
        />
      </svg>
      <style>
        {`
          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(${cellSize}px, ${cellSize}px);
            }
          }
          .animate-grid {
            animation: gridMove 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedGridBackground;
