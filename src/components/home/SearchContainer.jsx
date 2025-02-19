'use client'
import { server } from '@/app/server';
import { UniverstyContextProvider } from '@/contexts/UniverstyContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const SearchContainer = () => {
    const router = useRouter();



    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const [majors, setMajors] = useState([])

    // Fetch countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${server}/api/countries/`)
                setCountries(response.data)
            } catch (error) {
                console.error(`Error fetching countries:`, error)
            }
        }
        fetchCountries()
    }, [])

    // Fetch cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(`${server}/api/cities/`)
                setCities(response.data)
            } catch (error) {
                console.error(`Error fetching cities:`, error)
            }
        }
        fetchCities()
    }, [])

    // Fetch majors
    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const response = await axios.get(`${server}/api/majors/`)
                setMajors(response.data)
            } catch (error) {
                console.error('Error fetching majors:', error)
            }
        }
        fetchMajors()
    }, [])



    const { updateFilters, filters } = useContext(UniverstyContextProvider)

    // Local states for selects; initialize from context if available
    const {
        searchCountry, setSearchCountry,
        searchCity, setSearchCity,
        searchMajor, setSearchMajor,
    } = useContext(UniverstyContextProvider)

    const handleSearch = () => {
        updateFilters({ country: searchCountry, city: searchCity, major: searchMajor })
        router.push('/search')
    }

    return (
        <div className='md:-mt-5 md:text-[2vw] lg:text-[1.3vw]'>
            <div className='md:p-5 p-3 bg-[#ECECEC] md:py-7 py-4 rounded-xl gap-5 flex md:flex-row flex-col items-center justify-between'>
                <select onChange={(e) => setSearchCountry(e.target.value)} value={searchCountry} className='bg-white w-full md:p-2 p-1.5 md:rounded-xl rounded-md'>
                    <option value="">اختر البلد</option>
                    {countries?.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSearchCity(e.target.value)} value={searchCity} className='bg-white w-full md:p-2 p-1.5 md:rounded-xl rounded-md'>
                    <option value="">اختر المدينه</option>
                    {cities?.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSearchMajor(e.target.value)} value={searchMajor} className='bg-white w-full md:p-2 p-1.5 md:rounded-xl rounded-md'>
                    <option value="">اختر التخصص</option>
                    {majors?.map((major) => (
                        <option key={major.id} value={major.id}>
                            {major.name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={() => {
                handleSearch()
            }} className='btn-black'>
                بـحـــث
            </button>
        </div>
    )
}

export default SearchContainer
