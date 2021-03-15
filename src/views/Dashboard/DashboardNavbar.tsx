import React, { FC, useState } from "react";
import Navbar, {
  NavbarActions,
  NavbarDetails,
  NavbarLink,
  NavbarLinks,
  NavbarLogo,
  NavbarProfile,
} from "components/Navbar";
import { IconButton, SearchInput, TooltipPosition } from "kaleidoscope";
import { NewFeatures } from "kaleidoscope/src/global/icons";

const DashboardNavbar: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Navbar>
      <NavbarDetails>
        <NavbarLogo />
        <NavbarLinks>
          <NavbarLink to="/pages">Pages</NavbarLink>
          <NavbarLink to="/blocks">Blocks</NavbarLink>
          <NavbarLink to="/analytics">Analytics</NavbarLink>
        </NavbarLinks>
      </NavbarDetails>
      <div className="proto-dashboard__search">
        <SearchInput
          label="Search pages, blocks, and assets"
          placeholder="Search pages, blocks, and assets"
          onClear={() => setSearchValue("")}
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>
      <NavbarActions>
        <IconButton
          icon={<NewFeatures />}
          tooltip={{
            content: "Product updates",
            position: TooltipPosition.Bottom,
          }}
        />
      </NavbarActions>
      <NavbarProfile />
    </Navbar>
  );
};

export default DashboardNavbar;
