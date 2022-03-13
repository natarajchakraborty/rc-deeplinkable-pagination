import { useState, useEffect, useRef } from 'react';


function useFetch(url) {
    const cache = useRef({})
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [exception, setException] = useState(null);
    
    useEffect(() => {
        if(!url) 
            return [ isLoading, results, exception ]; //  return early when argument not proper

        if(cache.current[url]){
            setResults(cache.current[url]);
            console.log(cache.current[url]);
            setIsLoading(false);
            setException(null);
            return;// return early when present already fetched
        }
        setIsLoading(true);
        setResults(null); // reset results
        setException(null); // reset error state
        fetch(url)
            .then((response) => response.json())
            .then((json) => { setResults(json); cache.current[url] = json; setIsLoading(false);})
            .catch((error =>  setException(error)) );
    }, [url])

    return [ isLoading, results, exception, cache ];
;}

export default useFetch;