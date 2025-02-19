'use client'
import React, { useContext } from 'react'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { Button, Drawer } from 'antd';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => setIsOpen(!isOpen);


    const { user } = useContext(AuthContextProvider)

    const router = useRouter();
    return (
        <nav className="flex items-center justify-between bg-white z-20">
            <div className="flex items-center gap-5">
                <h4 onClick={() => router.push('/')} className="text-zinc-800 cursor-pointer font-bold text-xl">لوجو</h4>
                <ul className="hidden md:flex items-center gap-3 text-[#7C7C7C]">
                    <li onClick={() => {
                        router.push('/')
                    }} className='cursor-pointer'>الرئيسية</li>
                    <li onClick={() => {
                        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                    }} className='cursor-pointer'>من نحن</li>
                    <li onClick={() => {
                        document.getElementById('majors').scrollIntoView({ behavior: 'smooth' });
                    }} className='cursor-pointer'>التخصصات</li>
                </ul>
            </div>
            {user?.id ? (
                <button className="hidden md:flex items-center gap-2 text-[#7C7C7C]">
                    <i className="fi fi-rr-user"></i>
                    <p>{user?.first_name} {user?.last_name}</p>
                </button>
            ) : (
                <button className="hidden md:flex items-center gap-2 text-[#7C7C7C]">
                    <i className="-mb-1.5 fi fi-rr-sign-in-alt"></i>
                    <p>تسجيل الدخول</p>
                </button>
            )}
            {/* Mobile Menu */}
            <Drawer
                title="القائمة"
                placement="right"
                onClose={toggleDrawer}
                open={isOpen}
                getContainer={false}
                rootStyle={{ position: 'absolute' }}
            >
                <ul className="flex flex-col gap-4 text-[#7C7C7C]">
                    <li onClick={() => {
                        router.push('/')
                    }} className='cursor-pointer'>الرئيسية</li>
                    <li onClick={() => {
                        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                    }} className='cursor-pointer'>من نحن</li>
                    <li onClick={() => {
                        document.getElementById('majors').scrollIntoView({ behavior: 'smooth' });
                    }} className='cursor-pointer'>التخصصات</li>
                    {user?.id ? (
                        <li className='cursor-pointer'>{user?.first_name} {user?.last_name}</li>
                    ) : (
                        <li onClick={() => router.push('/login')} className='cursor-pointer'>تسجيل الدخول</li>
                    )}
                </ul>
            </Drawer>
            <Button variant="outline" size="sm" onClick={toggleDrawer} className="md:hidden right-0">
                <i className="fi fi-rr-menu-burger"></i>
            </Button>
        </nav>
    )
}

export default Navbar
