// components/Divider.tsx
import { FC } from "react";
import Image from "next/image";

interface DividerProps {
  position?: "top" | "bottom";
  className?: string; // optional Tailwind utility for width control
}

const Divider: FC<DividerProps> = ({
  position = "top",
  className = "w-full max-w-5xl mx-auto", // default to full width and centered
}) => {
  const isTop = position === "top";

  return (
    <div className={`overflow-hidden ${isTop ? "rotate-0" : "rotate-180"}`}>
      <div className={className}>
        <Image
          src="/images/divider.svg"
          alt="Section Divider"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default Divider;
