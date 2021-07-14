import { ConfigType } from "./AppConfigReducer";

// Add config options here
export const appConfigOptions = {
  showConfig: {
    type: ConfigType.Toggle,
    value: true,
  },
  // exampleToggle: {
  //   type: ConfigType.Toggle,
  //   value: false,
  // },
  // exampleSlider: {
  //   type: ConfigType.Slider,
  //   value: 5,
  //   min: 0,
  //   max: 10,
  // },
  shortcutKey: {
    type: ConfigType.TextInput,
    value: "Example",
  },
  // exampleNumber: {
  //   type: ConfigType.NumberInput,
  //   value: 1,
  // },
  imageButtonType: {
    type: ConfigType.SegmentedControl,
    value: "Text",
    options: ["Text", "Icon", "Toolbar"],
  },
  newAccordionIs: {
    type: ConfigType.SegmentedControl,
    value: "Collapsed",
    options: ["Expanded", "Collapsed"],
  },
};
