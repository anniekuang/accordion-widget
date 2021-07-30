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
  // exampleNumber: {
  //   type: ConfigType.NumberInput,
  //   value: 1,
  // },
  imageButtonType: {
    type: ConfigType.SegmentedControl,
    value: "Icon",
    options: ["Text", "Icon", "Toolbar"],
  },
  imageButtonSize: {
    type: ConfigType.SegmentedControl,
    value: "Medium",
    options: ["Small", "Medium"],
  },
  imageButtonStyle: {
    type: ConfigType.SegmentedControl,
    value: "Secondary",
    options: ["Secondary", "Tertiary"],
  },
  newAccordionIs: {
    type: ConfigType.SegmentedControl,
    value: "Collapsed",
    options: ["Expanded", "Collapsed"],
  },
};
