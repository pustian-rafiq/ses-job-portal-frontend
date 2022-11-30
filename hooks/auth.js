import useSWR from 'swr'
// import axios from "axios";s
import axios from '../lib/axios';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('http://52.68.248.212:8001/api/candidate/auth/me', () =>
        axios
            .get('http://52.68.248.212:8001/api/candidate/auth/me')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                // router.push('/auth/login')
            }),
    );

    const csrf = () => axios.get('http://52.68.248.212:8001/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response => router.push('/login?reset=' + btoa(response.data.status)))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (! error) {
            await axios
                .post('/logout')
                .then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    const loginPage = async () => {
        window.location.pathname = '/auth/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
        if (window.location.pathname === "/verify-email" && user?.email_verified_at) router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) {
            router.push('/auth/login');
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}