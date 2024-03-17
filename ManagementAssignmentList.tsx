import {
    BaseField,
    FixTableCombobox,
    ICodeTypeItem,
    ITableColumn,
    ListDataProvier,
    moment,
    required,
    RowFormButtons,
    Table,
    useList
} from '@agin/react-ui-structure';
import messages from 'i18n/locales';
import { ReactElement, useMemo } from 'react';
import { Field } from 'react-final-form';
import { ManagementAssignment_ENDPOINTS } from '../meta/constants';
import AssignmentComponentDetails from "../../AssignmentComponentDetails/AssignmentComponentDetails";
import ManagementAssignmentRow from './ManagementAssignmentRow';

const ApprovalBasisListColumns: (disabled?: boolean, finalItems?: ICodeTypeItem[], companyId?: number, projectTypeId?: number, isComboboxTable?: boolean) => ITableColumn[] = (disabled?: boolean, finalItems?: ICodeTypeItem[], companyId?: number, projectTypeId?: number, isComboboxTable?: boolean) => [
    {
        field: "counter",
        width: 10,
        title: messages.fa.messages["approval-row-and-assignment"],
        hasSort: false,
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
        width: 8,
        textClassName: 'white-space-nowrap',
        renderField: (row, v) => {
            return <Field name={'baseTitle'}    >
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
        width: 10,
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
        width: 25,
        textClassName: 'white-space-nowrap',

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
        width: 10,
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

        field: 'id',
        title: messages.fa.messages['actions'],
        hasSort: false,
        width: 10,
        render: (v, row, meta) => <RowFormButtons
            handleSubmit={meta?.submit}
            isCreate={meta?.isCreate}
            isEdit={meta?.isEditMode}
            onEdit={meta?.openEdit}
            onCloseEdit={meta?.closeEdit}
            hasDelete={!disabled}
            hasEdit={false}
            deleteUrl={ManagementAssignment_ENDPOINTS.delete(row?.projectAssignmentId)}
            id={v}
        />
    }
]

interface Props {
    disabled?: boolean;
    data?: ICodeTypeItem[];
    companyId?: number,
    isComboboxTable?: boolean,
    projectTypeId?: number
}


function ManagementAssignmentList({
    data: postData,
    disabled,
    companyId,
    isComboboxTable,
    projectTypeId
}: Props): ReactElement {
    const { data } = useList()
    const finalItems: any = useMemo(() => postData?.filter(item => {
        if (item?.id === 337 || item?.id === 336) {
            return true
        }
        return data?.map(item => item?.postId).includes(item.id) === false
    }).map(item => {
        return { ...item, id: item.id, label: item.farsiTitle }
    }) ?? [], [data, postData])

    const columns = useMemo(() => ApprovalBasisListColumns(disabled, finalItems, companyId, projectTypeId, isComboboxTable), [disabled, finalItems]);

    return (
        <ListDataProvier>
            <Table
                hasRowData
                rowComponent={ManagementAssignmentRow}
                className='horizontal-scroll-table'
                columns={columns}
                data={[]}
                hasFooterRefresh={false}

            />
        </ListDataProvier>
    )

}

export default ManagementAssignmentList
