const Order = require('../models/order.model');
const mongoose = require('mongoose');
const { multipleMongooseToObject, mongooseToObject} = require('../utils/mongooseUtil');

class OrderController {
    async getOrders(req, res, next) {
        if(req.isAuthenticated()) {
            let options = {
                page: 1,
                limit: 10,
            };  

            if(req.params.page) options['page'] = parseInt(req.params.page)
            await Order.loadPerPage(options)
                .then(result => {
                    let pages = []
                    let currentPage = result.page;
                    let totalPages = result.totalPages;
                    pages.push({page: currentPage})
                    for (let i = currentPage + 1; i < currentPage + 5; i++)
                        if(i <= totalPages)
                            pages.push({page: i})
                    
                    //console.log(pages)
                    let hasPrev = true
                    if (currentPage == 1) hasPrev = false
                    let hasNext = true
                    if( pages[pages.length - 1].page == totalPages) hasNext = false;

                    let prevAndNextInPages = { prev: currentPage - 1, next: pages[pages.length - 1].page + 1}
                    let prevAndNext = { prev: currentPage - 1, next: currentPage + 1}
                                       
                    res.render('receivedOrders/receivedOrders', {
                        orders: result.docs,
                        page: pages,
                        hasPrev: hasPrev,
                        hasNext: hasNext,
                        prevAndNext: prevAndNext,
                        prevAndNextInPages: prevAndNextInPages
                    })
                })
                .catch(next);     
            }
            else   
                res.redirect('/login')
    }
}

module.exports = new OrderController();