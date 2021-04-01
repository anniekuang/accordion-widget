import {
  Button,
  ButtonSize,
  ButtonType,
  IconButton,
  Popover,
  PopoverTheme,
  SegmentedControl,
  SegmentedControlTheme,
  TextInput,
  TextInputTheme,
  Toggle,
  Tooltip,
} from "kaleidoscope/src";
import Toolbar, { ToolbarButton } from "components/Toolbar";
import { Bold, ChevronDown, ChevronRight, Delete, H1, H2, Images, Italic, Styles } from "kaleidoscope/src/global/icons";
import { ReactComponent as NewAccordion } from "assets/new-accordion.svg";
import { ReactComponent as H3 } from "assets/h3.svg";
import { ReactComponent as MarkerArrowRight } from "assets/marker-arrow-right.svg";
import { ReactComponent as MarkerArrowDown } from "assets/marker-arrow-down.svg";
import React, { Component, createRef } from "react";
import classNames from "classnames";
import ContentEditable from "react-contenteditable";
import { CSSTransition } from "react-transition-group";
import { AnimationDuration } from "kaleidoscope/src/styles/Animations";
import forceReflow from "kaleidoscope/src/utils/forceReflow";
import { ConfigContext } from "views/App/AppConfig";
import { ToggleTheme } from "kaleidoscope/src/global/pieces/Toggle/Toggle";

interface AccordionWidgetProps {
  id: string;
  addAccordion: () => void;
  removeAccordion: () => void;
}

class Accordion extends Component<AccordionWidgetProps> {
  static contextType = ConfigContext;

  state = {
    // STATES
    widgetHovering: true,
    widgetSelected: false,
    headerImageSelected: false,
    headerFocus: false,
    headerContentSelected: false,
    bodyFocus: false,
    bodyContentSelected: false,
    userTyping: false,

    // STYLING
    cardStyle: "simple",
    isBold: false,
    isItalic: false,
    isH1: false,
    isH2: false,
    isH3: true,

    // CAPTURE TEXT
    headerHTML: "",
    bodyHTML: "",

    // HEADER CSS TRANSITION
    headerImageHeight: 0,
    headerImageEntered: false,

    // BODY CSS TRANSITION
    bodyOpen: false,
    bodyHeight: 0,
    bodyEntered: false,
    bodyBackground: true,
  };

  widgetElementRef = createRef<HTMLDivElement>();
  accordionHeaderRef = createRef<HTMLDivElement>();
  accordionHeaderImageWrapperRef = createRef<HTMLDivElement>();
  accordionHeaderTextRef = createRef<HTMLDivElement>();
  accordionBodyTextRef = createRef<HTMLDivElement>();
  accordionBodyRef = createRef<HTMLDivElement>();
  accordionBodyWrapperRef = createRef<HTMLDivElement>();
  accordionButtonRef = createRef<HTMLDivElement>();

  componentDidMount() {
    document.body.addEventListener("click", this.handleOuterClick);
    document.addEventListener("selectionchange", this.handleContentSelection);
    document.addEventListener("pointermove", (event) => {
      // This would be better handled on the element itself using onPointerMove
      if (
        event.target === this.widgetElementRef.current ||
        event.target === this.accordionHeaderRef.current ||
        event.target === this.accordionHeaderTextRef.current ||
        event.target === this.accordionBodyRef.current ||
        event.target === this.accordionBodyWrapperRef.current ||
        event.target === this.accordionBodyTextRef.current ||
        event.target === this.accordionButtonRef.current
      ) {
        this.setState({ widgetHovering: true });
        console.log(this.state.widgetHovering);
      } else {
        this.setState({ widgetHovering: false });
      }
    });

    setTimeout(() => {
      this.accordionHeaderTextRef.current.focus();
    }, 300);

    // this.setState({ bodyOpen: true });
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
    if (
      event.target === this.widgetElementRef.current ||
      event.target === this.accordionHeaderRef.current ||
      event.target === this.accordionHeaderTextRef.current ||
      event.target === this.accordionBodyRef.current ||
      event.target === this.accordionBodyWrapperRef.current ||
      event.target === this.accordionBodyTextRef.current ||
      event.target === this.accordionButtonRef.current
    ) {
      this.setState({ widgetHovering: true });
      console.log("Hover");
    } else {
      this.setState({ widgetHovering: false });
    }
  };

  handleImageSelected = (event) => {
    this.setState({
      headerImageSelected: true,
      widgetSelected: false,
      headerContentSelected: false,
      bodyContentSelected: false,
    });
  };

  handleContentSelection = (event) => {
    if (event.target.activeElement === this.accordionHeaderTextRef.current) {
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
      this.setState({
        widgetSelected: false,
        headerContentSelected: false,
        bodyContentSelected: false,
        headerImageSelected: false,
      });
    }
  };

  handleKeyboardFocus = (event) => {
    // Can I use this.toggleContent instead?
    this.setState({ bodyOpen: true });
  };

