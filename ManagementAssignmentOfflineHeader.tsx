import { Button, ListHeader } from "@agin/react-ui-structure";
import { ReactElement, useContext } from "react";
import { defineMessages, useIntl } from "react-intl";
import { ManagementAssignmentOfflineContext } from "../context/ProjectAssignmentOfflineContext";


const messages = defineMessages({
  title: {
    id: "board-members",
    defaultMessage: "board-members",
  },
});

interface Props {
  hasView?: boolean;
}

function ManagementAssignmentOfflineHeader({ hasView }: Props): ReactElement {
  const intl = useIntl();
  const { setIsCreateOpen, isCreateOpen } = useContext(
    ManagementAssignmentOfflineContext
  );
  return (
    <ListHeader
      title={intl.formatMessage(messages.title)}
      hasFilter={false}
      hasCreate={false}
      hasRefresh={!hasView}
      buttons={
        !hasView ? <Button
          circle
          color="green"
          type="button"
          tooltip="ایجاد"
          onClick={() => {
            setIsCreateOpen(!isCreateOpen)
          }}
        >
          <i className="fal fa-plus"></i>
        </Button>
          : null
      }
    />
  );
}

export default ManagementAssignmentOfflineHeader;


