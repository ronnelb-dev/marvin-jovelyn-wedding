// components/Divider.tsx
import { FC } from "react";
import Image from "next/image";

interface DividerProps {
  position?: "top" | "bottom";
  width?: number;
  height?: number;
}

const Divider2: FC<DividerProps> = ({
  position = "top",
  width = 320,
  height = 200,
}) => {
  const isTop = position === "top";

  return (
    <div className={`overflow-hidden ${isTop ? "rotate-0" : "rotate-180"}`}>
      <Image
        src="/images/divider-2.svg"
        alt="Section Divider"
        width={width}
        height={height}
        priority
      />
    </div>
  );
};

export default Divider2;
