const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;


const productCartSchema = new mongoose.Schema(
    {
        prodcuts: {
            type: ObjectId,
            ref: Product,
        },

        name: String,
        count: Number,
        price: Numbers
    }
);


const ProductCart = new mongoose.model("ProductCart", productCartSchema);

const orderSchema = new mongoose.Schema(
    {
        products: [productCartSchema],

        transaction_id: {},

        amount: { type: Number },
        address: String,
        updated: Date,
        user: {
            type: ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);


const Order = new mongoose.model("Order", orderSchema);



module.exports = { Order, ProductCart }