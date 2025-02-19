'use client'
import { AuthContextProvider } from '@/contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
    const { contextHolder, email, setEmail, password, setPassword, loading, login } = React.useContext(AuthContextProvider);
    const router = useRouter()
    return (
        <div className='h-screen flex items-center gap-5'>
            {contextHolder}
            {/* right */}
            <div className='w-1/2 h-full overflow-hidden md:block hidden relative flex-col justify-center'>
                <img src="/images/login-image.png" alt="" className='w-full absolute top-1/2 -translate-y-1/2' />
            </div>
            {/* left */}
            <div className='flex flex-col gap-4 md:w-1/2 w-full h-full justify-center p-5'>
                <div className='flex flex-col justify-center items-center mx-auto'>
                    <h3 className='text-xl font-bold mb-1'>اهلا بك مجددا, قم بتسجيل الدخول</h3>
                    <p className='text-sm text-[#6C6C6C] w-full max-w-lg mx-auto text-center'>
                        سجل دخولك وقم بوضع اراءك في التخصصات, استكشاف المزيد من الجامعات العالمية ومعرفه جميع مواصفاتها
                    </p>
                </div>
                <br />
                <br />
                {/* form */}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (loading) {

                    } else {
                        login()
                    }
                }} className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col w-full gap-2'>
                        <p className='text-[#3D3D3D] text-sm'>البريد الإلكتروني</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Ex. youremail@gmail.com' className='p-1.5 rounded-lg bg-[#EAEAEA]' />
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <p className='text-[#3D3D3D] text-sm'>كلمة المرور</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='p-1.5 rounded-lg bg-[#EAEAEA]' />
                    </div>
                    <div className='flex items-center gap-5 justify-between'>
                        <div className='flex items-center gap-1'>
                            <p className='text-[#3D3D3D] text-sm'>ليس لديك حساب؟,</p>
                            <p onClick={() => router.push('/register')} className='text-[#5470ff] text-sm cursor-pointer'>انشئ حساب جديد</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <p className='text-[#5470ff] text-sm cursor-pointer'>نسيت كلمة المرور</p>
                        </div>
                    </div>
                    <button className='btn-black'>
                        {loading ? (
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">جاري التحميل...</span>
                            </div>
                        ) : (
                            <p>تسجيل</p>
                        )}
                    </button>

                    {/* gogole */}
                    <hr className='my-4' />
                    <div className='flex flex-col gap-2 text-center'>
                        <p>او قم بإستخدام</p>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                googleLogin(credentialResponse.credential)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
