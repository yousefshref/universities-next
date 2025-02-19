'use client'
import { server } from '@/app/server'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { createContext, useCallback, useEffect, useState } from 'react'

const UniverstyContext = ({ children }) => {
    const [universities, setUniversities] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Store filters: country, city, and major.
    const [filters, setFilters] = useState({ country: '', city: '', major: '' })

    const [searchCountry, setSearchCountry] = useState(filters?.country || '')
    const [searchCity, setSearchCity] = useState(filters?.city || '')
    const [searchMajor, setSearchMajor] = useState(filters?.major || '')

    // Fetch universities with filters and pagination.
    const fetchUniversities = useCallback(async (pageNumber, filters) => {
        console.log("Fetching with filters:", filters)
        setLoading(true)
        try {
            // Build query string with filters and page
            const queryParams = new URLSearchParams({
                page: pageNumber,
                country: filters.country,
                city: filters.city,
                major: filters.major
            })
            const res = await fetch(`${server}/api/universities/?${queryParams.toString()}`)
            if (!res.ok) {
                throw new Error('Error fetching data')
            }
            const data = await res.json()

            // When on the first page, replace the list; otherwise, append new results.
            setUniversities(prev => pageNumber === 1 ? data.results : [...prev, ...data.results])
            setHasMore(Boolean(data.next))
        } catch (err) {
            setError(err.message || 'Error fetching data')
        } finally {
            setLoading(false)
        }
    }, [])

    // Fetch data when page or filters change.
    useEffect(() => {
        fetchUniversities(page, filters)
    }, [fetchUniversities, page, filters])

    // Infinite scroll: update page when user scrolls near bottom.
    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.scrollHeight
            ) {
                setPage(prev => prev + 1)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loading, hasMore])

    // Update filters without disrupting pagination logic.
    // When filters change, reset the list and page to start fresh.
    const updateFilters = (newFilters) => {
        setFilters(newFilters)
        setPage(1)
        setUniversities([])
    }




    const [universty, setUniversty] = useState({})
    const getUniversty = useCallback(async (id) => {
        try {
            setLoading(true)
            const res = await fetch(`${server}/api/universities/${id}/`)
            if (!res.ok) {
                throw new Error('Error fetching data')
            }
            const data = await res.json()
            setUniversty(data)
        } catch (err) {
            setError(err.message || 'Error fetching data')
        } finally {
            setLoading(false)
        }
    }, [])

    const { universty_id } = useParams()
    useEffect(() => {
        if (universty_id) {
            getUniversty(universty_id)
        }
    }, [universty_id])



    // colleges
    const [colleges, setColleges] = useState([])
    const getColleges = async (universty_id_param) => {
        try {
            setLoading(true)
            const res = await axios.get(`${server}/api/collage/?university_id=${universty_id_param}`)
            console.log(res.data);

            setColleges(res.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (universty?.id) {
            getColleges(universty?.id)
        }
    }, [universty?.id])

    return (
        <UniverstyContextProvider.Provider value={{
            universities, loading, error, updateFilters, filters,

            universty, getUniversty,

            colleges,

            searchCountry, setSearchCountry,
            searchCity, setSearchCity,
            searchMajor, setSearchMajor,
        }}>
            {children}
        </UniverstyContextProvider.Provider>
    )
}

export default UniverstyContext
export const UniverstyContextProvider = createContext()
