import React, { useState, useEffect } from 'react'
import { getCookie } from '../utils/cookie.js'

import axios from 'axios'

const Navbar = () => {

    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('http://localhost:3000/backend/user/get-user', { withCredentials: true })
            setUser(response.data[0])
        }

        const myCookie = getCookie('token')
        if (myCookie) {
            setIsLogged(true)
        } else {
            console.log('Cookie not found')
        }

        getUser()

    }, [isLogged])

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const logout = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 2023 00:00:00 GMT; path=/`
        setIsLogged(false)
        window.location.href = '/login'
    }

    return (
        <div>
            <header className="bg-blue-300 text-white text-center py-6">
                <div className="mb-2">
                    <button
                        className="lg:hidden text-white focus:outline-none"
                        onClick={toggleNav}
                    >
                        {isNavOpen ? 'Close' : 'Menu'}
                    </button>
                    <nav
                        className={`${isNavOpen ? 'block' : 'hidden'
                            } lg:flex lg:flex-row lg:justify-center`}
                    >
                        <ul className="flex flex-col lg:flex-row lg:justify-center gap-16">
                            <a href="/">
                                <li className="hover:text-green-600 font-bold text-2xl sm:bg-blue-100 mx-20 sm:mx-0 rounded-lg sm:p-4 pt-6">
                                    Main page
                                </li>
                            </a>
                            <a href="/doctors">
                                <li className="hover:text-green-600 font-bold text-2xl sm:bg-blue-100 mx-20 sm:mx-0 rounded-lg sm:p-4">
                                    Check our doctors
                                </li>
                            </a>
                            <a href="/contact">
                                <li className="hover:text-green-600 font-bold text-2xl sm:bg-blue-100 mx-20 sm:mx-0 rounded-lg sm:p-4">
                                    Contact
                                </li>
                            </a>
                            {
                                isLogged ? (
                                    <div className='flex flex-col lg:flex-row gap-20'>
                                        <button className='text-2xl font-bold text-yellow-600 mx-20 sm:mx-0 bg-blue-700' onClick={() => user?.isAdmin ? window.location = '/admin' : window.location = '/user-page'}>{user?.email}</button>

                                        <button className='text-2xl font-bold text-red-800 mx-20 sm:mx-0 bg-blue-500' onClick={() => {
                                            if (confirm('Czy na pewno chcesz się wylogować?') == true) {
                                                logout('token')
                                            }
                                        }}>
                                            Wyloguj
                                        </button>
                                    </div>
                                ) :
                                    (
                                        <div className='flex flex-col lg:flex-row lg:justify-center gap-16'>
                                            <a href="/login">
                                                <li className="hover:text-yellow-200 font-bold text-2xl bg-blue-700 px-2 rounded-lg p-4 mx-20 sm:mx-0">
                                                    Logowanie
                                                </li>
                                            </a>
                                        </div>
                                    )
                            }

                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Navbar