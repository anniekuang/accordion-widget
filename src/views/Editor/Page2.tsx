import React from "react";
import { Helmet } from "react-helmet";
import Block from "./Block";
import EditorNavbar from "./EditorNavbar";
import AccordionCard from "./AccordionCard";
import QuickAddMenu from "./QuickAddMenu";
import { randomString } from "kaleidoscope/src/utils";

class Editor extends React.Component {
  state = {
    accordionWidgets1: [{ id: randomString() }],
    accordionWidgets2: [{ id: randomString() }],
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
              {/* {this.state.accordionWidgets1.map((accordionWidgetItem, index) => (
                <AccordionCard
                  key={accordionWidgetItem.id}
                  id={accordionWidgetItem.id}
                  addAccordion={() => this.addAccordion1(index)}
                  removeAccordion={() => this.removeAccordion1(accordionWidgetItem.id)}
                ></AccordionCard>
              ))} */}
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
            <AccordionCard
              key="accordion-1"
              id="accordion-1"
              addAccordion={() => null}
              removeAccordion={() => this.removeAccordion2("accordion-1")}
              headerText="Research"
              bodyText="We will create a customised email marketing playbook based on your customer base providing all the data we have collected and analysed, including segmentation of your lists based on the customer lifecycle stage value of each lead. This will help to shape the tone of our messaging and how frequently we should send out emails to the different segments in your email database."
            />
            <AccordionCard
              key="accordion-1"
              id="accordion-1"
              addAccordion={() => null}
              removeAccordion={() => this.removeAccordion2("accordion-1")}
              headerText="Housekeeping"
              bodyText="To ensure that emails are getting into your subscriber’s inboxes, we’ll look into cleaning up your existing database. In addition, we’ll work on laying down some basic standard operating procedures to ensure that your emails are whitelisted and delivered properly to your recipients, such as setting up a double opt-in process and setting up a Welcome email workflow to ensure that your clients have all the information they need to add your emails into their address book."
            />
            {this.state.accordionWidgets1.map((accordionWidgetItem, index) => (
              <AccordionCard
                key={accordionWidgetItem.id}
                id={accordionWidgetItem.id}
                addAccordion={() => this.addAccordion1(index)}
                removeAccordion={() => this.removeAccordion1(accordionWidgetItem.id)}
                headerText="Content Creation"
                bodyText="Working with you and your team, we’ll come up with guidelines on when and how often you should send emails by coming up with a category of email types that you will be sending. From offers, to sharing updates and sending an e-newsletter, we will help you to match this with the different lists that you have created to ensure that your emails reach the right people at the right time.

              In addition, we will also conduct a 3 day training course on creating content for emails outlining industry best practices like how to improve your subject lines and email copy to increase open rates and click-through rates."
              />
            ))}
            {this.state.accordionWidgets2.map((accordionWidgetItem, index) => (
              <AccordionCard
                key={accordionWidgetItem.id}
                id={accordionWidgetItem.id}
                addAccordion={() => this.addAccordion2(index)}
                removeAccordion={() => this.removeAccordion2(accordionWidgetItem.id)}
              ></AccordionCard>
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
