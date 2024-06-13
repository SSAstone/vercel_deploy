import { Schema, model, Types } from "mongoose";
import { productsValidatorType } from "../../../validators/products";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema: Schema<productsValidatorType> = new Schema({
    barcode: {
        type: String || Number,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String || Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'deleted', 'blocked', 'canceled', 'completed'],
        default: 'pending'
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    image: {
        type: String || Object || Array,
    },
    company: String,
    brand: String,
    model: String,
    sku: String,
    weight: String,
    length: String,
    width: String,
    height: String,
    origin: String,
    unit: String,
    tax: String,
    discount: String,
    stock: String,
    description: String    
}, { timestamps: true });

productSchema.plugin(mongooseAggregatePaginate);

const Product = model<productsValidatorType>('Product', productSchema);
export default Product;
