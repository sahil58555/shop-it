import express from 'express'
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from '../controllers/productControllers.js';
import { isAuthenticatedUser,authorize } from '../Middleware/auth.js';
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/addProduct").post(isAuthenticatedUser,authorize("admin"),newProduct);
router.route("/getProduct/:id").get(getProductDetails);
router.route("/admin/updateProduct/:id").put(isAuthenticatedUser,authorize("admin"),updateProduct);
router.route("/admin/deleteProduct/:id").delete(isAuthenticatedUser,authorize("admin"),deleteProduct);
 

export default router;

