import { z } from "zod";
import { ObjectId } from "mongodb";

export const productsValidator = z.object({
    // _id: z.string().optional(),
    barcode: z.string({ required_error: "Barcode is required." }).or(z.number({ required_error: "Barcode is required." })),
    name: z.string().min(3),
    price: z.string({ required_error: "Price is required." }).or(z.number({ required_error: "Price is required." })),
    status: z.string().optional(),
    company: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    sku: z.string().optional(),
    weight: z.string().optional(),
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    origin: z.string().optional(),
    unit: z.string().optional(),
    tax: z.string().optional(),
    discount: z.string().optional(),
    stock: z.string().optional(),
    description: z.string().min(3).optional(),
    image: z.any().optional(),
    categoryId: z.string().optional().transform(value => new ObjectId(value)),
    storeId: z.string().optional().transform(value => new ObjectId(value)),
});

export type productsValidatorType = z.infer<typeof productsValidator>;
