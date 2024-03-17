import { Button, ListHeader, useList } from '@agin/react-ui-structure';
import { Fragment, ReactElement, useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ManagementAssignmentFilters from './ManagementAssignmentFilters';

const messages = defineMessages({
    title: {
        id: 'approval-basis',
        defaultMessage: 'approval Basis'
    }
})

interface Props {
    disabled?: boolean;
}

function ManagementAssignmentHeader({
    disabled
}: Props): ReactElement {
    const filters = useMemo(() => <ManagementAssignmentFilters />, [])
    const { setIsInPlaceCreate } = useList()
    const intl = useIntl()
    return (
        <ListHeader
            title={intl.formatMessage(messages.title)}
            filters={filters}
            hasFilter={false}
            buttons={<Fragment>
                {!disabled && <Button
                    circle
                    left={<i className='fal fa-plus' style={{ fontSize: 17 }} />}
                    color='green'
                    type="button"
                    onClick={() => { setIsInPlaceCreate(true) }}
                />}
            </Fragment>}
        />
    )
}

export default ManagementAssignmentHeader
