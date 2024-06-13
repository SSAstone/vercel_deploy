import { Schema, model, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { storeProductsValidatorType } from "../../../validators/store_products";

const storeProductsSchema: Schema<storeProductsValidatorType> = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    expired: {
        type: Date,
        required: true
    },
    manufactured: {
        type: Date,
        required: true
    },
    storePrice: {
        type: Number
    },
    discount: String || Number,
    batchNo: {
        type: String
    }
}, { timestamps: true });

storeProductsSchema.plugin(mongooseAggregatePaginate);

const Product = model<storeProductsValidatorType>('Product', storeProductsSchema);
export default Product;