  handleKeyDown = (event) => {
    var map = {};

    map[event.key] = event.type == "keydown";

    if ((event.metaKey || event.ctrlKey) && map["Enter"]) {
      this.props.addAccordion();
      this.setState({ widgetHovering: false });
      this.accordionHeaderTextRef.current.blur();
    } else if (map["Enter"]) {
      this.setState({ widgetHovering: false });
      this.accordionHeaderTextRef.current.blur();
      this.setState({ bodyOpen: true });
      // this.accordionBodyTextRef.current.focus();
      setTimeout(() => {
        this.accordionBodyTextRef.current.focus();
      }, 300);
    } else if (map["Backspace"] && this.state.headerHTML === "") {
      this.props.removeAccordion();
    } else {
      // Hide widget selection border when user starts typing
      this.setState({ widgetHovering: false });
    }
  };

  handleWidgetTabKeyDown = (event) => {
    if (event.key === "Tab" && this.state.widgetSelected === true) {
      this.setState({ widgetSelected: false });
      this.widgetElementRef.current.blur();
    }
  };

  handleHeaderChange = (event) => {
    this.setState({ headerHTML: event.target.value, widgetHovering: false });
  };

  handleBodyChange = (event) => {
    this.setState({ bodyHTML: event.target.value, widgetHovering: false });
  };

  handleHeaderImageEnter = (element: HTMLElement) => {
    this.setState({ headerImageHeight: element.offsetHeight });
  };

  // "element" here should give a reference to the CSSTransition child element
  handleBodyEnter = (element: HTMLElement) => {
    this.setState({ bodyHeight: element.offsetHeight });
  };

  handleNewAccordion = () => {
    this.props.addAccordion();
    this.setState({ widgetSelected: false });
  };

  handleDeleteAccordion = (event) => {
    if (this.state.headerHTML === "" && event.key === "Backspace") {
      this.props.removeAccordion();
    }
  };

  toggleContent = () => {
    if (this.state.bodyOpen === false) {
      this.setState({ bodyOpen: true });
    } else {
      this.setState({ bodyOpen: false, bodyEntered: false, bodyHeight: this.accordionBodyRef.current.offsetHeight });
    }
  };

