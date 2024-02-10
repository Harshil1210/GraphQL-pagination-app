import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Get_Films } from '../../Queries';
import ClipLoader from "react-spinners/ClipLoader";


const FilmList = ({ searchQuery }) => {
    const [films, setFilms] = useState([]);
    const pageSize = 2;
    const [page, setPage] = useState(0);
    const [filteredFilms, setFilteredFilms] = useState([]);


    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#1b1429",
    };

    const { loading, error, data } = useQuery(Get_Films, {});

    useEffect(() => {
        if (data && data.allFilms && data.allFilms.films) {
            setFilms(data.allFilms.films);
            console.log(data.allFilms.films.length, "length of films")
        }
    }, [data]);

    useEffect(() => {
        if (films.length > 0) {
            filterFilms(0);
        }
    }, [films, searchQuery]);

    const filterFilms = (currentPage) => {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        setFilteredFilms(films.slice(startIndex, endIndex));
    };


    useEffect(() => {
        const currentFilms = films.filter(film =>
            film.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFilms(currentFilms)
    }, [searchQuery]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        filterFilms(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
            filterFilms(page - 1);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader
                    color="black"
                    loading={loading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }
    if (error) return <p>GraphQL Error: {error.message}</p>;


    return (

        <>
            <div className="container mx-auto  p-8 bg-gradient-to-r from-gray-200 to-white" style={{ background: 'linear-gradient(270deg, #2d2441, #241c35)' }}>
                <div className="flex flex-wrap -mx-4">
                    {filteredFilms.map((film) => (
                        <div key={film.title} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 mb-8">
                            <div className="p-4 bg-white shadow-md rounded-md">
                                <h2 className="text-3xl font-bold mb-4 text-gradient">{film.title}</h2>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Director:</span> {film.director}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Release Date:</span> {film.releaseDate}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <span className="font-bold">Species:</span>
                                </p>
                                <ul className="list-disc ml-4">
                                    {film.speciesConnection.species.map((species) => (
                                        <li key={species.name} className="text-gray-700">
                                            <p><span className="font-bold">Name:</span> {species.name}</p>
                                            <p><span className="font-bold">Classification:</span> {species.classification}</p>
                                            <p><span className="font-bold">Homeworld:</span> {species.homeworld ? species.homeworld.name : 'Unknown'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>




            <nav className="flex justify-end p-8  w-full" style={{ background: 'linear-gradient(270deg, #1b1429, #140f23)' }}>
                <button
                    disabled={page === 0}
                    className="py-1 px-2 border border-white rounded-md text-white disabled:opacity-50"
                    onClick={handlePrevPage}
                >
                    Previous
                </button>
                <span className="py-1 px-2 text-white">Page {page + 1}</span>
                <button
                    disabled={films.length <= (page + 1) * pageSize}
                    className="py-1 px-2 border border-white rounded-md text-white disabled:opacity-50"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </nav>
        </>

    );
};

export default FilmList;
