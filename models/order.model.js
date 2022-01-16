const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: [{
        items: {type: Schema.Types.ObjectId, ref: 'Product'},
        qty: { type: Number },
        price: { type: Number }
    }],
    totalPrice: {
        type: Number,
        auto: 0
    },
    createdAt: {
        type: Date,
        required: true
    },
    status: {
        type: Number, 
        required: true, 
        default: 0
    },
});

orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model('Order', orderSchema);
module.exports  = {
    async loadPerPage(options) {
        return await Order.paginate(options)
    },  
    
    async insertExample() {
        console.log("Inserting")
        let arr = [
            {
                userId: '61b16b98accecbfe9495ce5a',
                name: 'test',
                address: 'test',
                phone: '00323234',
                products: [{type: '61a5c9294b98de34e911d023', qty: 2, price: 3.4},
                {type: '61b1c9755341e2755045a5b3', qty: 1, price: 3.4}],
                totalPrice: 5,
                createAt: '2021-12-08T15:04:21.401+00:00',
                status: 1
            },
            {
                userId: '61b16b98accecbfe9495ce5a',
                name: 'tesdst',
                address: 'tesdst',
                phone: '00323234',
                products: [{type: '61a5c9294b98de34e911d023', qty: 2, price: 3.4},
                {type: '61b1c9755341e2755045a5b3', qty: 1, price: 3.4}],
                totalPrice: 5,
                createAt: '2021-12-08T15:04:21.401+00:00',
                status: 0
            }
        ];
        Order.collection.insertMany(arr);
        console.log("Inserted")
    },
}