import { ButtonSize, ButtonType, IconButton, OptionMenu, OptionMenuItem } from "kaleidoscope/src";
import { Add, Image, Table, TwoColumns, Video } from "kaleidoscope/src/global/icons";
import React, { Component } from "react";
import { ReactComponent as Accordion } from "../../../assets/accordion.svg";
import { ReactComponent as Maps } from "../../../assets/maps.svg";

class QuickAddMenu extends Component {
  render() {
    return (
      <div className="quick-add-menu">
        <OptionMenu
          className="quick-add-menu__menu"
          size="small"
          button={
            <IconButton
              className="quick-add-menu__button"
              icon={<Add />}
              // tooltip={{ content: "Add content" }}
              aria-label="Add content"
              isRound
              type={ButtonType.Secondary}
            />
          }
        >
          <OptionMenuItem className="quick-add-menu__menu-item" icon={<Image style={{ color: "white" }} />}>
            Image
          </OptionMenuItem>
          <OptionMenuItem className="quick-add-menu__menu-item" icon={<Video style={{ color: "white" }} />}>
            Video
          </OptionMenuItem>
          <OptionMenuItem className="quick-add-menu__menu-item" icon={<Table style={{ color: "white" }} />}>
            Table
          </OptionMenuItem>
          {/* <OptionMenuItem className="quick-add-menu__menu-item" icon={<Maps />}>
            Google Map
          </OptionMenuItem> */}
          <OptionMenuItem className="quick-add-menu__menu-item" icon={<TwoColumns style={{ color: "white" }} />}>
            2 Columns
          </OptionMenuItem>
          <OptionMenuItem
            // onClick={this.handleClick}
            className="quick-add-menu__menu-item"
            icon={<Accordion style={{ color: "white" }} />}
          >
            Accordion
          </OptionMenuItem>
        </OptionMenu>
      </div>
    );
  }
}

export default QuickAddMenu;
