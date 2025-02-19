'use client'
import { AuthContextProvider } from '@/contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'


const page = () => {
    const {
        email, setEmail,
        password, setPassword,
        first_name, setFirstName,
        last_name, setLastName,
        role, setRole,
        loading, registerVerify,
        code, setCode,
        open, googleLogin,
        contextHolder, register,
    } = React.useContext(AuthContextProvider);
    const router = useRouter()
    return (
        <div className='h-screen flex items-center gap-5'>
            {contextHolder}
            {/* right */}
            <div className='flex flex-col gap-4 md:w-1/2 w-full h-full justify-center p-5'>
                <div className='flex flex-col justify-center items-center mx-auto'>
                    <h3 className='text-xl font-bold mb-1'>لا تعلم من اين تبدأ؟</h3>
                    <p className='text-sm text-[#6C6C6C] w-full max-w-lg mx-auto text-center'>
                        سجل دخولك ولا تشتت نفسك... احصل على جميع المعلومات اللازمة لتحقيق هدف قوي ومستقر
                    </p>
                </div>
                <br />
                <br />
                {/* form */}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (loading) {

                    } else {
                        registerVerify()
                    }
                }} className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col w-full gap-2'>
                        <p className='text-[#3D3D3D] text-sm'>البريد الإلكتروني</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Ex. youremail@gmail.com' className='p-1.5 rounded-lg bg-[#EAEAEA]' />
                    </div>
                    <div className='w-full flex items-center gap-5'>
                        <div className='w-1/2 flex flex-col gap-2'>
                            <p className='text-[#3D3D3D] text-sm'>الاسم الاول</p>
                            <input onChange={(e) => setFirstName(e.target.value)} value={first_name} type="text" placeholder='Ex. youssef' className='p-1.5 rounded-lg bg-[#EAEAEA]' />
                        </div>
                        <div className='w-1/2 flex flex-col gap-2'>
                            <p className='text-[#3D3D3D] text-sm'>الاسم الاخير</p>
                            <input onChange={(e) => setLastName(e.target.value)} value={last_name} type="text" placeholder='Ex. shreef' className='p-1.5 rounded-lg bg-[#EAEAEA]' />
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <p className='text-[#3D3D3D] text-sm'>كلمة المرور</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='p-1.5 rounded-lg bg-[#EAEAEA]' />
                    </div>
                    <div className='flex items-center gap-5 justify-between'>
                        <div className='flex items-center gap-1'>
                            <p className='text-[#3D3D3D] text-sm'>لديك حساب؟, </p>
                            <p onClick={() => router.push('/login')} className='text-[#5470ff] text-sm cursor-pointer'>سجل الدخول</p>
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
            {/* left */}
            <div className='w-1/2 h-full overflow-hidden md:block hidden relative flex-col justify-center'>
                <img src="/images/register-image.png" alt="" className='w-full absolute top-1/2 -translate-y-1/2' />
            </div>



            {/* dialog */}
            <Modal
                title={<p className='cairo font-bold'>تم ارسال كود التحقق</p>}
                centered
                okText="تسجيل"
                cancelText={'ارسال الكود مره اخرى'}
                closable={false}
                open={open}
                onOk={() => {
                    register()
                }}
            >
                <div className="space-y-4 cairo mt-5">
                    {/* <div className="space-y-2">
                        <p className='text-gray-500 text-sm'>نوع الحساب</p>
                        <select className='bg-gray-100 w-full p-1.5' onChange={(e) => setRole(e.target.value)} value={role}>
                            <option value="student">طالب</option>
                            <option value="university">جامعة</option>
                        </select>
                    </div> */}
                    <div className="space-y-2">
                        <p className='text-gray-500 text-sm'>اكتب كود التحقق</p>
                        <input onChange={(e) => setCode(e.target.value)} value={code} type="text" className='bg-gray-100 w-full p-1.5' />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default page
