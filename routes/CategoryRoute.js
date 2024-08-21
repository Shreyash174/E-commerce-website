import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, CreateCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/CategoryController.js';

const router = express.Router()

//routes
//create category
router.post('/create-category',CreateCategoryController)

//update category
router.put('/update-category/:id', updateCategoryController)

//get all Category
router.get('/get-category',categoryController)

//delete category
router.delete('/delete-category/:id',deleteCategoryController)

//single category
router.get('/single-category/:slug',singleCategoryController)

export default router