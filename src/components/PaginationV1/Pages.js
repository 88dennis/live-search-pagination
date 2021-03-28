import React, { useState } from "react";
import Paginate2 from "./Paginate2";

const Pages = ({results2}) => {
  // var exampleItems = [...Array(10).keys()].map((i) => ({
  //   id: i + 1,
  //   name: "Item " + (i + 1),
  // }));
  var exampleItems = results2;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [state, setState] = useState({
    // exampleItems:
    // exampleItems: exampleItems,
    pageOfItems: [],
  });

  const noExampleItems =
    !exampleItems || (exampleItems && exampleItems.length === 0);
  //GET CURRENT POST
  // if(!noPeople) {
  const indexOfLastItem = currentPage * itemsPerPage;
  

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = !noExampleItems
    ? exampleItems.slice(indexOfFirstItem, indexOfLastItem)
    : null;

    console.log("indexOfLastItem",indexOfLastItem);
    console.log("indexOfFirstItem",indexOfFirstItem);
  console.log("currentPage",currentPage);
  // }
  const onChangePage = (pageOfItems) => {
    // update state with new page of items
    console.log("onChangePage",pageOfItems )
    setState({
      ...state,
      pageOfItems: pageOfItems,
    });
  };

  const paginateNow = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div>
        <div className="container">
          <div className="text-center">
           
            {!noExampleItems && 
             <> <h1>Pagination
                
             </h1>
            {currentItems.map((item, index) => (
             
                <div key={index}>{item.borrowerUserName}</div>
             
            
            ))}
            
            </>
            }
           
          </div>
        </div>

        <Paginate2
              itemsPerPage={itemsPerPage}
              items={exampleItems}
              paginate={paginateNow}
              onChangePage={onChangePage}
              currentPage={currentPage}
            />
      </div>
    </>
  );
};

export default Pages;
