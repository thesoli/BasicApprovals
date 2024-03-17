import { CacheContainer, DataLoader, DialogContainer, ListContainer, useDataGetter } from '@agin/react-ui-structure'
import { Fragment, ReactElement } from 'react'
import ManagementAssignmentHeader from './components/ManagementAssignmentHeader'
import ManagementAssignmentList from './components/ManagementAssignmentList'
import { ManagementAssignment_ENDPOINTS } from './meta/constants'
import './assets/CompanyManagmentMember.scss'
import { POST_CODE_TYPE_ITEMS } from 'constants/endpoints'
import { ManagementAssignmentContext } from "./context/ManagementAssignmentContext";


interface Props {
    disabled?: boolean;
    projectId?: number,
    projectTypeId?: number
    companyId?: number
}

function ManagementAssignment({
    disabled,
    projectId,
    projectTypeId,
    companyId
}: Props): ReactElement {
    const { data, loading } = useDataGetter({ url: POST_CODE_TYPE_ITEMS })


    return (
        <Fragment>
            <DataLoader data={data} loading={loading}>
                <ManagementAssignmentContext.Provider value={{ projectId: projectId }}>
                    <CacheContainer>
                        <DialogContainer>
                            <ListContainer body={{ projectId: projectId }} url={ManagementAssignment_ENDPOINTS.list}>
                                <Fragment>
                                    <ManagementAssignmentHeader disabled={disabled} />
                                    <ManagementAssignmentList data={data?.resultList} disabled={disabled} projectTypeId={projectTypeId} />
                                </Fragment>
                            </ListContainer>
                        </DialogContainer>
                    </CacheContainer>
                </ManagementAssignmentContext.Provider>
            </DataLoader>
        </Fragment >
    )
}

export default ManagementAssignment