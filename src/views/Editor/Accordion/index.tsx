// import { CSSTransition, Transition } from "react-transition-group";
import { ButtonSize, IconButton, Popover, PopoverTheme, TextInput, Tooltip, TooltipElement } from "kaleidoscope/src";
import Toolbar, { ToolbarButton } from "components/Toolbar";
import { Bold, ChevronDown, ChevronRight, Delete, H1, H2, Italic, Styles } from "kaleidoscope/src/global/icons";
import { ReactComponent as NewAccordion } from "assets/new-accordion.svg";
import { ReactComponent as H3 } from "assets/h3.svg";
import React, { Component, createRef } from "react";
import classNames from "classnames";
import ContentEditable from "react-contenteditable";
import { CSSTransition } from "react-transition-group";
import { AnimationDuration } from "kaleidoscope/src/styles/Animations";
import forceReflow from "kaleidoscope/src/utils/forceReflow";

interface AccordionWidgetProps {
  id: string;
  addAccordion: () => void;
  insertAccordion: () => void;
  removeAccordion: () => void;
  className?: string;
}

class Accordion extends Component<AccordionWidgetProps> {
  state = {
    bodyOpen: false,
    widgetSelected: false,
    widgetHovering: true,
    headerFocus: false,
    headerContentSelected: false,
    bodyFocus: false,
    bodyContentSelected: false,
    userTyping: false,
    isBold: false,
    isItalic: false,
    isH1: false,
    isH2: false,
    isH3: true,
    bodyHTML: "",
    bodyHeight: 0,
    bodyEntered: false,
  };

  widgetElementRef = createRef<HTMLDivElement>();
  accordionHeaderRef = createRef<HTMLDivElement>();
  accordionBodyTextRef = createRef<HTMLDivElement>();
  accordionBodyRef = createRef<HTMLDivElement>();
  accordionBodyWrapperRef = createRef<HTMLDivElement>();

