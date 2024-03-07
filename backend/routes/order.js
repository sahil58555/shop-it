import express from 'express';
import { createOrder, getAllOrders, getOrderDetails, getOrders } from '../controllers/orderController.js';
import { authorize, isAuthenticatedUser } from '../Middleware/auth.js';

const router= express.Router();

router.route("/user/createOrder").put(isAuthenticatedUser,createOrder);
router.route("/user/order/:id").get(isAuthenticatedUser,getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser,getOrders);
router.route("/admin/getOrders").get(isAuthenticatedUser,authorize("admin"),getAllOrders);

export default router;