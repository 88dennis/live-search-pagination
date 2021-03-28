import React from "react";
import "./Paginate.css";

let isMounted = false;
const Paginate = (props) => {
  // let initialPage = 1;

  const [state, setState] = React.useState({
    pager: {},
    sheet: 1,
  });
  const [mount, setMount] = React.useState(false);
  
  React.useEffect(() => {
    isMounted = true;
    let page = state.sheet;
    let items = props.items;
    let pager = state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    const getPager = (totalItems, currentPage, pageSize) => {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = props.itemsPerPage || 10;

      // calculate total pages
      let totalPages = Math.ceil(totalItems / pageSize);

      let startPage, endPage;
      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }
      // calculate start and end item indexes
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      let pages = [...Array(endPage + 1 - startPage).keys()].map(
        (i) => startPage + i
      );

      // return object with all pager properties required by the view
      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages,
      };
    };
     // get new pager object for specified page
     pager = getPager(items.length, page);

     setState({ 
      //  sheet: pager.currentPage,
       pager: pager });
     
      // get new page of items from items array

    //  let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      // update state

    if (!mount) {
      setMount(true);

      if (isMounted) {

      // call change page function in parent component
      // props.onChangePage(pageOfItems);
      }
  
    }

    return () => {
      isMounted = false;
    };
  }, [mount, props]);


  // React.useEffect(() => {

  //   isMounted = true;
  //   if (!mount) {
  //     setMount(true);

  //     // if (page < 1 || page > pager.totalPages) {
  //     //   return;
  //     // }

  //     // const getPager = (totalItems, currentPage, pageSize) => {
  //     //   // default to first page
  //     //   currentPage = currentPage || 1;

  //     //   // default page size is 10
  //     //   pageSize = props.itemsPerPage || 10;

  //     //   // calculate total pages
  //     //   var totalPages = Math.ceil(totalItems / pageSize);

  //     //   var startPage, endPage;
  //     //   if (totalPages <= 10) {
  //     //     // less than 10 total pages so show all
  //     //     startPage = 1;
  //     //     endPage = totalPages;
  //     //   } else {
  //     //     // more than 10 total pages so calculate start and end pages
  //     //     if (currentPage <= 6) {
  //     //       startPage = 1;
  //     //       endPage = 10;
  //     //     } else if (currentPage + 4 >= totalPages) {
  //     //       startPage = totalPages - 9;
  //     //       endPage = totalPages;
  //     //     } else {
  //     //       startPage = currentPage - 5;
  //     //       endPage = currentPage + 4;
  //     //     }
  //     //   }
  //     //   // calculate start and end item indexes
  //     //   var startIndex = (currentPage - 1) * pageSize;
  //     //   var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  //     //   // create an array of pages to ng-repeat in the pager control
  //     //   var pages = [...Array(endPage + 1 - startPage).keys()].map(
  //     //     (i) => startPage + i
  //     //   );

  //     //   // return object with all pager properties required by the view
  //     //   return {
  //     //     totalItems: totalItems,
  //     //     currentPage: currentPage,
  //     //     pageSize: pageSize,
  //     //     totalPages: totalPages,
  //     //     startPage: startPage,
  //     //     endPage: endPage,
  //     //     startIndex: startIndex,
  //     //     endIndex: endIndex,
  //     //     pages: pages,
  //     //   };
  //     // };
  //     // // get new pager object for specified page
  //     // pager = getPager(items.length, page);

  //     // // get new page of items from items array
  //     // var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

  //     // // update state
  //     // setState({ pager: pager });

  //     // // call change page function in parent component
  //     // props.onChangePage(pageOfItems);
  //   }

  //   return ()=>{
  //     isMounted =false;
  //   }
  // }, [state.pager, state.sheet, mount, props]);

  const pageSet = (page) => {
    console.log(page)
    // window.scrollTo({ top: 0, behavior: "smooth" });
    props.paginate(page);
    let items = props.items;
    let pager = state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get new pager object for specified page
    pager = getPager2(items.length, page);

    console.log("PAGESETPAGER", pager )
    // get new page of items from items array
    // let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
// console.log(pageOfItems);
    // update state
    setState({ 
      ...state,
      sheet:page,
      pager: pager });
  //   // call change page function in parent component
    // props.onChangePage(pageOfItems);
  };


  //THE GETPAGER RETURNS AN OBJECT TO UPDATE THE STATE.PAGER
  const getPager2 = (totalItems, currentPage, pageSize) => {

    // let page = state.sheet;
    // let items = props.items;
    // let pager = state.pager;
    // default to first page
    currentPage = currentPage;
    

    // // default page size is 10
    pageSize = props.itemsPerPage || 10;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    // console.log(totalPages, "PAGESIZE", endPage)

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );



    console.log("GETPAGER2 *************")
    console.log("totalItems", totalItems)
    console.log("currentPage",currentPage)
    console.log("pageSize",pageSize)
    console.log("totalPages",totalPages)
    console.log("startIndex",startIndex)
    console.log("endIndex",endIndex)
    console.log("pages",pages)
    console.log("GETPAGER2 *************")
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };


  };

  let pager = state.pager;
  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page

    return null;
  }

  return (
    <>
      <div className="main_ul_div">
        <div>
          {/* {JSON.stringify(pager)} */}
          {/* {JSON.stringify(pager.currentPage)} */}

          <br/>
          <hr/>
          {/* <div>
            <ul className="pagination2">
              <li className={pager.currentPage === 1 ? "disabled" : ""}>
                <button onClick={() => pageSet(pager.currentPage - 1)}>
                  Previous
                </button>
              </li>
              <li className={pager.currentPage === 1 ? "disabled" : ""}>
                <button onClick={() => pageSet(1)}>First</button>
              </li>
            </ul>
          </div>

            <ul className="pagination2">
              <li
                className={
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }
              >
                <button onClick={() => pageSet(pager.totalPages)}>Last</button>
              </li>
              <li
                className={
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }
              >
                <button onClick={() => pageSet(pager.currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul> */}
<div>
<ul className="pagination">

<li tabIndex="0" className={pager.currentPage === 1 ? "disabled" : ""}>
    {pager.currentPage === 1 ?  <button><i className="fas fa-angle-double-left"></i></button> :
        <button onClick={() => pageSet(pager.currentPage - 1)}><i className="fas fa-angle-double-left"></i></button>}
      </li>
<li className={pager.currentPage === 1 ? "disabled" : ""}>
{pager.currentPage === 1 ?  <button>First</button> :
        <button onClick={() => pageSet(1)}>First</button>}
      </li>
      <li className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
{pager.currentPage === pager.totalPages ?  <button>Last</button> :
        <button onClick={() => pageSet(pager.totalPages)}>Last</button>}
      </li>
<li className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
{pager.currentPage === pager.totalPages ?  <button><i className="fas fa-angle-double-right"></i></button> :
        <button onClick={() => pageSet(pager.currentPage + 1)}><i className="fas fa-angle-double-right"></i></button>}
      </li>
</ul>
</div>

{/* DO NOT DELETE THIS PART */}
<div>
          <ul className="pagination">
            {pager.pages.map((page, index) => (
              <li
            
                key={index}
                className={pager.currentPage === page ? "active" : ""}
              >
                <button onClick={() => pageSet(page)}>{page}</button>
              </li>
            ))}
            {pager.totalPages !== pager.endPage && <span style={{paddingTop: "15px", marginLeft:"5px", marginRight:"5px" }}>....</span>  }

          </ul>
          </div>
{/* DO NOT DELETE THIS PART */}

         
        </div>
      </div>
    </>
  );
};

export default Paginate;
