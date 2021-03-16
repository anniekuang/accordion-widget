import { ButtonSize, IconButton, Tooltip, TooltipElement } from "kaleidoscope/src";
import { ChevronRight } from "kaleidoscope/src/global/icons";
import React, { Component } from "react";

class Accordion extends Component {
  state = {
    bodyOpen: false,
    buttonLabel: "Expand",
  };

  handleButtonLabelChange = (value) => {
    this.setState({});
  };

  toggleContent = () => {
    if (this.state.bodyOpen === false) {
      this.setState({ bodyOpen: true });
    } else {
      this.setState({ bodyOpen: false });
    }
  };

  render() {
    // Attempt to calculate the Header content height, but is unnecessary without a way to change the text styling
    // function calcHeaderHeight() {
    //   const headerHeight = this.state.lineHeight * this.state.fontSize;

    //   return headerHeight;
    // }
    const { bodyOpen } = this.state;

    return (
      <div className="accordion-widget">
        {/* Accordion header */}
        <div className="accordion-widget__header">
          <div className="accordion-widget__header-button">
            <IconButton
              size={ButtonSize.Small}
              icon={<ChevronRight style={{ color: "white" }} />}
              // tooltip={{ content: "Expand" }}
              aria-label="Expand"
              onClick={this.toggleContent}
            />
          </div>
          <div className="accordion-widget__header-text" contentEditable placeholder="Accordion heading"></div>
        </div>
        {bodyOpen === true && (
          <>
            {/* Accordion body */}
            <div className="accordion-widget__body">
              <div className="accordion-widget__body-text" contentEditable placeholder="Empty accordion">
                {/* How do you make the content sticky? */}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Accordion;
