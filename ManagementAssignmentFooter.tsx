import { Button, useList } from '@agin/react-ui-structure'
import React, { ReactElement } from 'react'

function ManagementAssignmentFooter(): ReactElement {
    const { fetch } = useList()
    return (
        <div className="d-flex flex-direction-row-reverse px-2">
            <Button onClick={() => fetch()}>
                <i className="fal fa-sync" style={{ fontSize: 15 }} />
            </Button>
        </div>
    )
}

export default ManagementAssignmentFooter
