import { createContext } from 'react';
import { IApprovalBasisOfflineContext } from './meta/type';


export const ManagementAssignmentOfflineContext = createContext<IApprovalBasisOfflineContext>({
    setIsCreateOpen: () => { },
    isCreateOpen: false
});
