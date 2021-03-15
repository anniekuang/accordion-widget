import Panel from "kaleidoscope/src/global/pieces/panel/Panel/Panel";
import { AnimationDuration } from "kaleidoscope/src/styles/Animations";
import React, { FC, ReactNode, RefObject, useRef, useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import classNames from "classnames";
import getPopoverPosition, { IPopoverPosition } from "kaleidoscope/src/utils/getPopoverPosition";
import observeRect from "@reach/observe-rect";
import getPortalRoot from "kaleidoscope/src/utils/getPortalRoot";
import { createPortal } from "react-dom";
import forceReflow from "kaleidoscope/src/utils/forceReflow";
import { KeyType, randomString } from "kaleidoscope/src/utils";

export enum PopoverPosition {
  Top = "top",
  Bottom = "bottom",
}

export enum PopoverTheme {
  Dark = "dark",
  Light = "light",
}

interface PopoverProps {
  isOpen?: boolean;
  button: (buttonProps: {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    ref: RefObject<HTMLButtonElement>;
    "aria-controls": string;
    "aria-expanded": boolean;
  }) => ReactNode;
  onChange: (isOpen: boolean) => void;
  position?: PopoverPosition;
  offset?: number;
  className?: string;
  theme?: PopoverTheme;
  id?: string;
}

const Popover: FC<PopoverProps> = ({
  isOpen,
  button,
  onChange,
  children,
  position = PopoverPosition.Bottom,
  offset = 8,
  className,
  theme,
  id,
}) => {
  const [popoverPosition, setPopoverPosition] = useState<IPopoverPosition>();
  const [keyboardTriggered, setKeyboardTriggered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>();
  const popoverRef = useRef<HTMLDivElement>();
  const portalRoot = useRef<HTMLElement>(getPortalRoot("popover-root"));
  const observerRef = useRef<{ observe(): void; unobserve(): void }>();
  const randomId = useRef(randomString());
  const popoverId = id || `popover-${randomId.current}`;

  // Observe rect and recalculate position
  useEffect(() => {
    const handleTargetRectChange = (targetRect: DOMRect) => {
      const popoverRect = popoverRef.current?.getBoundingClientRect();

      const newPopoverPosition = getPopoverPosition({
        position,
        targetRect,
        popoverRect,
        offset,
        caretSize: 0,
        outerMargin: 16,
      });

      setPopoverPosition(newPopoverPosition);
    };

    if (isOpen) {
      observerRef.current = observeRect(buttonRef.current, handleTargetRectChange);
      observerRef.current.observe();
    }

    return () => {
      observerRef.current?.unobserve();
    };
  }, [isOpen, offset, position]);

  // Manage keyboard focus
  useEffect(() => {
    if (!keyboardTriggered) return;

    if (isOpen) {
      popoverRef.current?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [isOpen, keyboardTriggered]);

  // Reset keyboardTriggered on close
  useEffect(() => {
    if (!isOpen) {
      setKeyboardTriggered(false);
    }
  }, [isOpen]);

  // Handle closing the popover on outer click and esc key
  useEffect(() => {
    const handleOuterClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        target !== popoverRef.current &&
        target !== buttonRef.current &&
        !popoverRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        onChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOuterClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleOuterClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, keyboardTriggered, onChange]);

  const handleButtonClick = () => {
    onChange(!isOpen);
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === KeyType.Enter) {
      setKeyboardTriggered(true);
    }
  };

  const handlePopoverBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();

    const target = event.relatedTarget as Node;
    const isOutside = !popoverRef.current.contains(target) && target !== popoverRef.current;

    if (isOpen && keyboardTriggered && isOutside) {
      // If the target is outside the document weird stuff happens if we close and restore focus immediately
      if (!target) {
        setTimeout(() => {
          onChange(false);
        }, 100);
      } else {
        onChange(false);
      }
    }
  };

  return (
    <>
      {button({
        ref: buttonRef,
        ["aria-controls"]: popoverId,
        ["aria-expanded"]: isOpen,
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
      })}
      <Transition mountOnEnter unmountOnExit in={isOpen} timeout={AnimationDuration.Medium} onEnter={forceReflow}>
        {(status) =>
          createPortal(
            <div
              ref={popoverRef}
              className={classNames("popover", className)}
              onClick={(event) => event.stopPropagation()}
              onBlur={handlePopoverBlur}
              tabIndex={-1}
              id={popoverId}
              style={{
                transform: `translate3d(${popoverPosition?.popover.left || 0}px, ${
                  popoverPosition?.popover.top || 0
                }px, 0)`,
              }}
            >
              <Panel
                theme={theme === PopoverTheme.Dark ? "dark" : "light"}
                className={classNames(
                  "popover__panel",
                  `popover__panel--${status}`,
                  `popover__panel--${position || popoverPosition?.modifier}`,
                )}
              >
                {children}
              </Panel>
            </div>,
            portalRoot.current,
          )
        }
      </Transition>
    </>
  );
};

export default Popover;
