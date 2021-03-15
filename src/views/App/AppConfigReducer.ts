export enum ConfigType {
  Slider = "slider",
  TextInput = "text-input",
  NumberInput = "number-input",
  Toggle = "toggle",
  SegmentedControl = "segmented-control",
}

interface SliderConfig {
  type: ConfigType.Slider;
  value: number;
  min: number;
  max: number;
}

interface TextInputConfig {
  type: ConfigType.TextInput;
  value: string;
}

interface NumberInputConfig extends Omit<SliderConfig, "type"> {
  type: ConfigType.NumberInput;
}

interface ToggleConfig {
  type: ConfigType.Toggle;
  value: boolean;
}

interface SegmentedControlConfig {
  type: ConfigType.SegmentedControl;
  value: string;
  options: string[];
}

export type ConfigOption = SliderConfig | NumberInputConfig | TextInputConfig | ToggleConfig | SegmentedControlConfig;

export interface AppConfigReducerProps {
  [key: string]: ConfigOption;
}

export enum ConfigReducerAction {
  SetConfig = "SetConfig",
}

export function reducer(state: AppConfigReducerProps, action: { type: ConfigReducerAction; value: any }) {
  switch (action.type) {
    case ConfigReducerAction.SetConfig:
      return { ...state, ...action.value };
    default:
      throw new Error();
  }
}
