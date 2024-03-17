import {
  DataLoader,
  OfflineInplaceEdditingHeader,
  OfflineInplaceEdditingProvider,
  useDataGetter,
} from "@agin/react-ui-structure";
import { ReactElement } from "react";
import { FieldRenderProps } from "react-final-form";
import { defineMessages, useIntl } from "react-intl";
import "./assets/ManagementAssignmentOffline.scss";
import ManagementAssignmentOfflineList from "./components/ManagementAssignmentOfflineList";
import { ListInfoStockType_ENDPOINT } from "./meta/constants";

interface Props extends FieldRenderProps<any[]> {
  total?: number;
  companyId?: number;
  projectTypeId?: number;
  hasView?: boolean;
  disableCreate?: boolean;
  onChange?: (v: any) => void;

}
const messages = defineMessages({
  title: {
    id: "approval-basis",
    defaultMessage: "Approval Basis"
  },
});

function ManagementAssignmentOffline({ input, meta, total, hasView, onChange, companyId, projectTypeId,disableCreate }: Props): ReactElement {
  const { data: stockTypeData, loading } = useDataGetter({
    url: ListInfoStockType_ENDPOINT
  })
  const intl = useIntl();

  return (
    <DataLoader data={stockTypeData} loading={loading}>
      <OfflineInplaceEdditingProvider input={{ ...input, onChange: (v) => { if (onChange) onChange(v); input.onChange(v) } }} meta={meta}>
        <OfflineInplaceEdditingHeader hasCreate={!disableCreate}
          title={intl.formatMessage(messages.title)} />
        <ManagementAssignmentOfflineList hasView={hasView} companyId={companyId} projectTypeId={projectTypeId} />
      </OfflineInplaceEdditingProvider>
    </DataLoader>
  );
}

export default ManagementAssignmentOffline;
