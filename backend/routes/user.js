import express from 'express';
import { getUserDetails, getUserProfile, getUsers, login, logout, resetPassword, resetPasswordMailer, signUp, updatePassword, updateUserProfile } from "../controllers/userController.js";
import { authorize, isAuthenticatedUser } from '../Middleware/auth.js';

const router= express.Router();

router.route('/user/signup').post(signUp);
router.route('/user/login').get(login);
router.route('/logout').get(logout);
router.route('/user/resetpassword').post(resetPasswordMailer);
router.route('/user/password/reset/:token').post(resetPassword)
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/updatePassword').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateUserProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorize('admin'),getUsers);
router.route('/admin/userDetails/:id').get(isAuthenticatedUser,authorize('admin'),getUserDetails);

export default router;
