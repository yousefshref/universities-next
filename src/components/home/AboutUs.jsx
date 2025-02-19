import React from 'react'

const AboutUs = () => {
    return (
        <div id='about' className='md:mt-24 mt-44 flex relative items-center gap-5'>
            <div className='md:w-1/2 md:relative absolute'>
                <div className="relative">
                    <img src="/images/about-us.png" alt="about us" className="w-full h-full object-cover md:opacity-100 opacity-35" />
                    <div className="absolute inset-0 bg-gradient-to-t blur-sm from-white/20 via-white/50 to-transparent"></div>
                </div>
            </div>
            <div className='md:w-1/2 w-full flex flex-col gap-2 z-10'>
                <h3 className='text-[#2C2C2C] text-3xl font-bold'>
                    من نحن؟ وماذا نفعل بالتحديد؟
                </h3>
                <p className='text-[#7C7C7C]'>
                    نحن نعلم ما تريد, ونعلم مخاوفك من اتخاذ قرارات مصيرية في حياتك واختيار جامعتك, كليتك او تخصصك الذي ستبني عليه مستقبلك فلذلك لم نحب ان تجعلك تفكر كثيرا وقمنا بتجميع جميع الكليات والتخصصات واراء الطلاب بالتفصيل.... حتى تتخذ قرارك بشكل صحيح !
                </p>
                <button className='mt-3 btn-black'>
                    اكتشف جميع الجامعات
                </button>
            </div>
        </div>

    )
}

export default AboutUs
