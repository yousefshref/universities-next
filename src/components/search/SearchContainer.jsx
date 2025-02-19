'use client'
import { server } from '@/app/server'
import { UniverstyContextProvider } from '@/contexts/UniverstyContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

const SearchContainer = () => {
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

    const {
        searchCountry, setSearchCountry,
        searchCity, setSearchCity,
        searchMajor, setSearchMajor,
    } = useContext(UniverstyContextProvider)

    return (
        <section className='flex flex-col mt-24'>
            <h3 className='text-[#222222] text-2xl text-center font-bold w-full max-w-lg mx-auto'>
                ابحث عن طريق الحامعة, الكليه, التخصص او حتى البلد التي تريدها
            </h3>
            <div className='flex items-center gap-5 w-full max-w-2xl mx-auto mt-5'>
                <select
                    onChange={(e) => {
                        const value = e.target.value
                        setSearchCountry(value)
                        updateFilters({ country: value, city: searchCity, major: searchMajor })
                    }}
                    value={searchCountry}
                    className='bg-gray-100 w-full p-1 rounded-md'
                >
                    <option value="">اختر البلد</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => {
                        const value = e.target.value
                        setSearchCity(value)
                        updateFilters({ country: searchCountry, city: value, major: searchMajor })
                    }}
                    value={searchCity}
                    className='bg-gray-100 w-full p-1 rounded-md'
                >
                    <option value="">اختر المدينه</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => {
                        const value = e.target.value
                        setSearchMajor(value)
                        updateFilters({ country: searchCountry, city: searchCity, major: value })
                    }}
                    value={searchMajor}
                    className='bg-gray-100 w-full p-1 rounded-md'
                >
                    <option value="">اختر التخصص</option>
                    {majors.map((major) => (
                        <option key={major.id} value={major.id}>
                            {major.name}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    )
}

export default SearchContainer
