import { createContext } from 'react';
import { IManagementAssignmentContext } from './meta/type';


export const ManagementAssignmentContext = createContext<IManagementAssignmentContext>({
    projectId: 0,

});
