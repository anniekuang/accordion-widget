import React, { createContext, FC, useState } from "react";
import { Route, Switch } from "react-router";
import EditorNavbar from "./EditorNavbar";
import Page1 from "./Page1";
import Page2 from "./Page2";

interface EditorContextProps {
  preview: boolean;
  setPreview: (isPreview: boolean) => void;
}

export const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

interface EditorProps {
  title?: string;
}

export const EditorWrapper: FC<EditorProps> = ({ children, title = "Project name" }) => {
  const [preview, setPreview] = useState(false);

  return (
    <EditorContext.Provider value={{ preview, setPreview }}>
      <div className="proto-editor">
        <EditorNavbar title={title} />
        <div className="proto-editor__content">{children}</div>
      </div>
    </EditorContext.Provider>
  );
};

// Add extra pages here if you need multiple pages in your prototype
const Editor: FC = () => {
  return (
    <Switch>
      <Route path="/editor/page1" component={Page1} />
      <Route path="/editor/page2" component={Page2} />
      <Route exact path="/editor" component={Page1} />
    </Switch>
  );
};

export default Editor;
