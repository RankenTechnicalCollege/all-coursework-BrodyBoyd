
import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api';
import {productEditSchema} from '../schemas/loginschema';
import { z } from "zod";
import {toast } from 'react-toastify';
import Navbar from './Navbar';

// type Props = {
// 	user: User
// }

function ProductEditor() {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  function showError(message: string) {
        toast(message, { type: 'error', position: 'bottom-right' });
      }
      function showSuccess(message: string) {
        toast(message, { type: 'success', position: 'bottom-right' });
      }

	const location = useLocation();
  const product = (location.state as { product: any }).product;
  console.log("Editing product:", product);
  const productId = product._id;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.get(`/api/products/${productId}`);
        const productData = response.data;
        if (productData) {
          if (productData.price) setPrice(productData.price.toString());
          if (productData.name) setName(productData.name);
          if (productData.category) setCategory(productData.category);
          if (productData.description) setDescription(productData.description);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProductData();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = {
    name: name,
    category: category,
    price: Number(price),
    description: description,
  }
    try {
      const validatedData = productEditSchema.parse(formData);
      // const validData = JSON.stringify(validatedData)
      await api.patch(`/api/products/${productId}`, validatedData);
      showSuccess("Product updated successfully");
      navigate('/');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(fieldErrors);
        return;
      }
      showError("Failed to update product");
      console.error("Error updating user:", err);
    }
  };

  const deleteProduct = async () => {
    try {
      await api.delete(`/api/products/${productId}`);
      showSuccess("Product deleted successfully");
      navigate('/');
    } catch (error) {
      showError("Failed to delete product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
    <Navbar />
    <section className="py-40 bg-blue-100  bg-opacity-50 h-full">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-200 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
            
              <h1 className="text-gray-800">{name}</h1>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="bg-white space-y-6">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto text-gray-800">Product Details</h2>
            <div className=" flex flex-col">
            <div className="md:w-2/3 max-w-sm mx-auto flex flex-col">
              <label className="text-sm text-gray-800">Product Price</label>
              <div className="w-full inline-flex border">
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  // placeholder={user.email}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                
              </div>
              {validationErrors.price && (
                <p className="text-sm text-red-500">{validationErrors.price}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-800">Product Name</label>
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    // placeholder={user.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {validationErrors.name && (
                <p className="text-sm text-red-500">{validationErrors.name}</p>
              )}
          </div>
          <div>
              <label className="text-sm text-gray-800">Product Category</label>
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    // placeholder={user.name}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                {validationErrors.name && (
                <p className="text-sm text-red-500">{validationErrors.name}</p>
              )}
          </div>
          <div>
              <label className="text-sm text-gray-800">Product Description</label>
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    // placeholder={user.name}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {validationErrors.name && (
                <p className="text-sm text-red-500">{validationErrors.name}</p>
              )}
          </div>
          </div>
          </div>
          <hr/>
          <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <div className="md:w-3/12 text-center md:pl-6">
              <button type='submit' className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:cursor-pointer">
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Update
              </button>
            </div>
          </div>

          <hr />
          
          <div className="w-full p-4 text-right text-gray-500">
            <button onClick={deleteProduct} type='button' className=" inline-flex items-center focus:outline-none mr-4 text-gray-800">
              <svg
                fill="none"
                className="w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Product
            </button>
          </div>
        </div>
      </form>
      </div>
    </section>
    </>
  )
}

export default ProductEditor
