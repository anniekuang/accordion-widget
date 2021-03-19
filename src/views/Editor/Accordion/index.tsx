import { ButtonSize, IconButton, Popover, PopoverTheme, TextInput, Tooltip, TooltipElement } from "kaleidoscope/src";
import Toolbar, { ToolbarButton } from "components/Toolbar";
import { Bold, ChevronRight, Delete, H1, H2, Italic, Styles } from "kaleidoscope/src/global/icons";
import { ReactComponent as NewAccordion } from "assets/new-accordion.svg";
import React, { Component, createRef } from "react";
import classNames from "classnames";
import { isValidHex } from "kaleidoscope/src/utils/color/colorUtil";

interface AccordionWidgetProps {
  id: string;
  removeAccordion: () => void;
}

class Accordion extends Component<AccordionWidgetProps> {
  state = {
    bodyOpen: false,
    widgetSelected: false,
    headerContentSelected: false,
    bodyContentSelected: false,
  };

  widgetElementRef = createRef<HTMLDivElement>();
  accordionHeaderRef = createRef<HTMLDivElement>();
  accordionBodyRef = createRef<HTMLDivElement>();

  componentDidMount() {
    document.body.addEventListener("click", this.handleOuterClick);
    document.addEventListener("selectionchange", this.handleContentSelection);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleOuterClick);
    document.removeEventListener("selectionchange", this.handleContentSelection);
  }

  // Open widget toolbar when selecting widget
  handleWidgetSelected = () => {
    this.setState({ widgetSelected: true, headerContentSelected: false, bodyContentSelected: false });
  };

  handleContentSelection = (event) => {
    if (event.target.activeElement === this.accordionHeaderRef.current) {
      const selection = window.getSelection();
      this.setState({ headerContentSelected: selection.type === "Range", bodyContentSelected: false });
    } else if (event.target.activeElement === this.accordionBodyRef.current) {
      const selection = window.getSelection();
      this.setState({ bodyContentSelected: selection.type === "Range", headerContentSelected: false });
    } else {
      this.setState({ headerContentSelected: false, bodyContentSelected: false });
    }
  };

  // Close widget toolbar when clicking into the widget content
  handleContentClick = (event) => {
    event.stopPropagation();
    this.setState({ widgetSelected: false });
  };

  // Close all toolbars when clicking outside of the widget
  handleOuterClick = (event) => {
    if (!this.widgetElementRef.current.contains(event.target)) {
      this.setState({ widgetSelected: false, headerContentSelected: false, bodyContentSelected: false });
    }
  };

  toggleContent = () => {
    if (this.state.bodyOpen === false) {
      this.setState({ bodyOpen: true });
    } else {
      this.setState({ bodyOpen: false });
    }
  };

  detectContent = () => {};

  render() {
    // Attempt to calculate the Header content height, but is unnecessary without a way to change the text styling
    // function calcHeaderHeight() {
    //   const headerHeight = this.state.lineHeight * this.state.fontSize;

    //   return headerHeight;
    // }
    const { bodyOpen } = this.state;

    return (
      <>
        <Toolbar visible={this.state.widgetSelected} element={this.widgetElementRef.current}>
          {/* <Popover
            offset={8}
            theme={PopoverTheme.Dark}
            button={(buttonProps) => <ToolbarButton icon={<Styles />} {...buttonProps} />}
          ></Popover> */}
          <ToolbarButton icon={<NewAccordion />} tooltip={{ content: "Add new Accordion" }} />
          <ToolbarButton icon={<Styles />} />
          <ToolbarButton icon={<Delete />} />
        </Toolbar>
        <Toolbar visible={this.state.headerContentSelected} element={this.accordionHeaderRef.current}>
          <ToolbarButton icon={<H1 />} />
          <ToolbarButton icon={<H2 />} />
          <ToolbarButton icon={<Bold />} />
          <ToolbarButton icon={<Italic />} />
        </Toolbar>
        <Toolbar visible={this.state.bodyContentSelected} element={this.accordionBodyRef.current}>
          <ToolbarButton icon={<H1 />} />
          <ToolbarButton icon={<H2 />} />
          <ToolbarButton icon={<Bold />} />
          <ToolbarButton icon={<Italic />} />
        </Toolbar>
        <div
          className={classNames("accordion-widget", { "accordion-widget--selected": this.state.widgetSelected })}
          ref={this.widgetElementRef}
          onClick={this.handleWidgetSelected}
        >
          {/* Accordion header */}
          <div className="accordion-widget__header" onClick={this.handleContentClick}>
            <div className="accordion-widget__header-button">
              <IconButton
                size={ButtonSize.Small}
                icon={<ChevronRight style={{ color: "white" }} />}
                // tooltip={bodyOpen ? { content: "Collapse" } : { content: "Expand" }}
                aria-label="Expand"
                onClick={this.toggleContent}
              />
            </div>
            <div
              className={classNames("accordion-widget__header-text", {
                "accordion-widget__header-text--h1": false,
                "accordion-widget__header-text--bold": false,
                // How do you set up booleans to trigger these styling options?
              })}
              contentEditable
              ref={this.accordionHeaderRef}
              placeholder="Accordion heading"
            ></div>
          </div>
          {bodyOpen === true && (
            <>
              {/* Accordion body */}
              <div className="accordion-widget__body" onClick={this.handleContentClick}>
                <div
                  className="accordion-widget__body-text"
                  ref={this.accordionBodyRef}
                  contentEditable
                  placeholder="Empty accordion"
                >
                  {/* How do you make the content sticky? */}
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Accordion;
