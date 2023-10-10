import express from'express';
import { addAdmin, deleteUser } from '../controllers/admin.controller';
import {  getAllPharmacists , getPendingPharmacists , getPharmacistByID } from '../controllers/admin.controller';
import userValidator from '../validators/user.validator';
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
const router=express.Router();
router.use(express.json());
router.route('/add-admin').post(validateRegistrationData(userValidator),addAdmin)
router.route('/getAllPharmacists').get(getAllPharmacists)
router.route('/getPendingPharmacists').get(getPendingPharmacists)
router.route('/getPharmacistByID/:id').get(getPharmacistByID)
router.route('/removeUser').delete(deleteUser)


export default router;

