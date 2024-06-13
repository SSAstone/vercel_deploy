import { Router } from "express";
import createProduct, { allProducts } from "./controllers/create_product";
import { validateRequest } from "../../middleware/validation";
import { verifyAccessToken } from "../../middleware/auth";
import { productsValidator } from "../../validators/products";
import editProduct, { deleteProduct } from "./controllers/edit_product";

const productRouter = Router();
productRouter.get("/:id?", allProducts)
productRouter.post("/:id?", verifyAccessToken, validateRequest(productsValidator),  createProduct)
productRouter.post("/:id", verifyAccessToken,   editProduct)
productRouter.delete("/:id", verifyAccessToken, deleteProduct)

export default productRouter
