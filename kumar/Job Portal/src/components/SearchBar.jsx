function SearchBar(){
    return(
        <>
            <div className="searchbar mt-14 text-center">
                <h2 className="text-center text-purple-400 text-4xl">Your ideal job awaits,start the search</h2>
                <p className="text-center text-purple-400 text-2xl">Get latest job openings that best suits you!</p>
                <form method="post" className="mt-10">
                    <input type="text" name="searchjob" id="searchjob" className="border rounded py-2 px-4 w-1/2" placeholder="Grap the Oppotunity" />
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Search</button>
                </form>
            </div><div className="jobs text-center text-red-600 font-bold text-4xl mt-5">
                <h1>No Jobs Available</h1>
            </div>
        </>

    )
}

export default SearchBar