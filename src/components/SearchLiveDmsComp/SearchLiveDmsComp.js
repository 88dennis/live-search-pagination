import React, { useState, useEffect } from "react";
import dataJson from "./datatable/index";
import "./SearchLiveDmsComp.css";
// import axios from "axios";
// import { API } from "../../config";
// import loader from '../../images/loadergif.gif'
import Pages from '../PaginationV1/Pages'

const SearchLiveDmsComp = () => {
  const [data, setData] = useState([]);
  const [searchColumns, setSearchColumns] = useState([]);

  //   const [query, setQuery] = useState("");
  const [state, setState] = useState({
    query: "",
    results: {},
    results2:[],
    loading: false,
    message: "",
    totalResults:0,
    totalPages: 0,
    currentPage:0
  });

  const { query, results,results2, loading, message, totalPages, totalResults, currentPage } = state;
  let cancel = "";

  useEffect(() => {

    if(!query || query === "") {
        setState({
            ...state,
            results2:[]
        })
    }
    fetchSearchResults(1, query);
  }, [query]);

  useEffect(() => {
    let counter = 0;
    dataJson &&
      dataJson.map((eachItem) => {
        counter = counter + 1;
        return (
          (eachItem.product = "deo" + counter),
          (eachItem.category = "shampoo" + counter)
        );
      });
    setData(dataJson);
  }, [query, searchColumns]);

  function search(itemsFromData, myQuery) {
    const columns1 = data[0] && Object.keys(data[0]);
    return itemsFromData.filter((dataItem) =>
      columns1.some(
        (column) =>
          dataItem[column]
            .toString()
            .toLowerCase()
            .indexOf(myQuery.toLowerCase()) > -1
      )
    );
  }

  const getPageCount = (total, denominator) => {
      const divisible = 0 === total  % denominator;
      //if divisible is false we need to add another page
      const valueToBeAdded = divisible ? 0 : 1;
      return Math.floor(total/ denominator) + valueToBeAdded;

  }

const handlePageClick =(event, type) => {
    event.preventDefault();
    const updatePage = 'prev' === type ? currentPage -1: currentPage + 1;
    fetchSearchResults(updatePage, query);
    // if( !loading){

    // }

}

  const handleOnInputChange = (event) => {
    let query = event.target.value;
        setState({
            ...state,
            query: query,
          //   loading: true,
            message: "",
          });
  };

  const fetchSearchResults = (updatePageNo = "", query) => {
    const pageNumber = updatePageNo ? `${updatePageNo}` : "";
     let res2 = search(data, query);


     if(!query || query === ""){
        setState({
            ...state,
            results2:[],

        })
     } else {
            const total = res2.length
            const totalPagesCount = getPageCount(total, 5);

       setState({
           ...state,
           results2:res2,
           loading: false,
           totalResults:total,
           totalPages: totalPagesCount,
           currentPage:updatePageNo

       })
     
     }
       
  
//     const searchUrl = `${API}/products/query?${query}`;
//     if (cancel) {
//       cancel.cancel();
//     }
//     // console.log(query);
 
//     cancel = axios.CancelToken.source();
// // console.log(cancel)
//     axios.get(searchUrl, { cancelToken: cancel.token }).then((res) => {
//       console.log(res);
//       const resultsNotFoundMsg = !res.data || res.data.length === 0 ? 'There are no more results' : '';

//       if(res && res.data){
//          const total = res.data.length
//              const totalPagesCount = getPageCount(total, 2);
//         setState({
//             ...state,
//             results: res.data,
//             message: resultsNotFoundMsg,
//             loading:false,
//              totalResults:total,
// totalPages: totalPagesCount,
// currentPage:updatePageNo
//         })
//       }
       

//     }).catch(error=> {
//         if(axios.isCancel(error) || error){
//             setState({
//                 ...state, 
//                 loading:false,
//                 message: 'failed to fetch data'
//             })
//         }
//     })

    // return <div>{JSON.stringify(search(data, query))}</div>
  };


  const renderSearchResults = () =>{
    //   if (results2 && Object.keys(results2).length && results2.length){
      if (results2 && results2.length){

        return (
            <div className="results_container">
                {
                    results2.map((result, index) => {
                        return <div key={index} className="result_item" >

                           <h6 className="image_username">{result.borrowerUserName}</h6> 
                           <div className="image_wrapper">
                               <img className="image_search_live" src={result.borrowerUserName} alt={"photo"} />
                           </div>
                        </div>
                    })
                }
            </div>
        )
      }
  }
  return (
    <div className="container_search_live">
      <h1>Live Search</h1>

      <label className="search_label" htmlFor="search_input">
        <input
          type="text"
          value={query}
          name="query"
          id="search_input"
          onChange={handleOnInputChange}
        />
        <i className="fas fa-search searchlive_icon"></i>
      </label>

{message && <p className="msg_search_live"></p>}
    {/* <img src={loader} className={`search_loading ${loading ? 'show' : 'hide'}`} alt='loader' /> */}

      {/* {fetchSearchResults(1, query)} */}

      {/* {JSON.stringify(results2)} */}
      {/* {renderSearchResults()} */}
      <Pages 
        results2={results2}
        query={query}
      />
    </div>
  );
};

export default SearchLiveDmsComp;
