import React, { FC, ReactNode } from "react";
import Checkbox from "kaleidoscope/src/global/pieces/Checkbox/Checkbox";
import { Folder, IconSize } from "kaleidoscope/src/global/icons";

interface ActionBarProps {
  title: string;
  primaryActions: ReactNode;
  secondaryActions: ReactNode;
}

const ActionBar: FC<ActionBarProps> = ({ title, primaryActions, secondaryActions }) => {
  return (
    <div className="proto-action-bar">
      <div className="proto-action-bar__row">
        <div className="proto-action-bar__row-start">
          <Folder size={IconSize.Large} className="proto-action-bar__folder-icon" />
          <h1 className="proto-action-bar__title">{title}</h1>
        </div>
        <div className="proto-action-bar__row-end">{primaryActions}</div>
      </div>
      <div className="proto-action-bar__row">
        <div className="proto-action-bar__row-start">
          <Checkbox isLarge item={{ id: "id", value: "name", label: "Select all" }} handleOnClick={() => null} />
        </div>
        <div className="proto-action-bar__row-end">{secondaryActions}</div>
      </div>
    </div>
  );
};

export default ActionBar;
