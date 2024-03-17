import {
    BaseField,
    Button,
    Combobox,
    ComboboxItemsDataGetter,
    Datepicker,
    moment,
    Observer,
    required,
    Submitter,
    TextCore,
    toFixed,
    useDataGetter,
    useTabular,
    WhenFieldChanges
} from '@agin/react-ui-structure';
import CheckButtonIcon from 'components/CheckButtonIcon/CheckButtonIcon';
import CloseButtonIcon from 'components/CloseButtonIcon/CloseButtonIcon';
import { tabularKeys } from 'constants/tabularConfig';
import { Fragment, useRef } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { DocumentContentType } from "../../constants/DocumentContentType";
import { PERMISSIONS } from "../../constants/permissions";
import CompanyDocument from "../CompanyDocument/CompanyDocument";
import ContractsRelatedProject from "../ContractsRelatedProject/ContractsRelatedProject";
import ControlReports from "../ControlReports/ControlReports";
import ExecutiveRisks from "../ExecutiveRisks/ExecutiveRisks";
import GoalsImplemantionProjects from "../GoalsImplemantionProjects/GoalsImplemantionProjects";
import GroupAssignment from "../GroupAssignment/GroupAssignment";
import ProjectManagementTeam from "../ProjectManagementTeam/ProjectManagementTeam";
import ProjectPhases from "../ProjectPhases/ProjectPhases";
import SchedulingForcastCost from "../SchedulingForcastCost/SchedulingForcastCost";
import { ProjectFormsContext } from "./context/ProjectsFormContext";
import {
    firstCurrencyType_ENDPOINTS,
    PROJECT_Grouping_Assignment_ENDPOINTS,
    projectDocument_ENDPOINT,
    ProjectDocumentType_ENDPOINTS,
    Projects_ENDPOINT,
    projectType_ENDPOINTS
} from './meta/constants';
import { inParser, outParser } from "./meta/utils";
import { Field } from "react-final-form";
import { EMPTY_ARRAY } from "../../utils/utils";
import ProjectAssignmentOffline from "../ProjectAssignmentOffline/ProjectAssignmentOffline";
import ProjectAssignment from "../ProjectAssignment/ProjectAssignment";
import CompanyInfo from 'pages/CompanyInfo/CompanyInfo';

