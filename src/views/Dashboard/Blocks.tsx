import React, { FC } from "react";
import ActionBar from "./ActionBar";
import DashboardSidebar from "./DashboardSidebar";
import { Button, ButtonDecorator, ButtonSize, ButtonType, EmptyState, OptionMenu, OptionMenuItem } from "kaleidoscope";
import { Edit, Filter } from "kaleidoscope/src/global/icons";

const Blocks: FC = () => {
  return (
    <>
      <DashboardSidebar
        defaultFolderName="Saved Blocks"
        exploreFolders={[
          {
            name: "Qwilr Blocks",
          },
          {
            name: "Community Blocks",
          },
          {
            name: "Popular",
          },
        ]}
        accountFolders={[
          {
            name: "Services",
          },
          {
            name: "Sales Internal",
          },
          {
            name: "Testimonials",
          },
        ]}
      />
      <div className="proto-dashboard__list">
        <ActionBar
          title="Saved Blocks"
          primaryActions={
            <OptionMenu button={<Button decorator={ButtonDecorator.Dropdown}>Create new</Button>}>
              <OptionMenuItem>Text block</OptionMenuItem>
              <OptionMenuItem>Splash block</OptionMenuItem>
              <OptionMenuItem>Video block</OptionMenuItem>
              <OptionMenuItem>Quote block</OptionMenuItem>
              <OptionMenuItem>Accept block</OptionMenuItem>
              <OptionMenuItem>Embed block</OptionMenuItem>
            </OptionMenu>
          }
          secondaryActions={
            <>
              <Button type={ButtonType.Tertiary} size={ButtonSize.Small}>
                <Filter />
                Filters
              </Button>
              <Button type={ButtonType.Tertiary} size={ButtonSize.Small}>
                <Edit />
                Last Edited
              </Button>
            </>
          }
        />
        <EmptyState isDashed title="Add saved blocks here" />
      </div>
    </>
  );
};

export default Blocks;
