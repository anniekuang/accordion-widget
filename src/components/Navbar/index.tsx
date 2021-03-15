import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "assets/logo.svg";
import classNames from "classnames";
import { Avatar, OptionMenu, OptionMenuItem, OptionMenuSeparator } from "kaleidoscope/src";
import { handleMouseUpByBlurring } from "kaleidoscope/src/utils/focus";

interface NavbarProps {
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ children, className }) => {
  return <header className={classNames("proto-navbar", className)}>{children}</header>;
};

export const NavbarLogo: FC = (props) => {
  return (
    <Link to={(location) => ({ ...location, pathname: "/" })} className="proto-navbar__logo" {...props}>
      <Logo />
    </Link>
  );
};

export const NavbarDetails: FC = ({ children }) => {
  return <div className="proto-navbar__details">{children}</div>;
};

export const NavbarLinks: FC = ({ children }) => {
  return <ul className="proto-navbar__links">{children}</ul>;
};

interface NavbarLinkProps {
  to: string;
}

export const NavbarLink: FC<NavbarLinkProps> = ({ children, to }) => {
  return (
    <li>
      <NavLink className="proto-navbar__link" to={(location) => ({ ...location, pathname: to })}>
        {children}
      </NavLink>
    </li>
  );
};

export const NavbarTitle: FC = ({ children }) => {
  return <h1 className="proto-navbar__title">{children}</h1>;
};

interface NavbarActionsProps {
  space?: string;
}

export const NavbarActions: FC<NavbarActionsProps> = ({ children, space = "s" }) => {
  return <div className={`proto-navbar__actions proto-navbar__actions--space-${space}`}>{children}</div>;
};

export const NavbarProfile: FC = () => {
  return (
    <div className="proto-navbar__profile">
      <OptionMenu
        button={
          <button className="proto-navbar__profile-button" onMouseUp={handleMouseUpByBlurring}>
            <Avatar firstName="Johnny" lastName="Silverhand" />
          </button>
        }
      >
        <OptionMenuItem>Account details</OptionMenuItem>
        <OptionMenuItem>Manage team</OptionMenuItem>
        <OptionMenuItem>Refer a friend</OptionMenuItem>
        <OptionMenuItem>View all settings</OptionMenuItem>
        <OptionMenuSeparator />
        <OptionMenuItem>Log out</OptionMenuItem>
      </OptionMenu>
    </div>
  );
};

export default Navbar;
