import {
  BaseField,
  FixTableCombobox,
  ITableColumn,
  moment,
  OfflineInplaceEdditingContext,
  OfflineInplaceEdditingRowButtons,
  required,
  Table
} from "@agin/react-ui-structure";
import { OfflineFormListActionTypeEnum } from "enum/OfflineFormListActionTypeEnum";
import messages from "i18n/locales";
import { ReactElement, useCallback, useContext, useMemo } from "react";
import { Field } from "react-final-form";
import "../assets/ManagementAssignmentOffline.scss";
import AssignmentComponentDetails from "../../AssignmentComponentDetails/AssignmentComponentDetails";
import ManagementAssignmentOfflineRow from './ManagementAssignmentOfflineRow';


interface Props {
  companyId?: number,
  hasView?: boolean;
  isComboboxTable?: boolean;
  projectTypeId?: number

}

function ManagementAssignmentOfflineList({
  projectTypeId,
  companyId,
  isComboboxTable,
  hasView,
}: Props): ReactElement {
  const { isCreate, value, setValue } = useContext(OfflineInplaceEdditingContext)

  const handleDelete = useCallback(
    (id: number) => {
      let newList = [...(value || [])];
      const index = newList?.findIndex((item: any) => item?.id === id);
      if (index || index === 0) {
        newList[index].actionTypeEnum = OfflineFormListActionTypeEnum.DELETE;
        setValue(newList);
      }
    },
    [setValue, value, projectTypeId]
  );



  const CAPITAL_TYPE_COLUMNS = useMemo<ITableColumn[]>(
    () => [
      {
        field: "counter",
        width: 0.8,
        title: messages.fa.messages["approval-row-and-assignment"],
        hasSort: false,
        render: (v, row) => row?.baseTitle?.counter,
        renderField: () =>
          <BaseField
            hasRedStar={false}
            component={FixTableCombobox}
            name='baseTitle'
            position={'right'}
            width={800}
            validate={required(messages.fa.messages["approval-row-and-assignment"])}
            getTitle={(v: any) => {
              return (v?.counter) ? `${v?.counter}` : undefined;
            }}
          >
            <AssignmentComponentDetails isInProject isComboboxTable={isComboboxTable} companyId={companyId} projectTypeId={projectTypeId} />
          </BaseField>

      },
      {
        field: 'code',
        title: messages.fa.messages["no-number"],
        hasSort: false,
        width: 0.7,
        textClassName: 'white-space-nowrap',
        render: (v, row) => row?.baseTitle?.code,
        renderField: () => {
          return <Field name={'baseTitle'}>
            {({ input }) => {
              const v = input.value;
              const finalVale = v?.code;
              return finalVale
            }}
          </Field>
        }
      },
      {
        field: "date",
        width: 0.8,
        title: messages.fa.messages["date"],
        hasSort: false,
        render: (v, row) => moment(row?.baseTitle?.date).format("jYYYY-jMM-jDD"),
        renderField: () => {
          return <Field name={'baseTitle'}    >
            {({ input }) => {
              const v = input.value;
              return v ? moment(v?.date).format("jYYYY-jMM-jDD") : ''
            }}
          </Field>
        }


      },
      {
        field: 'description',
        title: messages.fa.messages["description-of-the-resolution-and-assignment"],
        hasSort: false,
        width: 2,
        textClassName: 'white-space-nowrap',
        render: (v, row) => row?.baseTitle?.description,
        renderField: () => {
          return <Field name={'baseTitle'}    >
            {({ input }) => {
              const v = input.value;
              return v?.description
            }}
          </Field>
        }
      },
      {
        field: "executionDeadline",
        width: 0.8,
        title: messages.fa.messages["executionDeadline"],
        hasSort: false,
        render: (v, row) => moment(row?.baseTitle?.executionDeadline).format("jYYYY-jMM-jDD"),
        renderField: () => {
          return <Field name={'baseTitle'}    >
            {({ input }) => {
              const v = input.value;
              return v ? moment(v?.executionDeadline).format("jYYYY-jMM-jDD") : '';
            }}
          </Field>
        }
      },

      {

        field: "id",
        width: 1,
        fixed: true,
        title: messages.fa.messages["actions"],
        hasSort: false,
        render: (v, row, meta) => (
          <div className="d-flex align-items-center justify-content-center">
            <OfflineInplaceEdditingRowButtons
              onEdit={meta?.openEdit}
              isCreate={meta?.isCreate}
              isEdit={meta?.isEditMode}
              handleSubmit={meta?.submit}
              onDelete={handleDelete}
              onCloseEdit={meta?.closeEdit}
              hasDelete={row?.isNew ? true : false}
              id={v}
            />
          </div>
        ),
      },
    ],
    [handleDelete]
  );


  return (
    <Table
      hasRowData
      rowComponent={ManagementAssignmentOfflineRow}
      columns={CAPITAL_TYPE_COLUMNS}
      className='horizontal-scroll-tabel-offline-member-management'
      data={value?.filter(item => item.actionTypeEnum !== 'DELETE') || []}
      isInPlaceCreate={isCreate}
    ></Table>
  );
}

export default ManagementAssignmentOfflineList;