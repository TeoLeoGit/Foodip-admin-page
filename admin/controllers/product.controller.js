const Product = require('../models/product.model');
const driveAPI = require('../apis');
const mongoose = require('mongoose');
const fs = require('fs');
const { multipleMongooseToObject, mongooseToObject} = require('../utils/mongooseUtil')

const CLIENT_ID = '133885287258-rhrh50r42v8e22oluso9pod1r2jn4ilt.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04RDJyusBTDBBCgYIARAAGAQSNwF-L9Irp4R3rBwLc2TEJun5bGpe8mbKFJ9Hd7-bHSw47NmZGHkFZ8TzJsDCreM_D53xVhXIeZo'


class ProductController {
    index(req, res, next) {
        Product.loadAll()
            .then(products => {
                res.render('stocks/stocks', { products: multipleMongooseToObject(products)})
            })
            .catch(next);
    }

    insertSample(req, res, next) {
        Product.insertSampleData()
            .then(function (err) {
                if(!err) res.json()
            })
            .catch(next);
    }

    async addProduct(req, res, next) {
        // console.log(req.file)
        const filePath = req.file.path
        let imgUrl = await driveAPI.uploadFile(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, filePath, req.file.originalname)
        let product = {
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            category: req.body.category,
            price: parseFloat(req.body.price),
            discount: parseFloat(req.body.discount),
            cover: imgUrl,
            status: 1,
            activeFlag: 1
        }
        await Product.addProduct(product);
        fs.unlink(filePath, function (err) {
            if (err) console.log(err);
            // console.log('File deleted!');
        });
        res.redirect('/stocks');
    }

    getProductDetail(req, res, next) {
        // console.log(req.query)
        Product.getProductById(req.query)
            .then(product => {
                res.render('stocks/productDetails', mongooseToObject(product))
            })
            .catch(next);
    }

    deleteProduct(req, res, next) {
        // console.log(req.body)
        Product.deleteProductById(req.body)
            .then(function (err) {
                if(!err) res.json()
                res.redirect('/stocks');
            })
            .catch(next);
    }

    async updateProduct(req, res, next) {
        console.log(req.body)
        let update = {}
        if(req.file) {
            const filePath = req.file.path
            let imgUrl = await driveAPI.uploadFile(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, filePath, req.file.originalname)
            update["cover"] = imgUrl
        }
        if(req.body.name) update["name"] = req.body.name
        if(req.body.price) update["price"] = parseFloat(req.body.price)
        if(req.body.category) update["category"] = req.body.category
        if(req.body.discount) update["discount"] = parseFloat(req.body.discount)
        if(req.body.status)
            if(req.body.status === 'Available') update["status"] = 1
            else update["status"] = 0

        await Product.updateProductById(req.body._id, update)
            .then(product => {
                console.log(product)
                if(req.file) {
                    fs.unlink(req.file.path, function (err) {
                        if (err) console.log(err);
                        // console.log('File deleted!');
                    });
                }
                res.render('stocks/productDetails', mongooseToObject(product))
            })
            .catch(next);
    }

    async getProducts(req, res, next) {
        let options = {
            page: 1,
            limit: 10,
        };
        await Product.loadPerPage(options)
                .then(result => {
                    let pages = []
                    let currentPage = result.page;
                    let totalPages = result.totalPages;
                    pages.push({page: currentPage})
                    for (let i = currentPage + 1; i < currentPage + 5; i++)
                        if(i <= totalPages)
                            pages.push({page: i})
                    if (totalPages - currentPage > 4)
                        pages.push({page: "..."})
                    
                    let hasPrev = true
                    if (currentPage == 1) hasPrev = false
                    let hasNext = true
                    if (currentPage == totalPages) hasNext = false;
                    console.log(pages)
                    res.render('stocks/stocks', {
                        products: result.docs,
                        page: pages,
                        hasPrev: hasPrev,
                        hasNext: hasNext
                    })
                })
                .catch(next);         
                
    }

}

module.exports = new ProductController();