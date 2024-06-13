import { z } from "zod";
import { ObjectId } from "mongodb";

export const storeValidator = z.object({
    name: z.string().transform(value => new ObjectId(value)),
    storeProducts: z.array(z.string().transform(value => new ObjectId(value))),
    status: z.string().optional(),
    discount: z.string().optional(),
    description: z.string().min(3).optional(),
    image: z.any().optional(),
    storeCategoryId: z.string().optional().transform(value => new ObjectId(value)),
});

export type storeValidatorType = z.infer<typeof storeValidator>;


