'use client'
import { server } from '@/app/server'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'
import { message } from 'antd'

const AuthContext = ({ children }) => {
    const router = useRouter()

    const [messageApi, contextHolder] = message.useMessage();

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')

    const [code, setCode] = useState('')

    const [role, setRole] = useState('student')

    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        setLoading(false)
    }, [])

    const login = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${server}api/login/`, {
                email,
                password
            })
            localStorage.setItem('token', res.data.token)
            router.push('/search/')
            // if (res.data.user.role == 'student') {
            // }
            // if (res.data.user.role == 'universty') {
            // }
            messageApi.open({
                type: 'success',
                content: 'تم تسجيل الدخول بنجاح',
            });
        } catch (err) {
            console.log(err)
            if (err.response.status === 400) {
                messageApi.open({
                    type: 'error',
                    content: 'تحقق من بيانات الدخول',
                });
            }
        } finally {
            setLoading(false)
        }
    }

    const [open, setOpen] = useState(false)

    const registerVerify = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${server}api/register-verify/`, {
                email,
                first_name,
                last_name,
                password
            })
            setOpen(true)
        } catch (err) {
            console.log(err)
            if (err.response.status === 400) {
                if (err.response.data.email) {
                    messageApi.open({
                        type: 'error',
                        content: 'هذا البريد الالكتروني مستخدم بالفعل',
                    });
                    return
                }
                messageApi.open({
                    type: 'error',
                    content: 'تأكد ان الخانات صحيحة',
                });
            }
        } finally {
            setLoading(false)
        }
    }


    const register = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${server}api/register/`, {
                email,
                first_name,
                last_name,
                password,
                role,
                code
            })
            messageApi.open({
                type: 'success',
                content: 'تم التسجيل بنجاح',
            });
            localStorage.setItem('token', res.data.token)
            router.push('/search/')
            // if (res.data.user.role == 'student') {
            // }
            // if (res.data.user.role == 'universty') {
            // }
        } catch (err) {
            console.log(err)
            if (err.response.status === 400) {
                if (err.response.data.message) {
                    messageApi.open({
                        type: 'error',
                        content: 'رمز التحقق غير صحيح',
                    });
                    return
                }
                messageApi.open({
                    type: 'error',
                    content: 'تأكد ان الخانات صحيحة',
                });
            }
        } finally {
            setLoading(false)
        }
    }


    const googleLogin = async (token) => {
        try {
            setLoading(true)
            const res = await axios.post(`${server}api/google-auth/`,
                { token }
            )
            localStorage.setItem('token', res.data.token)
            router.push('/search/')
            // if (res.data.user.role == 'student') {
            // }
            // if (res.data.user.role == 'universty') {
            // }
            messageApi.open({
                type: 'success',
                content: 'تم تسجيل الدخول بنجاح',
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }



    const [user, setUser] = useState(null)
    const getUser = async () => {
        try {
            const res = await axios.get(`${server}api/user/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            setUser(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        console.log('getting the user');
        getUser()
    }, [])
    return (
        <AuthContextProvider.Provider value={{
            email, setEmail,
            password, setPassword,
            first_name, setFirstName,
            last_name, setLastName,
            role, setRole,
            open, setOpen,
            registerVerify, register,
            loading, setLoading,
            login, code, setCode,
            googleLogin,
            contextHolder,

            user
        }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext
export const AuthContextProvider = createContext()
