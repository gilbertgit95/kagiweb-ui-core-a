import Rest from './baseConnection'

const signIn = async ({ formData }) => {
    return await Rest({
        method: 'POST',
        url: '/api/v1/auth/login',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

const signOut = async () => {
    return await Rest({
        method: 'POST',
        url: '/api/v1/auth/logout'
    })
}

const forgotRequest = async ({ formData }) => {
    return await Rest({
        method: 'POST',
        url: '/api/v1/auth/passwordResetCode',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

const resetPassword = async ({ formData }) => {
    return await Rest({
        method: 'POST',
        url: '/api/v1/auth/passwordReset',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export default {
    signIn,
    signOut,
    forgotRequest,
    resetPassword
}
