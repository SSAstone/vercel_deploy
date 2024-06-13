import { Schema, model, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { storeValidatorType } from "../../../validators/store";

const storeSchema: Schema<storeValidatorType> = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    storeProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'StoreProducts'
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'deleted', 'blocked', 'canceled', 'completed'],
        default: 'pending'
    },
    storeCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'StoreCategory'
    },
    image: {
        type: String || Object || Array,
    },
    discount: String,
    description: String,

}, { timestamps: true });

storeSchema.plugin(mongooseAggregatePaginate);

const Product = model<storeValidatorType>('Product', storeSchema);
export default Product;
