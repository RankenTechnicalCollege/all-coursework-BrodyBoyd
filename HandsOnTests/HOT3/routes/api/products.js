import express from 'express';
const router = express.Router();
import joi from 'joi';
import debug from 'debug';
const debugProducts = debug('app:products');
import { getProducts, getOneProduct, createProduct, getProductByName, updateProduct, deleteProduct } from '../../database.js';
import { validId } from '../../middleware/validId.js';
import { validate } from '../../middleware/joiValidater.js';
import { newProductSchema, updateProductSchema } from '../../validation/productSchema.js';

router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
  try {
  const products = await getProducts();
  if (!products) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  } else {
    res.status(200).json(products);
  }}
  catch (error) {
    debugProducts(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:productId', validId('productId'), async (req, res) => {
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

router.get('/name/:productName', async (req, res) => {
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

router.post('/', validate(newProductSchema), async (req, res) => {
  try { 
    const newProduct = req.body;
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

router.patch('/:productId', validId('productId'), validate(updateProductSchema), async (req, res) => {
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

router.delete('/:productId', validId('productId'), async (req,res)=> {
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