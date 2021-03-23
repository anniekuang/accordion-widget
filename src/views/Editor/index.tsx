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
import Accordion from "./Accordion";
import QuickAddMenu from "./QuickAddMenu";
import { randomString } from "kaleidoscope/src/utils";
import { Button } from "kaleidoscope/src";
import { IReactComponent } from "mobx-react";

class Editor extends React.Component {
  state = {
    accordionWidgets1: [],
    accordionWidgets2: [],
  };

  addAccordion1 = () => {
    this.setState({ accordionWidgets1: [...this.state.accordionWidgets1, { id: randomString() }] });
  };

  removeAccordion1 = (id: string) => {
    this.setState({
      accordionWidgets: this.state.accordionWidgets1.filter((accordionWidget) => accordionWidget.id !== id),
    });
  };

  addAccordion2 = () => {
    this.setState({ accordionWidgets2: [...this.state.accordionWidgets2, { id: randomString() }] });
  };

  removeAccordion2 = (id: string) => {
    this.setState({
      accordionWidgets: this.state.accordionWidgets2.filter((accordionWidget) => accordionWidget.id !== id),
    });
  };

  render() {
    return (
      <div className="proto-editor">
        <Helmet>
          <title>Accordion Accords</title>
        </Helmet>
        <EditorNavbar />
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
                <b>Sales Proposal</b>
              </h1>
              <p>Prepared for [Add your client name]</p>
              <p>by [Add your name] — [Add your email address]</p>
              {React.Children.toArray(
                this.state.accordionWidgets1.map((accordionWidgetItem) => (
                  <Accordion
                    key={accordionWidgetItem.id}
                    id={accordionWidgetItem.id}
                    addAccordion={this.addAccordion1}
                    removeAccordion={() => this.removeAccordion1(accordionWidgetItem.id)}
                  ></Accordion>
                )),
              )}
              <QuickAddMenu addAccordion={this.addAccordion1}></QuickAddMenu>
            </Block>
          </div>
          <Block>
            <h1 style={{ color: "#2980b9" }}>
              <b>Project outline—</b>
            </h1>
            <h2>Breaking down requirements</h2>
            <p>
              The project description is an opportunity to demonstrate to your potential client that you have fully
              internalised what their business and their brand is about.
            </p>
            <p>
              Successful sales is about establishing trust between parties. Your sales material, as an extension of you,
              the salespersons, should demonstrate that you have listened attentively to your client and researched
              their commercial space, tailoring your sales material and your pitch for this particular business. Luckily
              with Qwilr, the tailoring part if quick and easy.
            </p>
            {this.state.accordionWidgets2.map((accordionWidgetItem) => (
              <Accordion
                key={accordionWidgetItem.id}
                id={accordionWidgetItem.id}
                addAccordion={this.addAccordion2}
                removeAccordion={() => this.removeAccordion2(accordionWidgetItem.id)}
              ></Accordion>
            ))}
            <QuickAddMenu addAccordion={this.addAccordion2}></QuickAddMenu>
          </Block>
          <Block theme="dark" backgroundColor="#34495e" textAlign="center">
            <h1>
              <b>Contact us</b>
            </h1>
            <h2>
              <em>Ready to take the next step?</em>
            </h2>
            <p>Email: help@qwilr.com / Web: https://qwilr.com</p>
          </Block>
        </div>
      </div>
    );
  }
}

export default Editor;
