import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, CreateProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, ProductFiltersController, ProductImageController, productListController, realtedProductController, searchProductController, updateProductController } from '../controller/ProductController.js';
import formidable from 'express-formidable';

const router = express.Router();

// Routes
router.post('/create-product',  formidable(), CreateProductController);

// Get products
router.get('/get-product', getProductController);

// Get single product
router.get('/get-product/:slug', getSingleProductController);

// Get product image
router.get('/product-image/:pid', ProductImageController);

// Update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter prod
router.post('/product-filter',ProductFiltersController)

//search prod
router.get('/search/:keyword',searchProductController)

//similar prods
router.get('/related-product/:pid/:cid', realtedProductController)

//prod count
router.get('/product/product-count',productCountController)

//prod page
router.get('/product-list/:page',productListController)

//category-wise product
router.get('/product-category/:slug',productCategoryController)

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);


//payments
router.post("/braintree/payment",requireSignIn, brainTreePaymentController);
export default router;
