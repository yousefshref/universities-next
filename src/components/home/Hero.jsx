import React from "react";

const Hero = () => {
    return (
        <section className="flex relative items-center gap-8 mt-5 lg:h-[40vw] h-[50vw] justify-center overflow-hidden">
            {/* text */}
            <div className="flex flex-col gap-1 md:w-1/2 z-10">
                <h2 className="text-[#2C2C2C] lg:text-[2vw] md:text-[2.5vw] text-[5.8vw] font-bold">ابحث عن الجامعات والتخصصات التي تريدها</h2>
                <p className="text-[#7C7C7C] lg:text-[1.3vw] md:text-[1.7vw]">
                    قم باستكشاف الجامعات والكليات والتخصصات التي تريدها واقرأ تقييمات واراء
                    الطلاب الأخرين فيها واحصل على معلومات كافيه.
                </p>
            </div>
            {/* images */}
            <div className="flex flex-col gap-1 w-full md:w-1/2 h-full md:relative absolute overflow-hidden">
                <img
                    className="absolute top-1/2 -translate-y-[80%] md:left-1/2 left-[90%] md:opacity-100 opacity-30 md:blur-[0px] blur-[1px] md:-translate-x-[30%] -translate-x-[50%] lg:w-[17vw] md:w-[20vw] w-[30vw]"
                    src="/images/image-1-hero.webp" alt="universty image" loading="lazy"
                />
                <img
                    className="absolute md:top-1/2 top-[80%] opacity-65 -translate-y-[30%] md:opacity-100 md:left-1/2 left-[30%] -translate-x-[100%] lg:w-[17vw] w-[20vw]"
                    src="/images/image-2-hero.png" alt="universty image 2" loading="lazy"
                />
            </div>
        </section>
    );
};

export default Hero;
