import React, { FC } from "react";
import classNames from "classnames";

interface BlockProps {
  textAlign?: "left" | "center";
  backgroundImage?: string;
  backgroundColor?: string;
  theme?: "dark" | "light";
  height?: "third" | "half" | "full";
  overlayOpacity?: number;
}

const Block: FC<BlockProps> = ({
  children,
  textAlign = "left",
  theme = "light",
  height,
  backgroundImage,
  backgroundColor,
  overlayOpacity = 0.5,
}) => {
  return (
    <section
      className={classNames("proto-block", `proto-block--align-${textAlign}`, `proto-block--${theme}`, {
        [`proto-block--height-${height}`]: height,
      })}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor }}
    >
      {!!backgroundImage && <div className="proto-block__overlay" style={{ opacity: overlayOpacity }} />}
      <div className="proto-block__content">{children}</div>
    </section>
  );
};

export default Block;
