import slugify from 'slugify';
import Product from '../models/ProductModel.js';
import fs from 'fs';
import CategoryModel from '../models/CategoryModel.js'
import braintree from 'braintree';
import OrderModel from '../models/OrderModel.js';
import dotenv from 'dotenv'
import ProductModel from '../models/ProductModel.js';


dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLICKEY,
    privateKey: process.env.BRAINTREE_PRIVATEKEY,
  });

export const CreateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });
        if (!image || image.size > 2000000) return res.status(400).send({ error: 'Image is required and should be less than 2MB' });

        const product = new Product({ ...req.fields, slug: slugify(name) });
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error creating product'
        });
    }
};

// Get all products
export const getProductController = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').select('-image').limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalcount: products.length,
            message: 'All Products',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        });
    }
};

// Get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).select('-image').populate('category');
        res.status(200).send({
            success: true,
            message: 'Single Product',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting single product',
            error
        });
    }
};

// Get product image
export const ProductImageController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select('image');
        if (product.image.data) {
            res.set('Content-Type', product.image.contentType);
            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting image',
            error
        });
    }
};

// Update product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });
        if (!image || image.size > 2000000) return res.status(400).send({ error: 'Image is required and should be less than 2MB' });

        const product = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error updating product'
        });
    }
};

//delete
export const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-image");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
  //filter
  export const ProductFiltersController = async (req, res) => {
    try {
      const { checked } = req.body
      console.log("Received checked categories:", checked);
      let args = {}
      if (checked && checked.length > 0) args.category = { $in: checked }
      
      console.log("Query args:", args);
      const products = await Product.find(args)
      console.log("Filtered products:", products);
      res.status(200).send({
        success: true,
        products,
      })
    } catch (error) {
      console.log("Error in ProductFiltersController:", error);
      res.status(400).send({
        success: false,
        message: "Error while Filtering Products",
        error: error.toString()
      })
    }
  }

  //search prod
  export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await ProductModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-image");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
//prod count
export const productCountController = async(req,res) => {
    try {
        const total = await ProductModel.find({}).estimateDocumentCount()
        res.status(200).send({
            success:true,
            total,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in product count',
            error,
            success:false
        })
    }
}

//prod list base on page
export const productListController = async(req,res) =>{
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await ProductModel.find({}).select('-image').skip((page-1 )* perPage).limit(perPage).sort({createdAt : -1})
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in per page control',
            error,
            success:false
    })
}
}

//get product by cat

export const productCategoryController = async(req,res) =>{
    try {
        const category = await CategoryModel.findOne({slug:req.params.slug})
        const products = await ProductModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            category,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"error while getting products"
        })
    }
}

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    console.log("Entering brainTreePaymentController");
    const { nonce, cart } = req.body;
    console.log("Received nonce:", nonce);
    console.log("Received cart:", JSON.stringify(cart));
    
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    console.log("Calculated total:", total);

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          console.log("Braintree transaction successful:", result);
          try {
            console.log('Request user:', req.user);
            if (!req.user || !req.user._id) {
              throw new Error("User not authenticated or missing user ID");
            }
            
            const order = new OrderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            });
            console.log("Order model created:", order);
            
            const savedOrder = await order.save();
            console.log("Order saved successfully:", savedOrder);
            
            res.json({ ok: true, order: savedOrder });
          } catch (saveError) {
            console.error("Order save error:", saveError);
            res.status(500).json({ error: "Failed to save order", details: saveError.message, stack: saveError.stack });
          }
        } else {
          console.error("Braintree error:", error);
          res.status(500).json({ error: "Braintree transaction failed", details: error.message });
        }
      }
    );
  } catch (error) {
    console.error("Braintree payment error:", error);
    res.status(500).json({ error: "Payment processing failed", details: error.message, stack: error.stack });
  }
};


  //similar product
  export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await ProductModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-image")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error while geting related product",
        error,
      });
    }
  };
  