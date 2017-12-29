import * as _ from 'underscore';

export class PagerService {
  getPager(totalItems: number, currentPage: number, pageSize: number) {
    // calculate total pages
    let totalPages: number = Math.ceil(totalItems / pageSize);
    console.log("totalPages=" + totalPages);
    console.log("currentPage=" + currentPage);
    let startPage: number, endPage: number;
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

    console.log("startPage=" + startPage);
    console.log("endPage=" + endPage);
    console.log("currentPage=" + currentPage);
    // calculate start and end item indexes
    let startIndex: number = (currentPage - 1) * pageSize;
    //alert(startIndex+"--"+totalPages)
    if (startIndex > totalItems) {
     // currentPage = 1;
      currentPage = Math.floor(currentPage / pageSize);
      startIndex = (currentPage - 1) * pageSize;
      //alert(currentPage+"--"+startIndex)
    }

    console.log("startIndex=" + startIndex);

    let endIndex: number = Math.min(Number(startIndex) + Number(pageSize) - 1, Number(totalItems) - 1);
    console.log("pageSize=" + pageSize + '===min==' + (Number(startIndex) + Number(pageSize) - 1));

    //alert("endIndex="+endIndex);
    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);
    //alert(pages)
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
      pages: pages
    };
  }
}
