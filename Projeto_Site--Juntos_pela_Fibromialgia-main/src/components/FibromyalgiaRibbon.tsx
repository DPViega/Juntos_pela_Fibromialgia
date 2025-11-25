const FibromyalgiaRibbon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Purple ribbon */}
      <path
        d="M50 10 C30 20, 20 40, 25 60 L25 100 L35 110 L35 70 C35 50, 45 40, 50 30 C55 40, 65 50, 65 70 L65 110 L75 100 L75 60 C80 40, 70 20, 50 10"
        fill="hsl(270, 60%, 70%)"
        stroke="hsl(270, 50%, 60%)"
        strokeWidth="1"
      />
      {/* Ribbon shine effect */}
      <path
        d="M45 20 C40 25, 35 35, 35 45 L35 70 L40 70 L40 45 C40 35, 45 25, 50 20"
        fill="hsl(270, 60%, 80%)"
        opacity="0.5"
      />
    </svg>
  );
};

export default FibromyalgiaRibbon;