const messages = defineMessages({
    successfulyRegistered: {
        id: 'successfuly-registered',
        defaultMessage: 'successfuly-registered'
    },
    projectType: {
        id: 'project-type',
        defaultMessage: 'project-type'
    },
    firstCurrencyType: {
        id: 'first-currency-type',
        defaultMessage: 'first-currency-type'
    },
    secondCurrencyType: {
        id: 'second-currency-type',
        defaultMessage: 'second-currency-type'
    },
    partyContract: {
        id: 'party-contract',
        defaultMessage: 'party-contract'
    },
    projectStartDate: {
        id: 'project-start-date',
        defaultMessage: 'project-start-date'
    },
    generalTermsOfTheContract: {
        id: 'general-terms-of-the-contract',
        defaultMessage: 'general-terms-of-the-contract'
    },
    projectTitle: {
        id: 'project-title',
        defaultMessage: 'project-title'
    },
    contractNumber: {
        id: 'contract-number',
        defaultMessage: 'contract-number'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    reasonForTermination: {
        id: 'reason-for-termination',
        defaultMessage: 'reason-for-termination'
    },
})

type Props = {
    url?: string;
    realData?: any;
    disabled?: boolean;
    companyId?: number;
    fetch?: any;
}


function ProjectsForm({
    url = Projects_ENDPOINT.create,
    realData: data,
    disabled,
    companyId,
    fetch
}: Props) {
    const { add, closeCurrentTab, params } = useTabular()
    const intl = useIntl();
    const { fetch: fetchComputational, data: dataComputational } = useDataGetter({
        url: Projects_ENDPOINT.computational(data?.id),
        fetchFirst: data?.id ? true : false
    })
    const observerRef = useRef(new Observer())

    return (
        <>
            {params?.companyId && <CompanyInfo
                companyId={params?.companyId}
            />}
            <Submitter
                outParser={(values) => outParser({...values,companyId })}
                inParser={inParser}
                url={url}
                disabled={disabled}
                data={data}
                onSuccess={(values) => {
                    if (!data?.id) {
                        add(tabularKeys.PROJECTS_EDIT, {
                            id: values?.id,
                            companyId: values?.companyId
                        })
                        closeCurrentTab()
                    } else {
                        fetch()
                    }
                }}
            >
                {({
                    values,
                    form
                }) => {
                    return (<Fragment>
                        <div className="d-flex flex-wrap">
                            <BaseField
                                component={TextCore}
                                name="title"
                                label={intl.formatMessage(messages.projectTitle)}
                                fieldClassName="text-align-center"
                                className="col-4"
                                validate={disabled ? () => { } : required(intl.formatMessage(messages.projectTitle))}
                                disabled={disabled}
                                maxLength={150}
                            />
                            <ComboboxItemsDataGetter
                                url={projectType_ENDPOINTS}
                                keyField="id"
                                labelField="farsiTitle"
                            >
                                <BaseField
                                    component={Combobox}
                                    name="projectType"
                                    label={intl.formatMessage(messages.projectType)}
                                    validate={disabled ? () => { } : required(intl.formatMessage(messages.projectType))}
                                    fieldClassName="text-align-center"
                                    className="col-4 pr-2"
                                    disabled={disabled || (values?.projectAssignmentOffline?.length > 0)}
                                />
                            </ComboboxItemsDataGetter>
                            <BaseField
                                component={Datepicker}
                                name="startDate"
                                label={intl.formatMessage(messages.projectStartDate)}
                                validate={disabled ? () => { } : required(intl.formatMessage(messages.projectStartDate))}
                                disabled={data?.id && dataComputational?.firstForecastCost ? true : false}
                                fieldClassName="text-align-center"
                                className="col-4 pr-2"
                            />

                            <ComboboxItemsDataGetter
                                url={firstCurrencyType_ENDPOINTS}
                                keyField="id"
                                labelField="farsiTitle"
                                selecteFirstAsDefault
                            >
                                <BaseField
                                    component={Combobox}
                                    name="firstCurrency"
                                    label={intl.formatMessage(messages.firstCurrencyType)}
                                    validate={disabled ? () => { } : required(intl.formatMessage(messages.firstCurrencyType))}
                                    fieldClassName="text-align-center"
                                    className="col-4 pr-2 pt-2"
                                    disabled={data?.id && dataComputational?.firstForecastCost ? true : false}
                                />
                            </ComboboxItemsDataGetter>

                            <WhenFieldChanges
                                field={"firstCurrency"}
                                becomes={null}
                                actionType={"empty"}
                                set={"secondCurrency"}
                                to={null}
                            />

                            <ComboboxItemsDataGetter
                                url={firstCurrencyType_ENDPOINTS}
                                keyField="id"
                                labelField="farsiTitle"
                                isNeedToFetch={() => values?.firstCurrency?.id}
                                hasCache={false}
                                params={{ id: values?.firstCurrency?.id }}
                            >
                                <BaseField
                                    component={Combobox}
                                    name="secondCurrency"
                                    label={intl.formatMessage(messages.secondCurrencyType)}
                                    fieldClassName="text-align-center"
                                    className="col-4 pr-2 pt-2 pr-2"
                                    disabled={data?.id && dataComputational?.firstForecastCost ? true : false}
                                    hasClear
                                />
                            </ComboboxItemsDataGetter>
                        </div>
                        <div className="col-12 mt-5">
                            {!data?.id ?
                                (<Field
                                    component={ProjectAssignmentOffline}
                                    name={'projectAssignmentOffline'}
                                    defaultValue={EMPTY_ARRAY}
                                    companyId={values?.nationalCode?.id}
                                    projectTypeId={values?.projectType?.id}
                                    disableCreate={!values?.projectType?.id}
                                />) : (
                                    <ProjectAssignment companyId={companyId} disabled={disabled} projectId={data?.id} projectTypeId={values?.projectType?.id} />
                                )
                            }
                        </div>

                        <div className="d-flex flex-direction-row-reverse pt-4">
                            {!disabled && <Button
                                color="green"
                                type="submit"
                                role="saveButton"
                                className="mr-3"
                                left={<CheckButtonIcon />}
                            >
                                <FormattedMessage id="save" defaultMessage="save" />
                            </Button>}
                            <Button color='red' type="button" className='ml-2' left={<CloseButtonIcon className="mt-1" />} onClick={() => { closeCurrentTab() }}>
                                <FormattedMessage id="close" defaultMessage="close" />
                            </Button>
                        </div>
                        {
                            data?.id &&
                            <div className="col-12">
                                <div className="pt-4 d-flex">
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="cost-forecast-currency"
                                                defaultMessage="cost-forecast-currency"
                                            />
                                            ({dataComputational?.firstCurrencyTitle ? dataComputational?.firstCurrencyTitle : data?.firstCurrency?.farsiTitle})
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.firstForecastCost && dataComputational?.firstForecastCost.toLocaleString()}
                                        />
                                    </div>
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="realization-cost-currency"
                                                defaultMessage="realization-cost-currency"
                                            />
                                            ({dataComputational?.firstCurrencyTitle ? dataComputational?.firstCurrencyTitle : data?.firstCurrency?.farsiTitle})
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.firstAchievementCost && dataComputational?.firstAchievementCost.toLocaleString()}
                                        />
                                    </div>
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="end-date-programing"
                                                defaultMessage="end-date-programing"
                                            />
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.endScheduledDate && moment(dataComputational?.endScheduledDate).format('jYYYY-jMM-jDD')}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 d-flex ">
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="cost-forecast-currency"
                                                defaultMessage="cost-forecast-currency"
                                            />
                                            ({dataComputational?.secondCurrencyTitle ? dataComputational?.secondCurrencyTitle : data?.secondCurrency?.farsiTitle})
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.secondForecastCost && dataComputational?.secondForecastCost.toLocaleString()}
                                        />
                                    </div>
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="realization-cost-currency"
                                                defaultMessage="realization-cost-currency"
                                            />
                                            ({dataComputational?.secondCurrencyTitle ? dataComputational?.secondCurrencyTitle : data?.secondCurrency?.farsiTitle})
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.secondAchievementCost && dataComputational?.secondAchievementCost.toLocaleString()}
                                        />
                                    </div>
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="end-date-real"
                                                defaultMessage="end-date-real"
                                            />
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.endRealDate && moment(dataComputational?.endRealDate).format('jYYYY-jMM-jDD')}

                                        />
                                    </div>
                                </div>
                                <div className="pt-2 d-flex ">
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="percentage-programing"
                                                defaultMessage="percentage-programing"
                                            />
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.weightScheduledGainPercentage && toFixed(dataComputational?.weightScheduledGainPercentage, 2)}
                                        />
                                    </div>
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="percentage-improve"
                                                defaultMessage="percentage-improve"
                                            />
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.weightRealGainPercentage && toFixed(dataComputational?.weightRealGainPercentage, 2)}
                                        />
                                    </div>
                                    <div className="form-group col-4 pr-2 mt-2">
                                        <label>
                                            <FormattedMessage
                                                id="Percentage-deviation-plan"
                                                defaultMessage="Percentage-deviation-plan"
                                            />
                                        </label>
                                        <TextCore
                                            disabled
                                            inputClassName="text-center"
                                            value={dataComputational?.deviationPercentage && toFixed(dataComputational?.deviationPercentage, 2)}
                                        />
                                    </div>
                                </div>
                            </div>
                        }

                    </Fragment>)
                }}
            </Submitter>
            {data?.id &&
                <div>


                    <div className="pt-8">
                        {data?.id && <GoalsImplemantionProjects projectId={data?.id} disabled={disabled} />}
                    </div>
                    <div className="pt-8">
                        {data?.id && <ProjectManagementTeam projectId={data?.id} disabled={disabled} />}
                    </div>
                    <ProjectFormsContext.Provider value={{ observer: observerRef.current }}>
                        <div className="pt-8">
                            {data?.id && <ProjectPhases projectId={data?.id} disabled={disabled} />}
                        </div>
                        <div className="pt-8">
                            {data?.id && <SchedulingForcastCost projectId={data?.id} fetchComputational={fetchComputational}
                                firstCurrencyTitle={dataComputational?.firstCurrencyTitle}
                                secondCurrencyTitle={dataComputational?.secondCurrencyTitle}
                                hasView={disabled} />}
                        </div>
                    </ProjectFormsContext.Provider>
                    <div className="pt-8">
                        {data?.id && <ExecutiveRisks projectId={data?.id} disabled={disabled} />}
                    </div>
                    <div className="pt-8">
                        {data?.id && <ContractsRelatedProject projectId={data?.id} hasView={disabled} />}
                    </div>
                    <div className="pt-8">
                        {data?.id && <ControlReports projectId={data?.id} hasView={disabled} />}
                    </div>
                    <div className="pt-4">
                        {data?.id && <GroupAssignment url={PROJECT_Grouping_Assignment_ENDPOINTS} groupingAssignmentType={''} data={data} hasView={disabled} />}
                    </div>
                    <div className="pt-8">
                        {data?.id && <CompanyDocument contentId={data?.id}
                            contentType={DocumentContentType.PROJECT_DOCUMENT}
                            searchKey={PERMISSIONS.COMPANY}
                            documentTypeComboUrl={ProjectDocumentType_ENDPOINTS}
                            url={projectDocument_ENDPOINT}
                            hasView={disabled} />}
                    </div>
                </div>
            }
        </>
    )
}
export default ProjectsForm
