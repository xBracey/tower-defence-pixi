import React from "react";
import { getBackgroundPosition } from "../../shared/getBackgroundPosition";
import { TANKS, Tanks } from "../../shared/constants";

interface TankImageProps {
  tank: Tanks;
  className?: string;
  outerClassName?: string;
}

export const TankImage = ({
  tank,
  className,
  outerClassName,
}: TankImageProps) => {
  const sharedClass = "absolute top-0 left-0 right-0 bottom-0";

  return (
    <div className={`relative overflow-hidden ${outerClassName}`}>
      <div
        className={`${sharedClass} ${className}`}
        style={{
          background: "url(/tilesheet.png)",
          backgroundPosition: getBackgroundPosition(TANKS[tank][0]),
        }}
      />
      <div
        className={`${sharedClass} ${className}`}
        style={{
          background: "url(/tilesheet.png)",
          backgroundPosition: getBackgroundPosition(TANKS[tank][1]),
        }}
      />
    </div>
  );
};
