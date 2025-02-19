import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import SearchContainer from '@/components/search/SearchContainer'
import UniverstiesContainer from '@/components/search/UniverstiesContainer'
import React from 'react'

const page = () => {
    return (
        <div className='md:p-5 p-3'>
            <Navbar />
            <br />
            <SearchContainer />
            <br />
            <UniverstiesContainer />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default page
