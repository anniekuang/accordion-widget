import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonSize, ButtonType, Card, IconButton } from "kaleidoscope";
import Checkbox from "kaleidoscope/src/global/pieces/Checkbox/Checkbox";
import { Analytics, ListMarkerCircle, OptionsVertical, Tag } from "kaleidoscope/src/global/icons";
import classNames from "classnames";

interface PageCardProps {
  title: string;
  views: number;
  url?: string;
}

const PageCard: FC<PageCardProps> = ({ title, views, url }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Card
      className={classNames("proto-page-card", {
        "proto-page-card--hovered": hovered,
        "proto-page-card--focused": focused,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={(location) => ({ ...location, pathname: url || "/editor" })}
        className="proto-page-card__link"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div className="proto-page-card__content">
        <Checkbox
          isLarge
          item={{
            id: "id",
            value: "checkbox",
          }}
          handleOnClick={() => null}
        />
        <div className="proto-page-card__details">
          <h2 className="proto-page-card__title">{title}</h2>
          <Button className="proto-page-card__tags" size={ButtonSize.XSmall} type={ButtonType.Tertiary}>
            <Tag />0 tags
          </Button>
        </div>
        <div className="proto-page-card__actions">
          <div className="proto-page-card__status">
            <ListMarkerCircle /> Live
          </div>
          {views !== undefined && <div className="proto-page-card__views">{views} views</div>}
          <IconButton icon={<Analytics />} />
          <IconButton icon={<OptionsVertical />} />
        </div>
      </div>
    </Card>
  );
};

export default PageCard;
