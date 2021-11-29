const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const productSchema = new Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        auto: 0
    },
    cover: {
        type: String,
        required: true,
        auto: '../public/images/pic-1.png'
    },
    status: {
        type: Number,
        auto: 1
    },
    activeFlag: {
        type: Number,
        required: true,
        default: 1
    },
});


productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);
module.exports  = {
    async loadAll() {
        return await Product.find({activeFlag: 1})
    },

    async insertSampleData() {
        let data = [
            {
                _id: mongoose.Types.ObjectId,
                name: 'Spiderman Pizza',
                category: 'Fast food',
                price: '25',
                cover: '../public/images/pic-1.png',
                status: 1,
                activeFlag: 1
            },
            {
                _id: mongoose.Types.ObjectId,
                name: 'Big Mac',
                category: 'Fast food',
                price: '15',
                cover: '../public/images/pic-1.png',
                status: 1,
                activeFlag: 1
            },
            {
                _id: mongoose.Types.ObjectId,
                name: 'Coca cola',
                category: 'Drink',
                price: '2',
                cover: '../public/images/pic-1.png',
                status: 1,
                activeFlag: 1
            },
            {
                _id: mongoose.Types.ObjectId,
                name: 'Orange juice',
                category: 'Drink',
                price: '2',
                cover: '../public/images/pic-1.png',
                status: 1,
                activeFlag: 1
            },
            {
                _id: mongoose.Types.ObjectId,
                name: 'Steak',
                category: 'Main disk',
                price: '35',
                cover: '../public/images/pic-1.png',
                status: 1,
                activeFlag: 1
            }
        ];
        Product.collection.insertMany(data);
    },

    async addProduct(product) {
        return Product.create(product);
    },

    async getProductById(id) {
        return await Product.findOne(id).exec();
    },

    async deleteProductById(id) {
        let update = { activeFlag: 0 };
        return await Product.findOneAndUpdate(id, update, {
            new: true
          });
    },

    async updateProductById(id, update) {
        return await Product.findOneAndUpdate(id, update, {
            new: true
        });
    },

    async loadPerPage(options) {
        return await Product.paginate({activeFlag: 1}, options)
    },
}