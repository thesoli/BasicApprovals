import { ITableColumn, OfflineInplaceEdditingContext, OfflineInplaceEdditingRow } from "@agin/react-ui-structure";
import { OfflineFormListActionTypeEnum } from "enum/OfflineFormListActionTypeEnum";
import { ReactElement, useContext } from "react";

interface Props {
  data: any;
  columns: ITableColumn[];
  isCreate?: boolean;
}

function ManagementAssignmentOfflineRow({
  columns,
  data,
  isCreate,
}: Props): ReactElement {

  const { value, setIsCreate, setValue } = useContext(OfflineInplaceEdditingContext)

  const handleSubmit = async (editedData: any) => {

    const id = Math.floor(Math.random() * 100000);
    if (editedData?.id) {
      const newList = [...(value || [])];
      const index = (value || [])?.findIndex(
        (item: any) => item?.id === editedData?.id
      );
      if (index || index === 0) {
        newList[index] = editedData;
        if (Boolean(editedData?.createdFromFront) === false) {
          newList[index].actionTypeEnum = OfflineFormListActionTypeEnum.EDIT;
        }
        setValue(newList);
      }
    }
    else {
      setValue((value || []).concat({ ...editedData, id: id, createdFromFront: true, actionTypeEnum: OfflineFormListActionTypeEnum.CREATE, isNew: true }));
      setIsCreate(false);
    }
    setIsCreate(false);
  };

  return (
    <OfflineInplaceEdditingRow
      columns={columns}
      data={data}
      getEditRowData={(row: any) => value?.find((item: any) => item.id === row.id)}
      isCreate={isCreate}
      onSubmit={handleSubmit}
    />
  );
}

export default ManagementAssignmentOfflineRow;
