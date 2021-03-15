import React, { createContext, FC, useContext, useEffect, useReducer, useState } from "react";
import {
  ButtonType,
  IconButton,
  SegmentedControl,
  SliderInput,
  TextInput,
  TextInputType,
  Toggle,
} from "kaleidoscope/src";
import { Settings } from "kaleidoscope/src/global/icons";
import { startCase } from "lodash";
import Popover, { PopoverPosition } from "components/Popover";
import { reducer, ConfigReducerAction, AppConfigReducerProps, ConfigType, ConfigOption } from "./AppConfigReducer";
import { useHistory } from "react-router-dom";
import { appConfigOptions } from "./AppConfigOptions";

export const ConfigContext = createContext({} as AppConfigReducerProps);

// Deserialize params into initial config
const initialParams = new URLSearchParams(window.location.search);
const initialUrlConfig = appConfigOptions;

for (const [key, value] of initialParams.entries()) {
  let typedValue: any = value;

  if (value === "true") {
    typedValue = true;
  } else if (value === "false") {
    typedValue = false;
  } else if (!isNaN(parseFloat(value))) {
    typedValue = Number(value);
  }

  if (initialUrlConfig[key]) {
    initialUrlConfig[key].value = typedValue;
  }
}

const AppConfig: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUrlConfig);
  const [showConfig, setShowConfig] = useState(false);
  const history = useHistory();

  // Serialize config into url params
  useEffect(() => {
    const params = new URLSearchParams(history.location.search);

    for (const key of Object.keys(state)) {
      params.set(key, state[key].value);
    }

    history.replace(`${history.location.pathname}?${params}`);
  }, [history, state]);

  const updateValue = (key: string, option: ConfigOption, value: any) => {
    dispatch({ type: ConfigReducerAction.SetConfig, value: { [key]: { ...option, value } } });
  };

  return (
    <ConfigContext.Provider value={state}>
      {children}
      {state.showConfig.value && (
        <div className="app__config">
          <Popover
            position={PopoverPosition.Top}
            isOpen={showConfig}
            onChange={setShowConfig}
            button={(buttonProps) => (
              <IconButton isRound icon={<Settings />} type={ButtonType.Secondary} {...buttonProps} />
            )}
          >
            <div className="app__config-panel">
              {Object.keys(state).map((key) => {
                const option = state[key];

                if (option.type === ConfigType.Toggle) {
                  return (
                    <Toggle
                      key={key}
                      label={startCase(key)}
                      value={option.value}
                      onChange={(value) => updateValue(key, option, value)}
                    />
                  );
                }

                if (option.type === ConfigType.NumberInput) {
                  return (
                    <TextInput
                      key={key}
                      type={TextInputType.Number}
                      label={startCase(key)}
                      value={option.value.toString()}
                      onChange={(value) => updateValue(key, option, Number(value))}
                    />
                  );
                }

                if (option.type === ConfigType.TextInput) {
                  return (
                    <TextInput
                      key={key}
                      label={startCase(key)}
                      value={option.value}
                      onChange={(value) => updateValue(key, option, value)}
                    />
                  );
                }

                if (option.type === ConfigType.Slider) {
                  return (
                    <SliderInput
                      key={key}
                      label={startCase(key)}
                      initialInputValue={option.value}
                      handleValueChange={(value) => updateValue(key, option, value)}
                      minimalInput={option.min}
                      maximum={option.max}
                    />
                  );
                }

                if (option.type === ConfigType.SegmentedControl) {
                  return (
                    <SegmentedControl
                      key={key}
                      onClickHandler={(value) => updateValue(key, option, value)}
                      label={startCase(key)}
                      selectedValue={option.value}
                      options={option.options.map((option) => ({ label: option, value: option }))}
                    />
                  );
                }
              })}
            </div>
          </Popover>
        </div>
      )}
    </ConfigContext.Provider>
  );
};

export function useConfigContext() {
  return useContext(ConfigContext);
}

export default AppConfig;
