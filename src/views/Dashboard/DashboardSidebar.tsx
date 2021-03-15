import React, { FC } from "react";
import { makeMockTree } from "kaleidoscope/src/global/pieces/FolderTree/Mocks.util.spec";
import { FolderTree } from "kaleidoscope/src/global/pieces/FolderTree/FolderTree";
import { FolderTreeViewStore, IFolderViewData } from "kaleidoscope/src/global/pieces/FolderTree/FolderTreeViewStore";
import { FolderSelectionViewStore } from "kaleidoscope/src/global/pieces/FolderTree/FolderSelectionViewStore/FolderSelectionViewStore";
import { ButtonType, IconButton } from "kaleidoscope/src";
import { Add, Archive, Delete, Folder } from "kaleidoscope/src/global/icons";
import { FolderComponent } from "kaleidoscope/src/global/pieces/FolderTree/FolderComponent/FolderComponent";

const defaultMockFolders = (folders: any[]): IFolderViewData[] => {
  return makeMockTree(folders);
};

/**
 * Helper function to simplify the mocking of the `viewStore` and `onSelect` props, which are
 * always required.
 */
function makeRequiredProps(folders: IFolderViewData[]) {
  const selectionState = new FolderSelectionViewStore();
  const viewStore = new FolderTreeViewStore(() => {
    return folders;
  }, selectionState);

  return {
    viewStore,
    onSelect: selectionState.setSelectedFolder,
  };
}

interface DashboardSidebarProps {
  defaultFolderName: string;
  hasArchived?: boolean;
  accountFolders?: any[];
  exploreFolders?: any[];
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({
  defaultFolderName,
  hasArchived,
  exploreFolders,
  accountFolders,
}) => {
  return (
    <div className="proto-dashboard-sidebar">
      {!!exploreFolders?.length && (
        <div className="proto-dashboard-sidebar__section">
          <div className="proto-dashboard-sidebar__header">
            <h2 className="proto-dashboard-sidebar__title">Explore</h2>
          </div>
          <FolderTree {...makeRequiredProps(defaultMockFolders(accountFolders))} />
        </div>
      )}
      <div className="proto-dashboard-sidebar__section">
        <div className="proto-dashboard-sidebar__header">
          <h2 className="proto-dashboard-sidebar__title">Account folders</h2>
          <IconButton isRound type={ButtonType.Secondary} icon={<Add />} tooltip={{ content: "New folder" }} />
        </div>
        {!!accountFolders?.length && <FolderTree {...makeRequiredProps(defaultMockFolders(accountFolders))} />}
      </div>
      <div className="proto-dashboard-sidebar__section proto-dashboard-sidebar__section--system">
        <FolderComponent name={defaultFolderName} icon={<Folder />} selected={true} />
        {hasArchived && <FolderComponent name="Archived" icon={<Archive />} selected={false} />}
        <FolderComponent name="Deleted" icon={<Delete />} selected={false} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
