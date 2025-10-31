import express from 'express';
const router = express.Router();
import joi from 'joi';
import debug from 'debug';
const debugProducts = debug('app:products');
import { getProducts, getOneProduct, createProduct, getProductByName, updateProduct, deleteProduct } from '../../database.js';
import { validId } from '../../middleware/validId.js';
import { validate } from '../../middleware/joiValidater.js';
import { hasRole } from '../../middleware/hasRole.js';
import { newProductSchema, updateProductSchema } from '../../validation/productSchema.js';
import { isAuthenticated } from '../../middleware/isAuthenticated.js';

router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  try {
  const {keywords, category, minPrice, maxPrice, pageNumber, pageSize, sortBy} = req.query;

    const pageNum = parseInt(pageNumber) || 1;
    const limitNum = parseInt(pageSize) || 5;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const filter = {};
    if (keywords) { filter.$text = { $search: keywords }; }
    if (category) { filter.category = category; }

    if (maxPrice || minPrice){
      const priceFilter = {}

      if (maxPrice) {priceFilter.$gte = parseInt(maxPrice)}
      if (minPrice) {priceFilter.$lte = parseInt(minPrice)}

      filter.price = priceFilter
    }

    
    const sortOptions = {
      name: {name: 1},
      category: {category: 1, name: 1},
      lowestPrice: {price: 1, name: 1},
      newest: {creationDate: -1, name: 1},
    };
    const sort = sortOptions[sortBy] || {name: 1}
    

    const products = await getProducts(filter, sort, limitNum, skip);
    if (!products){
    return res.status(500).send('Error retrieving users')
  }else {
  res.status(200).json(products);
  }
  }
  catch (err) {
    return res.status(500).send('Error')
  }
  
});

router.get('/:productId', isAuthenticated, validId('productId'), async (req, res) => {
  try {
    const productId = req.productId;
    const product = await getOneProduct(productId);
   try {
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status (500).json({ error: 'Internal Server Error' });
  }} catch (error) {
    res.status(404).json({ error: 'Invalid ID' });
  }
});

router.get('/name/:productName', isAuthenticated, async (req, res) => {
  try {
    const productName = req.params.productName;
    const product = await getProductByName(productName);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', isAuthenticated, hasRole('admin'), validate(newProductSchema), async (req, res) => {
  try { 
    const newProduct = req.body;
    newProduct.creationDate = new Date()
    const result = await createProduct(newProduct);
    if (result.insertedId) {
      res.status(201).json({ message: 'Product created', productId: result.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create product' });
    }}
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/:productId', isAuthenticated, hasRole('admin'), validId('productId'), validate(updateProductSchema), async (req, res) => {
  try {
    const productId = req.productId;
    const product = await getOneProduct(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const updatedData = req.body;
    updatedData.lastUpdatedOn = new Date();
    const result = await updateProduct(productId, updatedData);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: `Product with id ${productId} updated`, productId });
    } else {
      res.status(404).json({ error: 'product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:productId', isAuthenticated, hasRole('admin'), validId('productId'), async (req,res)=> {
  const productId = req.productId;
  try {
    const results = await deleteProduct(productId);
    if (results.deletedCount === 1 ) {
      res.status(200).json({message: 'Product deleted successfully', productId})
    } else {
      res.status (404).json({message: `Product ${productId} not found`})
    }
  } catch (error) {
    return res.status(500).json({message: 'server Error'})
  }
})

export { router as productsRouter };