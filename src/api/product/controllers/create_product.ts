import { Request, Response } from "express"
import Product from "../models/product"
import { ApiResponse } from "../../../lib/api_response/response"

const createProduct = async (req: Request | any, res: Response) => {
    try {
        const data = req.body;
        // if (data?._id !== "add") {
        //     const product = await Product.findByIdAndUpdate(data?._id, data)
        //     return res.status(201).json(ApiResponse.response(201, 'Product created', product))
        // }

        const product = await Product.create(data)
        console.log("🚀 ~ createProduct ~ product:", product)
        res.status(201).json(ApiResponse.response(201, 'Product created', product))
    } catch (error: any) {
        console.log(error)
    }
}

export default createProduct


export const allProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const options = {
            limit: parseInt(limit as string),
            skip: (parseInt(page as string) - 1) * parseInt(limit as string),
        };

        if (req?.params?.id) {
            const id = req?.params?.id;

            const findById = await Product.findOne({ _id: id });

            if (!findById) {
                return res.status(404).json(ApiResponse.response(404, 'Product not found'));
            }

            return res.status(200).json(ApiResponse.response(200, 'Product found', findById));
        }

        if (req?.query?.ids) {
            const ids = req?.query?.ids as string;
            const products = await Product.find({ _id: { $in: ids.split('/') } });
            return res.status(200).json(ApiResponse.response(200, 'products', products));
        }
        if (req?.query?.barcode) {
            console.log("🚀 ~ allProducts ~ req?.query?.barcode:", req?.query?.barcode)
            const barcode = req?.query?.barcode as string;
            const products = await Product.findOne({ barcode: barcode });
            return res.status(200).json(ApiResponse.response(200, 'products', products));
        }

        const productData = await Product.aggregate([
            {
                $addFields: {
                    "searchId": { $toObjectId: "$categoryId" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "searchId",
                    foreignField: "_id",
                    as: "categoriesData"
                }
            },
            {
                $addFields: {
                    category: { $first: "$categoriesData" },
                }
            },
            {
                $unset: ["searchId", "categoriesData"]
            },
            { $skip: options.skip },
            { $limit: options.limit }
        ]);

        const totalProductsCount = await Product.countDocuments();

        res.status(200).json(ApiResponse.paginateResponse(
            200,
            'products',
            productData,
            totalProductsCount,
            page,
            options.limit
        ));
        
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(500, 'Internal server error'));
    }
}
