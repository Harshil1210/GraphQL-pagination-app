import React,{ useState } from 'react'

export const Navbar = ({ onSearchInputChange }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        onSearchInputChange(searchQuery);  
    };

  return (
    <div style={{ background: 'linear-gradient(270deg, #1b1429, #140f23)' }}>
                <nav style={{ background: 'linear-gradient(270deg, #1b1429, #140f23)' }} className="p-4">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="text-white font-semibold text-lg">GraphQL Task</div>
                        <div className="flex items-center">
                            <div className="mr-4 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    className="bg-gray-700 text-white form-input py-2 px-4 leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    placeholder="Search movies"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
  )
}
