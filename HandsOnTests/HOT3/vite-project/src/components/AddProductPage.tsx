"use client"
import { useState } from "react";
import {productCreateSchema} from "../schemas/loginschema";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { z } from "zod";
import Navbar from "./Navbar";



function AddProductPage() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const showSuccess = (message: string) => {
    toast(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      description,
      category, 
      price: Number(price),
    };

  try {
    const validatedData = productCreateSchema.parse(updatedData);
    await api.post(`/api/products/`, validatedData);
    showSuccess("Product created successfully");
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
    showError("Failed to Add Product");
    console.error("Error updating profile:", err);
  }
}


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
        <form onSubmit={createProduct}>
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
                Create Product
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </section>
    </>
  )
}

export default AddProductPage
