export const BASE_URL = 'http://localhost:8000'

// utils/apiPaths.js
export const API_PATHS ={
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/user'
    },
    DASHBOARD: {
        GET_DATA: '/api/v1/user'
    },
    INCOME: {
        ADD: '/api/v1/income/add',
        GET: '/api/v1/income/get',
        DELETE: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD: '/api/v1/income/downloadexcel'
    },
    EXPENSE: {
         ADD: '/api/v1/expense/add',
         GET: '/api/v1/expense/get',
         DELETE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
         DOWNLOAD: '/api/v1/expense/downloadexcel'
    },
    IMAGE: {
        UPLOAD_IMAGE: '/api/v1/auth/upload-image'
    }
}