  componentDidMount() {
    document.body.addEventListener("click", this.handleOuterClick);
    document.addEventListener("selectionchange", this.handleContentSelection);
    document.addEventListener("pointermove", (event) => {
      // This would be better handled on the element itself using onPointerMove
      if (
        !this.state.widgetSelected &&
        (event.target === this.widgetElementRef.current ||
          event.target === this.accordionHeaderRef.current ||
          event.target === this.accordionBodyTextRef.current)
      ) {
        this.setState({ widgetHovering: true });
        console.log(this.state.widgetHovering);
      } else {
        this.setState({ widgetHovering: false });
      }
    });
    setTimeout(() => {
      this.accordionHeaderRef.current.focus();
    }, 300);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleOuterClick);
    document.removeEventListener("selectionchange", this.handleContentSelection);
  }

  // Open widget toolbar when selecting widget
  handleWidgetSelected = () => {
    this.setState({ widgetSelected: true, headerContentSelected: false, bodyContentSelected: false });
    console.log("Select widget");
  };

  handleWidgetFocus = (event) => {
    if (event.target === this.widgetElementRef.current) {
      this.setState({ widgetSelected: true });
    }
  };

  handleWidgetHover = (event) => {
    if (event.target === this.widgetElementRef.current) {
      this.setState({ widgetHovering: true });
    } else {
      this.setState({ widgetHovering: false });
    }
  };

  handleContentSelection = (event) => {
    if (event.target.activeElement === this.accordionHeaderRef.current) {
      const selection = window.getSelection();
      this.setState({ headerContentSelected: selection.type === "Range", bodyContentSelected: false });
    } else if (event.target.activeElement === this.accordionBodyTextRef.current) {
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

  handleHeaderKeyDown = (event) => {
    if (event.key === "Enter") {
      // Add a new accordion when `Enter` is pressed
      this.props.addAccordion();
      this.setState({ widgetHovering: false });
      this.accordionHeaderRef.current.blur();
    } else if (event.key === "Tab") {
      // Toggle open accordion & focus into content text area when `Tab` is pressed
      this.setState({ bodyOpen: true });
      this.setState({ widgetHovering: false });
    } else {
      // Hide widget selection border when user starts typing
      this.setState({ widgetHovering: false });
    }
  };

  handleWidgetTabKeyDown = (event) => {
    if ((event.key = "Tab" && this.state.widgetSelected === true)) {
      this.setState({ widgetSelected: false });
      this.widgetElementRef.current.blur();
    }
  };

  handleBodyChange = (event) => {
    this.setState({ bodyHTML: event.target.value });
  };

  // "element" here should give a reference to the CSSTransition child element
  handleBodyEnter = (element: HTMLElement) => {
    this.setState({ bodyHeight: element.offsetHeight });
  };

  handleNewAccordion = () => {
    this.props.addAccordion();
    this.setState({ widgetSelected: false });
  };

  toggleContent = () => {
    if (this.state.bodyOpen === false) {
      this.setState({ bodyOpen: true });
    } else {
      this.setState({ bodyOpen: false, bodyEntered: false, bodyHeight: this.accordionBodyRef.current.offsetHeight });
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
            onClick={this.handleNewAccordion}
          />
          <ToolbarButton icon={<Styles />} />
          <ToolbarButton icon={<Delete />} onClick={this.props.removeAccordion} />
        </Toolbar>
        <Toolbar visible={this.state.headerContentSelected} element={this.accordionHeaderRef.current}>
          <ToolbarButton
            icon={<H1 />}
            onClick={() => this.setState({ isH1: !this.state.isH1, isH2: false, isH3: false })}
            selected={this.state.isH1 ? true : false}
          />
          <ToolbarButton
            icon={<H2 />}
            onClick={() => this.setState({ isH2: !this.state.isH2, isH1: false, isH3: false })}
            selected={this.state.isH2 ? true : false}
          />
          <ToolbarButton
            icon={<H3 />}
            onClick={() => this.setState({ isH3: !this.state.isH3, isH1: false, isH2: false })}
            selected={this.state.isH3 ? true : false}
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
        <Toolbar visible={this.state.bodyContentSelected} element={this.accordionBodyTextRef.current}>
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
          tabIndex={0}
          onClick={this.handleWidgetSelected}
          // onFocus now focusses everytime I click / tab inside children elements
          // onFocus bubbles up
          onFocus={this.handleWidgetFocus}
          onKeyDown={this.handleWidgetTabKeyDown}
          onPointerMove={this.handleWidgetHover}
        >
          {/* Accordion header */}
          <div className="accordion-widget__header" onClick={this.handleContentClick}>
            {/* Accordion header button */}
            <div
              className={classNames("accordion-widget__header-button", {
                "accordion-widget__header-button--h1": this.state.isH1,
                "accordion-widget__header-button--h2": this.state.isH2,
                "accordion-widget__header-button--h3": this.state.isH3,
              })}
            >
              <IconButton
                size={ButtonSize.Small}
                icon={
                  bodyOpen ? (
                    <ChevronDown style={{ color: "inherit" }} />
                  ) : (
                    <ChevronRight style={{ color: "inherit" }} />
                  )
                }
                // tooltip={bodyOpen ? { content: "Collapse" } : { content: "Expand" }}
                aria-label={bodyOpen ? "Collapse" : "Expand"}
                onClick={this.toggleContent}
                tabIndex={-1}
              />
            </div>
            {/* Accordion header text */}
            <div
              className={classNames("accordion-widget__header-text", {
                "accordion-widget__header-text--h1": this.state.isH1,
                "accordion-widget__header-text--h2": this.state.isH2,
                "accordion-widget__header-text--h3": this.state.isH3,
                "accordion-widget__header-text--bold": this.state.isBold,
                "accordion-widget__header-text--italic": this.state.isItalic,
              })}
              contentEditable
              id="headerContent"
              ref={this.accordionHeaderRef}
              placeholder="Accordion heading"
              onKeyDown={this.handleHeaderKeyDown}
            ></div>
          </div>
          <div
            className="accordion-widget__body-transition-wrapper"
            style={{ height: this.state.bodyEntered ? "auto" : this.state.bodyHeight }}
            ref={this.accordionBodyWrapperRef}
          >
            <CSSTransition
              timeout={AnimationDuration.Long}
              classNames="accordion-widget__body-"
              in={bodyOpen}
              onEnter={this.handleBodyEnter}
              onEntered={() => this.setState({ bodyEntered: true })}
              onExit={() => {
                this.setState({ bodyHeight: 0 });
                // forceReflow is a KL thing to force the component to update it's styles
                forceReflow(this.accordionBodyWrapperRef.current);
              }}
            >
              {/* Accordion body */}
              <div className="accordion-widget__body" onClick={this.handleContentClick} ref={this.accordionBodyRef}>
                <ContentEditable
                  className="accordion-widget__body-text"
                  innerRef={this.accordionBodyTextRef}
                  placeholder="Empty accordion"
                  html={this.state.bodyHTML}
                  onChange={this.handleBodyChange}
                >
                  {/* How do you make the content sticky? */}
                </ContentEditable>
              </div>
            </CSSTransition>
          </div>
        </div>
      </>
    );
  }
}

export default Accordion;
