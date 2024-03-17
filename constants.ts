export const ManagementAssignment_ENDPOINTS = {
    list: `/managementAssignment/list`,
    post: '/managementAssignment/create',
    put: '/managementAssignment/update',
    get: (id: any) => `/managementAssignment/get/${id}`,
    delete: (id: any) => `/managementAssignment/delete/${id}`
}
