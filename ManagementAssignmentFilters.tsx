import React, { ReactElement } from 'react'
import { Form } from 'react-final-form'
import { defineMessages, useIntl } from 'react-intl'
import { BaseField, Button, TextCore, useList } from '@agin/react-ui-structure'

const messages = defineMessages({
    firstName: {
        id: 'first-name',
        defaultMessage: 'first-name'
    },
    lastName: {
        id: 'last-name',
        defaultMessage: 'last-name'
    }
})

function ManagementAssignmentFilters(): ReactElement {
    const { setFilters, clearFilters, hasFilter, saveFilters, filters } = useList()
    const intl = useIntl()
    return (
        <Form
            initialValues={filters}
            onSubmit={(values = {}) => {
                setFilters(values)
                saveFilters(values)
            }}
            render={({ handleSubmit, values, form: { reset } }) => {
                return <form onSubmit={handleSubmit} className="d-flex flex-wrap">
                    <div className="col-12 col-sm-2">
                        <BaseField
                            label={intl.formatMessage(messages.firstName)}
                            component={TextCore}
                            name="personFirstName"
                        />
                    </div>
                    <div className="col-12 col-sm-2">
                        <BaseField
                            label={intl.formatMessage(messages.lastName)}
                            component={TextCore}
                            name="personLastName"
                        />
                    </div>
                    <Button
                        circle
                        className="mr-2"
                        style={{ marginTop: 22 }}
                        color="blue"
                        left={<i className="fal fa-search" />}
                    />
                    {hasFilter && <Button
                        circle
                        type="button"
                        onClick={() => {
                            reset();
                            clearFilters && clearFilters();
                        }}
                        className="mr-2"
                        style={{ marginTop: 22 }}
                        color="red"
                        left={<i className="fal fa-times" />}
                    />}
                </form>
            }}
        />
    )
}

export default ManagementAssignmentFilters
