import { useState, useEffect, useRef } from 'react';

// searches in all fetched  data
function useSearch(searchTerm, results) {
    const searchCache = useRef({})
    const [searchResults, setSearchResults] = useState([]);

    const search = (usersToSearch) => {
        const matches = usersToSearch.filter(user => {
            const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
            return name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        })
        return matches;
    }
    
    useEffect(() => {
        if(!searchTerm) {
            return [ {results: []} ]; //  return early when argument not proper
        }
        if(searchCache.current[searchTerm]){
            setSearchResults(searchCache.current[searchTerm]);
            return; // return early when present already fetched
        }
        setSearchResults(null); // reset results
        const {results: fetched_pages} = results;
        if(fetched_pages && fetched_pages.length){
            const allSearchResults = search(fetched_pages);
            searchCache.current[searchTerm] = allSearchResults;
            setSearchResults(allSearchResults);
        }
    }, [searchTerm, results])

    const finalResults = searchResults || [];
    return [ {results : finalResults} ];
;}

export default useSearch;