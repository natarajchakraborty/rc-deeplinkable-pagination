import { useState } from 'react';
import  useFetch  from './useFetch';


function usePagedData(config) {
    const api = config?.url;

    const [pageState, setPageState] = useState(config?.page[1]);
    const pageSize = config?.pageSize;

    const url = new URL(api);
    url.searchParams.append(config?.page[0], Number(pageState));
    url.searchParams.append(pageSize[0], Number(pageSize[1]));
    url.searchParams.append('seed', 'seed=foobar'); // generate same set of user everytime(not random)

    const [isLoading, results, exception, cache ] = useFetch(url.toString());
    

    const setNextPage = () => {
        setPageState(pageState + 1);
    }

    const setPreviousPage = () => {
        setPageState(pageState - 1);
    }

    return [ isLoading, results, exception, setNextPage, setPreviousPage, pageState, cache ];
;}

export default usePagedData;