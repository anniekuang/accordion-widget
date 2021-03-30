import React, {
  ComponentClass,
  ComponentElement,
  createRef,
  FC,
  LegacyRef,
  ReactComponentElement,
  ReactElement,
} from "react";
import { Helmet } from "react-helmet";
import Block from "./Block";
import EditorNavbar from "./EditorNavbar";
import AccordionA from "./Accordion/AccordionA";
import AccordionCard from "./AccordionCard";
import QuickAddMenu from "./QuickAddMenu";
import { randomString } from "kaleidoscope/src/utils";
import { Button, ButtonType } from "kaleidoscope/src";
import { IReactComponent } from "mobx-react";

class Editor extends React.Component {
  state = {
    accordionWidgets1: [{ id: randomString() }],
    accordionWidgets2: [],
  };

  addAccordion1 = (index: number = this.state.accordionWidgets1.length) => {
    this.setState({
      accordionWidgets1: [
        ...this.state.accordionWidgets1.slice(0, index + 1),
        { id: randomString() },
        ...this.state.accordionWidgets1.slice(index + 1, this.state.accordionWidgets1.length),
      ],
    });
  };

  removeAccordion1 = (id: string) => {
    this.setState({
      accordionWidgets1: this.state.accordionWidgets1.filter((accordionWidget) => accordionWidget.id !== id),
    });
  };

  newAccordion = () => {
    this.setState({
      accordionWidgets2: [...this.state.accordionWidgets2, { id: randomString() }],
    });
  };

  addAccordion2 = (index: number = this.state.accordionWidgets2.length) => {
    this.setState({
      accordionWidgets2: [
        ...this.state.accordionWidgets2.slice(0, index + 1),
        { id: randomString() },
        ...this.state.accordionWidgets2.slice(index + 1, this.state.accordionWidgets2.length),
      ],
    });
  };

  removeAccordion2 = (id: string) => {
    this.setState({
      accordionWidgets2: this.state.accordionWidgets2.filter((accordionWidget) => accordionWidget.id !== id),
    });
  };

  render() {
    return (
      <div className="proto-editor">
        <Helmet>
          <title>Email Marketing Proposal</title>
        </Helmet>
        <EditorNavbar />
        {/* <a
          target="_blank"
          href="https://www.notion.so/qwilr/Reflection-Pool-Accordion-Widget-846d5aa5eeff4c12a0942abcc0a73cea#0d2a6cd899044b1d915bea7ef5efab27"
        >
          <Button type={ButtonType.Secondary}>Leave Feedback</Button>
        </a> */}
        <div className="proto-editor__content">
          <div className="splash-block--dark">
            <Block
              textAlign="center"
              backgroundImage="https://images.unsplash.com/photo-1502758775495-0ec4a639aa64?q=80&fm=jpg&crop=entropy&w=1080&fit=max"
              theme="dark"
              overlayOpacity={0.5}
            >
              <img
                src="https://d2cankni8sodj9.cloudfront.net/snz42Nd30EUx6fjucJ3D4gLHwxrqUOZPULWxKw.png"
                alt=""
                style={{ width: "25%" }}
              />
              <h1>
                <b>Email Marketing Proposal</b>
              </h1>
              <p>Prepared for Billie Danish</p>
              <p>by Sally Fields — sallyfields@signify.com</p>
              {this.state.accordionWidgets1.map((accordionWidgetItem, index) => (
                <AccordionCard
                  key={accordionWidgetItem.id}
                  id={accordionWidgetItem.id}
                  addAccordion={() => this.addAccordion1(index)}
                  removeAccordion={() => this.removeAccordion1(accordionWidgetItem.id)}
                ></AccordionCard>
              ))}
              {/* <QuickAddMenu addAccordion={this.addAccordion1}></QuickAddMenu> */}
            </Block>
          </div>
          <Block>
            <h1 style={{ color: "#2980b9" }}>
              <b>Process outline—</b>
            </h1>
            <h2>Breaking down requirements</h2>
            <p>
              As digital marketing specialists, Signify’s consultants have improved the way our clients interact and
              engage with customers online. Our expertise in full service digital solutions, digital marketing and
              technology solutions as well as our integrated approach towards seamless digital marketing campaigns, and
              our cutting edge marketing techniques that have been backed by industry best practices have helped many of
              our clients achieve their marketing objectives.
            </p>
            <p>Read about our process below.</p>
            {this.state.accordionWidgets2.map((accordionWidgetItem, index) => (
              <AccordionA
                key={accordionWidgetItem.id}
                id={accordionWidgetItem.id}
                addAccordion={() => this.addAccordion2(index)}
                removeAccordion={() => this.removeAccordion2(accordionWidgetItem.id)}
              ></AccordionA>
            ))}
            <QuickAddMenu addAccordion={this.newAccordion}></QuickAddMenu>
          </Block>
          <Block theme="dark" backgroundColor="#34495e" textAlign="center">
            <h1>
              <b>Contact us</b>
            </h1>
            <h2>
              <em>Ready to take the next step?</em>
            </h2>
            <p>Email: help@signify.com / Web: https://signify.com</p>
          </Block>
        </div>
      </div>
    );
  }
}

export default Editor;
