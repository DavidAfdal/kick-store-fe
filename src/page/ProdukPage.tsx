import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

interface ImagePreview {
  id: string;
  url: string;
}

interface SizeQuantity {
  id: string;
  size: string;
  quantity: string;
}

const ProdukPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoding, setIsLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [discount, setDiscount] = useState('0');
  const [category, setCategory] = useState('RUNNERS');
  const [gender, setGender] = useState('MALE');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<ImagePreview | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [sizes, setSizes] = useState<SizeQuantity[]>([]);
  const [currentSize, setCurrentSize] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnail(file);

      // Create a preview URL for the thumbnail
      const url = URL.createObjectURL(file);
      setThumbnailPreview({ id: uuidv4(), url });

      // Clean up the object URL after usage
      URL.revokeObjectURL(file as any);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Check if the number of files is between 1 and 3
      if (filesArray.length < 3 || filesArray.length > 3) {
    
        toast.error('Please select 3 images.'), {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        };

        return;
      }

      // Clear the previous image previews
      setImages(filesArray);

      const previewArray = filesArray.map((file) => ({
        id: uuidv4(),
        url: URL.createObjectURL(file),
      }));

      setImagePreviews(previewArray);

      // Clean up the object URLs after image load
      filesArray.map((file) => URL.revokeObjectURL(file as any));
    }
  };

  const handleAddSize = () => {
    if (currentSize && currentQuantity) {
      setSizes([...sizes, { id: uuidv4(), size: currentSize, quantity: currentQuantity }]);
      setCurrentSize('');
      setCurrentQuantity('');
    }
  };

  const handleRemoveSize = (id: string) => {
    setSizes(sizes.filter(size => size.id !== id));
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('desc', description);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('category', category);
    formData.append('type', gender);
    formData.append('sizes', JSON.stringify(sizes));
    
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    
    if(images) {

      images.forEach((image) => {
        formData.append(`images`, image, image.name);
      });
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shoe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    


      toast.success('Product added successfully!'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      };

      setIsLoading(false)



      setTimeout(() => {
        navigate('/admin/products');
      }, 2000)
      // Optionally, clear form fields or perform other actions upon successful submission
    } catch (error: any) {
      toast.error(error.message as string), {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      };
      // Handle error states
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between max-w-[1100px] mx-auto mb-8">
        <h1 className="text-3xl font-bold">Add Products</h1>
      </div>
      <form className="max-w-[1100px] mx-auto" onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label htmlFor="productName" className="block font-medium mb-2">Product Name</label>
          <input id="productName" type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={productName} onChange={(e) => setProductName(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block font-medium mb-2">Description</label>
          <textarea id="description" className="w-full p-2 border border-gray-300 rounded-lg" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="price" className="block font-medium mb-2">Price</label>
          <input id="price" type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="discount" className="block font-medium mb-2">Discount</label>
          <input id="discount" type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={discount} onChange={(e) => setDiscount(e.target.value)}/>
        </div>
        <div className="mb-5">
          
          <label htmlFor="category" className="block font-medium mb-2">Category</label>
          <select id="category" className="w-full p-2 border border-gray-300 rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="RUNNERS">Runners</option>
            <option value="CASUAL">Casual</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="OUTDOR">Outdor</option>
            <option value="GOLF">Golf</option>
            <option value="HIKING">Hiking</option>
          </select>
          {/* <input id="category" type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
        </div>
        <div className="mb-5">
          <label htmlFor="image" className="block font-medium mb-2">Add Thumbnail</label>
          <input id="image" type="file" className="w-full p-2 border border-gray-300 rounded-lg" onChange={handleThumbnailChange} />
          <div className="flex flex-wrap gap-4 mt-4">
            {thumbnailPreview && (
              <div
                key={thumbnailPreview.id}
                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
              >
                <img src={thumbnailPreview.url} alt="preview" className="w-full h-full object-cover rounded-md" />
              </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="image" className="block font-medium mb-2">Add Image</label>
          <input id="image" type="file" className="w-full p-2 border border-gray-300 rounded-lg" multiple onChange={handleImageChange} />
          <div className="flex flex-wrap gap-4 mt-4">
            {imagePreviews.map((image) => (
              <div
                key={image.id}
                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
              >
                <img src={image.url} alt="preview" className="w-full h-full object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="gender" className="block font-medium mb-2">Gender</label>
          <select id="gender" className="w-full p-2 border border-gray-300 rounded-lg" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block font-medium mb-2">Sizes and Quantities</label>
          <div className="flex gap-4 items-center mb-3">
            <input
              type="text"
              placeholder="Size"
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
              value={currentSize}
              onChange={(e) => setCurrentSize(e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantity"
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-[#4C3BCF] text-white rounded-lg"
              onClick={handleAddSize}
            >
              Add
            </button>
          </div>
          <div>
            {sizes.map((sizeQuantity) => (
              <div key={sizeQuantity.id} className="flex gap-4 items-center mb-3">
                <span className="w-1/2 p-2 border border-gray-300 rounded-lg">{sizeQuantity.size}</span>
                <span className="w-1/2 p-2 border border-gray-300 rounded-lg">{sizeQuantity.quantity}</span>
                <button
                  type="button"
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  onClick={() => handleRemoveSize(sizeQuantity.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-[#4C3BCF] text-white py-2 px-4 rounded-lg w-full ">Submit</button>
      </form>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </div>
  );
};

export default ProdukPage;
