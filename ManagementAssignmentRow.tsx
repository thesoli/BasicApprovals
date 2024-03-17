import { ITableColumn, RowEditing, useDataGetter, useSnackbar, useTabular } from '@agin/react-ui-structure';
import { useCallback, useContext } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { ManagementAssignment_ENDPOINTS } from '../meta/constants';
import { companyManagmentRowInParser } from '../meta/utils';
import { ManagementAssignmentContext } from "../context/ManagementAssignmentContext";


const messages = defineMessages({
    successfulyRegistered: {
        id: 'successfuly-registered',
        defaultMessage: 'successfuly-registered'
    }
})

type Props = {
    data: any;
    columns: ITableColumn[];
    isCreate?: boolean;

}

function ManagementAssignmentRow({
    columns,
    data,
    isCreate,
}: Props) {

    const {
        projectId
    } = useContext(ManagementAssignmentContext);


    const {
        fetch: post
    } = useDataGetter({
        url: ManagementAssignment_ENDPOINTS.post,
        fetchFirst: false
    })

    const intl = useIntl()
    const { params } = useTabular()
    const snackbar = useSnackbar()

    const id = params?.id;
    const handleSubmit = useCallback((values: any) => {
        return post(null, {
            id: values?.id,
            projectId: projectId,
            assignmentComponentId: values?.baseTitle?.id
        }, values?.id ? ManagementAssignment_ENDPOINTS.put : ManagementAssignment_ENDPOINTS.post)
            .then(() => {
                snackbar.display({ type: "success", message: intl.formatMessage(messages.successfulyRegistered) });
                return Promise.resolve()
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    }, [id, intl, post, snackbar])

    return (
        <RowEditing
            columns={columns}
            data={data}
            inParser={companyManagmentRowInParser}
            isCreate={isCreate}
            onSubmit={handleSubmit}
            getOneEndpoint={ManagementAssignment_ENDPOINTS.get}
        />
    )
}

export default ManagementAssignmentRow