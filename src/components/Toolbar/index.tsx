import React, { CSSProperties, FC, forwardRef, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import observeRect from "@reach/observe-rect";
import getPortalRoot from "kaleidoscope/src/utils/getPortalRoot";
import { ButtonTheme, IconButton } from "kaleidoscope/src";
import { IIconButtonProps } from "kaleidoscope/src/global/pieces/IconButton/IconButton";

interface ToolbarProps {
  visible: boolean;
  element: HTMLElement;
  offset?: number;
}

const Toolbar: FC<ToolbarProps> = ({ children, visible, element, offset = 16 }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const toolbarRef = useRef<HTMLDivElement>();
  const toolbarRoot = useRef(getPortalRoot("toolbar"));

  useLayoutEffect(() => {
    if (!visible) return;

    const rectObserver = observeRect(element, (rect) => {
      const toolbarRect = toolbarRef.current?.getBoundingClientRect();

      const x = rect.left + rect.width / 2 - toolbarRect.width / 2;
      const y = rect.top - offset - toolbarRect.height;

      setPosition({ x, y });
    });

    rectObserver.observe();

    return () => {
      rectObserver.unobserve();
    };
  }, [element, offset, visible]);

  return (
    <Transition mountOnEnter unmountOnExit in={visible} timeout={400} onEnter={(node) => node && node.offsetHeight}>
      {(status) =>
        createPortal(
          <div
            className={`proto-toolbar proto-toolbar--${status}`}
            onPointerDown={(event) => event.stopPropagation()}
            style={
              position ? ({ "--x": `${position.x || 0}px`, "--y": `${position.y || 0}px` } as CSSProperties) : null
            }
            ref={toolbarRef}
          >
            <div className={`proto-toolbar__content proto-toolbar__content--${status}`}>{children}</div>
          </div>,
          toolbarRoot.current,
        )
      }
    </Transition>
  );
};

interface ToolbarButtonProps extends IIconButtonProps {
  selected?: boolean;
}

const ToolbarButton: FC<ToolbarButtonProps> = forwardRef(({ children, onClick, selected, icon, ...props }, ref) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick?.(event);
  };

  return (
    <IconButton
      ref={ref}
      icon={icon}
      theme={ButtonTheme.Dark}
      className="proto-toolbar__button"
      aria-pressed={selected}
      onClick={handleClick}
      {...props}
    />
  );
});

export default Toolbar;
export { ToolbarButton };
