import './styles/styles.scss';
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import usePagedData from './hooks/usePagedData';
import useSearch from './hooks/useSearch';
import User from './components/user';
import UserDetails from './components/userDetails';
import { UserContextProvider } from './userContext'

const RANDOM_USER_API_BASE = "https://randomuser.me/api";
const RANDOM_USER_API_PAGE_PARAM = "page";
const RANDOM_USER_API_RESULTS_PARAM = "results";
const PAGE_SIZE = 10;

// 10 Make Responsive
// 13) Refine Prop Types, Component Name, and Structure.

function App() {
  const history = createBrowserHistory();
  const urlParams = new URLSearchParams(history.location.search);
  const current_count = urlParams.get("page");
  const current_searchTerm = urlParams.get("searchTerm");

  const [isLoading, results, exception, setNextPage, setPreviousPage, page  ] = usePagedData({
    url: RANDOM_USER_API_BASE,
    page: [RANDOM_USER_API_PAGE_PARAM, Number(current_count) ||  1], // default first page
    pageSize: [RANDOM_USER_API_RESULTS_PARAM, PAGE_SIZE]
  });
  
  const [ expandedView,  setExpandedView ] = useState(false);
  const [ userToExpand, setUserToExpand ] = useState(null);
  const [ hasSearchInput, setHasSearchInput ] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [ searchResults ] = useSearch(searchTerm, results);

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    if(searchParams.has('page')){
      searchParams.set('page',page);
    } else {
      searchParams.append('page',page);
    }
    history.push(`?${searchParams.toString()}`);
  }, [page]);

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    if(!searchTerm && !hasSearchInput){
      return;
    }
    if(searchParams.has('searchTerm')){
      searchParams.set('searchTerm',searchTerm);
    } else {
      searchParams.append('searchTerm',searchTerm);
    }
    history.push(`?${searchParams.toString()}`);
  }, [searchTerm])

  useEffect(() => {
    if(current_searchTerm && results && results.results && results.results.length){
      setSearchTerm(current_searchTerm);
    }
  }, [results])

  const increasePageCount = () => {
    setNextPage(page + 1);
  }
  const decreasePageCount = () => {
    setPreviousPage(page - 1);
  }

  const handleUserClick = (user) => {
    setExpandedView(true);
    setUserToExpand(user);
  }

  const handleHideUser = () => {
    setExpandedView(false);
    setUserToExpand(null);
  }

  const debounced = () => {
    let timer;
    return (event) => {
        const value = event.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
          setHasSearchInput(true);
          setSearchTerm(value);
        }, 100);
    };
};

  const handleSearchInput = debounced();

  let {results : users = []} = results || {};
  if(searchTerm){
    ({results : users = []} = searchResults || {});
  }
  return (
    <div className="App">
      { expandedView &&
          <UserContextProvider value={userToExpand}>
              <UserDetails onHide={handleHideUser}></UserDetails>
          </UserContextProvider>
      }
      <div className='search'>
        <label htmlFor="user-search">Search users:</label>
        <input type="search" placeholder="search here..." id="user-search" onChange={handleSearchInput} value={searchTerm}></input>
      </div>
      {
        users && users.length ? (
          users.map(fetchedUser => {
            return <User key={`${fetchedUser.name.title}-${fetchedUser.name.first}-${fetchedUser.name.last} `} user={fetchedUser} onClick={handleUserClick}/>
          })
        ): (searchTerm ? <span>No results...</span>: <span>Loading....</span>)
      }
      <h1> Page {page} </h1>
      <div className='pagingControl'>
        <button onClick={decreasePageCount}>Prev</button>
        <button onClick={increasePageCount}>Next</button>
      </div>
    </div>
  );
}

export default App;
