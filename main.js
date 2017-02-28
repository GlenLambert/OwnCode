'use strict';

var totalPages = [];
var pageDisp = [];

function pager(elements, pageSize, currentPage, dispSize) {
// Determines the exact pages to be displayed by loading 'pageDisp'
// with the list of them. When fewer than 8 pages all of them will be displayed.

    pageSize = (isNaN(pageSize)) ? 10 : pageSize; //Default value for elements per page (pageSize).
    dispSize = (isNaN(dispSize)) ?  8 : dispSize; //Default value for displayed pages qty (dispSize).
    
    var page = 0;
    
    for (let i = 0, l = Math.floor(elements / pageSize); i < l; i++) {
        page++;
        totalPages.push(page);
    }

    if (elements % pageSize !== 0) {
        page++;
        totalPages.push(page);
    }

    if (totalPages.length > 7) {
        fixedPager(currentPage - 1, dispSize);
        return pageDisp;
    } else {
            return totalPages;
    }
}

function fixedPager(ind, dispSize) {
    
    var tempLeft = [], lPages = [], 
        tempRight = [], rPages = [];
    
    ind = (ind < 0) ? 0 : ind;
    ind = (ind > (totalPages.length - 1)) ? (totalPages.length - 1) : ind;

    for (let i = (ind - 1); i >= 0; i--) {
        tempLeft.unshift(totalPages[i]);
    }

    for (let i = (ind + 1); i < totalPages.length; i++) {
        tempRight.push(totalPages[i]);
    }

    lPages = displayPages(percentDisp(dispSize - 2, tempLeft.length), tempLeft, tempRight)[0];
    lPages.push(totalPages[ind]);
    rPages = displayPages(percentDisp(dispSize - 2, tempLeft.length), tempLeft, tempRight)[1];

    pageDisp = lPages.concat(rPages);

}

function displayPages (pageQty, left, right) {
    //SHIT'S HAPPENING HEREEEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!
    var l = Math.ceil(left.length / pageQty[0]),
        r = Math.ceil(right.length / pageQty[1]),
        lArr = [], rArr = [];

    for (let i = 0; i < left.length; i += l) {
        lArr.push(left[i]);
    }

    if (right.length === 1) {
        rArr.push(right[0]);
    } else {
        for (let i = right.length - 1; i > 0; i -= r) {
            rArr.unshift(right[i]);
        }
    }

    return [lArr, rArr];
}

function percentDisp(numPag, left) {
    var a = Math.floor((numPag * percent(left, totalPages.length)[0]) / 100);
    var b = Math.abs(numPag - a);

    if (percent(left, totalPages.length)[1] >= 5) {
        return [a + 1, b];
    } else {
        return [a, b + 1];
    }
}

function percent(value, total) {
    var a = Math.floor((100 * value) / total);
    var b = Number(String(((100 * value) / total) % 1).charAt(2));
    return [a, b];
}

function getArg(idx) {
    return parseInt(process.argv[idx]);
}

console.log(pager(getArg(2), getArg(3), getArg(4), getArg(5)));
