import React, { FC } from "react";
import pageData from "data/pages.json";
import PageCard from "./PageCard";
import ActionBar from "./ActionBar";
import DashboardSidebar from "./DashboardSidebar";
import { Button, ButtonDecorator, ButtonSize, ButtonType, OptionMenu, OptionMenuItem } from "kaleidoscope";
import { Edit, Filter } from "kaleidoscope/src/global/icons";

const Pages: FC = () => {
  return (
    <>
      <DashboardSidebar
        hasArchived
        defaultFolderName="Pages"
        accountFolders={[
          {
            name: "Services",
            children: [
              { name: "2020 -- Agreements" },
              {
                name: "2019 -- Agreements",
                children: [{ name: "Customer Demos" }],
              },
              { name: "2018 -- Agreements" },
              { name: "2017 -- Agreements" },
            ],
          },
          {
            name: "Sales - Sydney Office",
            children: [
              { name: "2020 -- Agreements" },
              { name: "2019 -- Agreements" },
              {
                name: "2018 -- Agreements",
                children: [{ name: "Customer Demos" }],
              },
              { name: "2017 -- Agreements" },
            ],
          },
          {
            name: "Internal Docs",
          },
        ]}
      />
      <div className="proto-dashboard__list">
        <ActionBar
          title="Pages"
          primaryActions={
            <OptionMenu button={<Button decorator={ButtonDecorator.Dropdown}>Create new</Button>}>
              <OptionMenuItem>Blank page</OptionMenuItem>
              <OptionMenuItem>From template</OptionMenuItem>
              <OptionMenuItem>Folder</OptionMenuItem>
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
        {pageData.pages.map((page) => (
          <PageCard key={page.title} {...page} />
        ))}
      </div>
    </>
  );
};

export default Pages;
