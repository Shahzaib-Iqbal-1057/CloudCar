import React, { useState } from "react";

const ProductFormPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [offerPrice, setOfferPrice] = useState("");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleOfferPriceChange = (e) => {
    setOfferPrice(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));

    setProductImages((prevImages) => [...prevImages, ...imagesArray]);

    Array.from(e.target.files).map(
      (file) => URL.revokeObjectURL(file) // avoid memory leak
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission here
    console.log({
      productName,
      productDescription,
      productImages,
      offerPrice,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            id="productName"
            className="block w-full border border-gray-300 rounded-lg p-2"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block font-medium mb-1">Product Description</label>
          <textarea
            id="productDescription"
            className="block w-full border border-gray-300 rounded-lg p-2"
            value={productDescription}
            onChange={handleProductDescriptionChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productImages" className="block font-medium mb-1">Product Images</label>
          <input
            type="file"
            id="productImages"
            className="block w-full border border-gray-300 rounded-lg p-2"
            multiple
            onChange={handleImageUpload}
          />
          <div className="flex space-x-2 mt-2">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index}`}
                className="max-w-32 h-auto rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="offerPrice" className="block font-medium mb-1">Offer Price</label>
          <input
            type="number"
            id="offerPrice"
            className="block w-full border border-gray-300 rounded-lg p-2"
            value={offerPrice}
            onChange={handleOfferPriceChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
