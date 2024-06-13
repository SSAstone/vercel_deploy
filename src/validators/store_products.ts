import { z } from "zod";
import { ObjectId } from "mongodb";

export const storeProductsValidator = z.object({
    product: z.string().transform(value => new ObjectId(value)),
    stock: z.number(),
    expired: z.date(),
    manufactured: z.date(),
    storePrice: z.number().optional(),
    discount: z.number().optional(),
    batchNo: z.string().optional(),
});

export type storeProductsValidatorType = z.infer<typeof storeProductsValidator>;


