// import { CSSTransition, Transition } from "react-transition-group";
import { ButtonSize, IconButton, Popover, PopoverTheme, TextInput, Tooltip, TooltipElement } from "kaleidoscope/src";
import Toolbar, { ToolbarButton } from "components/Toolbar";
import { Bold, ChevronDown, ChevronRight, Delete, H1, H2, Italic, Styles } from "kaleidoscope/src/global/icons";
import { ReactComponent as NewAccordion } from "assets/new-accordion.svg";
import React, { Component, createRef } from "react";
import classNames from "classnames";

interface AccordionWidgetProps {
  id: string;
  addAccordion: () => void;
  removeAccordion: () => void;
}

class Accordion extends Component<AccordionWidgetProps> {
  state = {
    bodyOpen: false,
    widgetSelected: false,
    widgetHovering: false,
    headerFocus: false,
    headerContentSelected: false,
    bodyFocus: false,
    bodyContentSelected: false,
    userTyping: false,
    isBold: false,
    isItalic: false,
    isH1: false,
    isH2: false,
  };

  widgetElementRef = createRef<HTMLDivElement>();
  accordionHeaderRef = createRef<HTMLDivElement>();
  accordionBodyRef = createRef<HTMLDivElement>();

  componentDidMount() {
    document.body.addEventListener("click", this.handleOuterClick);
    document.addEventListener("selectionchange", this.handleContentSelection);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target === this.accordionHeaderRef.current) {
        console.log("Enter!");
        document.getElementById("headerContent").blur();
        this.props.addAccordion;
      }
    });
    document.addEventListener("keydown", (event) => {
      this.setState({ widgetHovering: false });
      console.log("Typing");
    });
    document.addEventListener("pointermove", (event) => {
      if (
        !this.state.widgetSelected &&
        (event.target === this.widgetElementRef.current ||
          event.target === this.accordionHeaderRef.current ||
          event.target === this.accordionBodyRef.current)
      ) {
        this.setState({ widgetHovering: true });
        console.log(this.state.widgetHovering);
      } else {
        this.setState({ widgetHovering: false });
      }
    });
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

  handleKeyboardFocus = (event) => {
    // Can I use this.toggleContent instead?
    this.setState({ bodyOpen: true });
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
          <ToolbarButton
            icon={<NewAccordion />}
            tooltip={{ content: "Add new Accordion" }}
            onClick={this.props.addAccordion}
          />
          <ToolbarButton icon={<Styles />} />
          <ToolbarButton icon={<Delete />} onClick={this.props.removeAccordion} />
        </Toolbar>
        <Toolbar visible={this.state.headerContentSelected} element={this.accordionHeaderRef.current}>
          <ToolbarButton
            icon={<H1 />}
            onClick={() => this.setState({ isH1: !this.state.isH1, isH2: false })}
            selected={this.state.isH1 ? true : false}
          />
          <ToolbarButton
            icon={<H2 />}
            onClick={() => this.setState({ isH2: !this.state.isH2, isH1: false })}
            selected={this.state.isH2 ? true : false}
          />
          <ToolbarButton
            icon={<Bold />}
            onClick={() => this.setState({ isBold: !this.state.isBold })}
            selected={this.state.isBold ? true : false}
          />
          <ToolbarButton
            icon={<Italic />}
            onClick={() => this.setState({ isItalic: !this.state.isItalic })}
            selected={this.state.isItalic ? true : false}
          />
        </Toolbar>
        <Toolbar visible={this.state.bodyContentSelected} element={this.accordionBodyRef.current}>
          <ToolbarButton icon={<H1 />} />
          <ToolbarButton icon={<H2 />} />
          <ToolbarButton icon={<Bold />} />
          <ToolbarButton icon={<Italic />} />
        </Toolbar>
        <div
          className={classNames("accordion-widget", {
            "accordion-widget--selected": this.state.widgetSelected,
            "accordion-widget--hover": this.state.widgetHovering,
          })}
          ref={this.widgetElementRef}
          onClick={this.handleWidgetSelected}
        >
          {/* Accordion header */}
          <div className="accordion-widget__header" onClick={this.handleContentClick}>
            <div className="accordion-widget__header-button">
              <IconButton
                size={ButtonSize.Small}
                icon={
                  bodyOpen ? <ChevronDown style={{ color: "white" }} /> : <ChevronRight style={{ color: "white" }} />
                }
                // tooltip={bodyOpen ? { content: "Collapse" } : { content: "Expand" }}
                aria-label="Expand"
                onClick={this.toggleContent}
              />
            </div>
            <div
              className={classNames("accordion-widget__header-text", {
                "accordion-widget__header-text--h1": this.state.isH1,
                "accordion-widget__header-text--h2": this.state.isH2,
                "accordion-widget__header-text--bold": this.state.isBold,
                "accordion-widget__header-text--italic": this.state.isItalic,
              })}
              contentEditable
              id="headerContent"
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
          {/* <CSSTransition appear timeout={400} classNames="accordion-widget__body-"></CSSTransition> */}
        </div>
      </>
    );
  }
}

export default Accordion;
