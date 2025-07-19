import { useState } from "react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dv4ksqald/image/upload";
const UPLOAD_PRESET = "unsigned_preset";

function ProductForm({ onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.category?.id || initialData?.categoryId || ""
  );
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setIsUploading(true);
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await handleImageUpload();
    } else if (initialData?.images?.length > 0) {
      imageUrl = initialData.images[0];
    }

    if (!imageUrl) {
      alert("Image upload failed. Try again.");
      return;
    }

    const payload = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [imageUrl],
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Failed to submit product:", error);
      alert("Something went wrong while submitting the product.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>{initialData ? "Edit Product" : "Add Product"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Category ID"
          value={categoryId}
          required
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {initialData?.images?.length > 0 && !imageFile && (
          <img
            src={initialData.images[0]}
            alt="Preview"
            style={{ width: "100px", marginTop: "10px", borderRadius: "6px" }}
          />
        )}

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Save Product"}
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