  pasteAsPlainText = (event) => {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  setCardStyle = (optionValue) => {
    if (optionValue === "simple") {
      this.setState({ cardStyle: "simple", headerImageEntered: false });
    } else if (optionValue === "visual") {
      this.setState({ cardStyle: "visual" });
    }
  };

  render() {
    // Attempt to calculate the Header content height, but is unnecessary without a way to change the text styling
    // function calcHeaderHeight() {
    //   const headerHeight = this.state.lineHeight * this.state.fontSize;

    //   return headerHeight;
    // }
    const { bodyOpen, cardStyle } = this.state;

    return (
      <>
        {/* Widget toolbar - START */}
        <Toolbar visible={this.state.widgetSelected} element={this.widgetElementRef.current}>
          <Popover
            offset={8}
            theme={PopoverTheme.Dark}
            button={(buttonProps) => <ToolbarButton icon={<Styles />} {...buttonProps} />}
          >
            <SegmentedControl
              label="Style"
              options={[
                { label: "Simple", value: "simple" },
                { label: "Visual", value: "visual" },
              ]}
              selectedValue={cardStyle}
              onClickHandler={this.setCardStyle}
              theme={SegmentedControlTheme.Dark}
            ></SegmentedControl>
          </Popover>
          {/* <ToolbarButton
            icon={<NewAccordion />}
            tooltip={{ content: "Add new Accordion" }}
            onClick={this.handleNewAccordion}
          /> */}
          {/* <ToolbarButton icon={<Styles />} /> */}
          <ToolbarButton icon={<Delete />} onClick={this.props.removeAccordion} />
        </Toolbar>
        {/* Widget Toolbar - END */}

        {/* Image Toolbar - START */}
        {this.context.imageButtonType === "Toolbar" && (
          <Toolbar visible={this.state.headerImageSelected} element={this.accordionHeaderRef.current}>
            <Popover
              offset={8}
              theme={PopoverTheme.Dark}
              button={(buttonProps) => <ToolbarButton icon={<Images />} {...buttonProps} />}
            >
              <TextInput label="Background image URL" theme={TextInputTheme.Dark}></TextInput>
            </Popover>
          </Toolbar>
        )}
        {/* Image Toolbar - END */}

        {/* Header Text Toolbar - START */}
        <Toolbar visible={this.state.headerContentSelected} element={this.accordionHeaderTextRef.current}>
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
        {/* Header Text Toolbar - END */}

        {/* <Toolbar visible={this.state.bodyContentSelected} element={this.accordionBodyTextRef.current}>
          <ToolbarButton icon={<H1 />} />
          <ToolbarButton icon={<H2 />} />
          <ToolbarButton icon={<Bold />} />
          <ToolbarButton icon={<Italic />} />
        </Toolbar> */}
        <div
          className={classNames("accordion-card-widget", {
            "accordion-card-widget--selected": this.state.widgetSelected,
            "accordion-card-widget--hover": this.state.widgetHovering,
          })}
          ref={this.widgetElementRef}
          tabIndex={0}
          onClick={this.handleWidgetSelected}
          // onFocus now focusses everytime I click / tab inside children elements
          // onFocus bubbles up
          onFocus={this.handleWidgetFocus}
          onKeyDown={this.handleWidgetTabKeyDown}
          // onPointerMove={this.handleWidgetHover}
        >
          {/* Accordion header */}
          <div
            className="accordion-card-widget__header"
            ref={this.accordionHeaderRef}
            onClick={this.handleImageSelected}
            onPointerMove={this.handleWidgetHover}
          >
            <div
              className="accordion-card-widget__header-image-controls-transition-wrapper"
              style={{
                height: this.state.headerImageEntered ? "auto" : this.state.headerImageHeight,
                opacity: this.state.headerImageEntered ? 1 : 0,
              }}
              ref={this.accordionHeaderImageWrapperRef}
            >
              <CSSTransition
                timeout={AnimationDuration.Short}
                classNames="accordion-card-widget__header-image-controls-"
                in={cardStyle === "visual"}
                onEnter={this.handleHeaderImageEnter}
                onEntered={() => this.setState({ headerImageEntered: true })}
                onExit={() => {
                  this.setState({ headerImageHeight: 0, cardStyle: "simple" });
                  console.log(this.state.headerImageHeight);
                  forceReflow(this.accordionHeaderImageWrapperRef.current);
                }}
              >
                <div className="accordion-card-widget__header-image-controls">
                  {this.context.imageButtonType === "Text" && (
                    <Button
                      className="accordion-card-widget__header-image-text-button"
                      type={ButtonType.Secondary}
                      size={ButtonSize.Small}
                    >
                      Swap image
                    </Button>
                  )}
                  {this.context.imageButtonType === "Icon" && (
                    <IconButton
                      className="accordion-card-widget__header-image-icon-button"
                      icon={<Images />}
                      type={ButtonType.Secondary}
                      size={ButtonSize.Small}
                      tooltip={{ content: "Swap image" }}
                    />
                  )}
                </div>
              </CSSTransition>
            </div>
            {/* Accordion header button */}
            <div className="accordion-card-widget__header-content" onPointerMove={this.handleWidgetHover}>
              <ContentEditable
                className={classNames("accordion-card-widget__header-text", {
                  "accordion-card-widget__header-text--h1": this.state.isH1,
                  "accordion-card-widget__header-text--h2": this.state.isH2,
                  "accordion-card-widget__header-text--h3": this.state.isH3,
                  "accordion-card-widget__header-text--bold": this.state.isBold,
                  "accordion-card-widget__header-text--italic": this.state.isItalic,
                })}
                innerRef={this.accordionHeaderTextRef}
                placeholder="Accordion heading"
                html={this.state.headerHTML}
                onChange={this.handleHeaderChange}
                onKeyDown={this.handleKeyDown}
                onPaste={this.pasteAsPlainText}
              />
              <div
                className={classNames("accordion-card-widget__header-button", {
                  "accordion-card-widget__header-button--h1": this.state.isH1,
                  "accordion-card-widget__header-button--h2": this.state.isH2,
                  "accordion-card-widget__header-button--h3": this.state.isH3,
                })}
                ref={this.accordionButtonRef}
              >
                <IconButton
                  size={ButtonSize.Small}
                  icon={
                    bodyOpen ? (
                      <MarkerArrowDown style={{ color: "white" }} />
                    ) : (
                      <MarkerArrowRight style={{ color: "white" }} />
                    )
                  }
                  // tooltip={bodyOpen ? { content: "Collapse" } : { content: "Expand" }}
                  aria-label={bodyOpen ? "Collapse" : "Expand"}
                  onClick={this.toggleContent}
                  // tabIndex={-1}
                />
              </div>
            </div>
          </div>

          <div
            className="accordion-card-widget__body-transition-wrapper"
            style={{ height: this.state.bodyEntered ? "auto" : this.state.bodyHeight }}
            ref={this.accordionBodyWrapperRef}
          >
            <CSSTransition
              timeout={AnimationDuration.Long}
              classNames="accordion-card-widget__body-"
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
              <div
                className="accordion-card-widget__body"
                onClick={this.handleContentClick}
                ref={this.accordionBodyRef}
                style={{ backgroundColor: this.state.bodyBackground ? "@grey10" : "transparent" }}
              >
                <ContentEditable
                  className="accordion-card-widget__body-text"
                  innerRef={this.accordionBodyTextRef}
                  placeholder="Add content here, or press Cmd/Ctrl + Enter for a new accordion"
                  html={this.state.bodyHTML}
                  onChange={this.handleBodyChange}
                  onKeyDown={this.handleKeyDown}
                  onPaste={this.pasteAsPlainText}
                />
              </div>
            </CSSTransition>
          </div>
        </div>
      </>
    );
  }
}

export default Accordion;
