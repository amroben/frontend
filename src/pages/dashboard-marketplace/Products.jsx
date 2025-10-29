import { useState, useEffect } from "react";
import { Search, Plus, X, Edit, Trash2, ToggleRight } from "lucide-react";

export default function Products() {
const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeRow, setActiveRow] = useState(null); // الصف النشط
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // هل popup للتعديل؟
  const [editingId, setEditingId] = useState(null); // id للتعديل
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "LYB",
    stock: "",
    categories: "",
    images: "",
  });
const [selectedProduct, setSelectedProduct] = useState(null);
const [showImages, setShowImages] = useState(false);

  const token = localStorage.getItem("token");
const [imageFiles, setImageFiles] = useState([]); // هنا نحتفظ بالملفات المختارة من الجهاز
const filteredProducts = products.filter(
  (p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
);
  // ✅ تحميل المنتجات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  // ✅ تغيير حالة المنتج
  const toggleActive = async (product) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !product.isPublished }),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, isPublished: data.product.isPublished } : p))
        );
        setActiveRow(null);
      } else alert(data.message || "Error updating product");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  // ✅ حذف المنتج
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setActiveRow(null);
      } else alert(data.message || "Error deleting product");
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  // ✅ فتح popup إضافة أو تعديل
  const openPopup = (product = null) => {
    if (product) {
      // تعديل
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        currency: product.currency,
        stock: product.stock,
        categories: product.categories.join(", "),
        images: product.images.join(", "),
      });
      setIsEdit(true);
      setEditingId(product._id);
      setActiveRow(product._id); // إبقاء الصف نشط أثناء التعديل
    } else {
      // إضافة
      setFormData({
        title: "",
        description: "",
        price: "",
        currency: "USD",
        stock: "",
        categories: "",
        images: "",
      });
      setIsEdit(false);
      setEditingId(null);
      setActiveRow(null);
    }
    setShowPopup(true);
  };

const uploadImages = async () => {
  if (imageFiles.length === 0) return [];

  const formDataObj = new FormData();
  imageFiles.forEach(file => formDataObj.append("images", file));

  try {
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formDataObj,
    });
    const data = await res.json();
    return data.urls || [];
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to upload images");
    return [];
  }
};
  // ✅ حفظ التعديلات أو إضافة منتج
const handleSubmit = async (e) => {
  e.preventDefault();

  // رفع الصور الجديدة أولًا
  const uploadedUrls = await uploadImages();

  // الاحتفاظ بالصور القديمة من formData
  const oldImages = formData.images
    ? formData.images.split(",").map(url => url.trim())
    : [];

  // دمج الصور القديمة والجديدة
  const mergedImages = [...oldImages, ...uploadedUrls];

  const body = {
    ...formData,
    price: Number(formData.price),
    stock: Number(formData.stock),
    categories: formData.categories.split(",").map(c => c.trim()),
    images: mergedImages,
  };

  try {
    const url = isEdit
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      if (isEdit) {
        setProducts(prev => prev.map(p => (p._id === editingId ? data.product : p)));
      } else {
        setProducts(prev => [data.product, ...prev]);
      }

      // مسح الإعدادات بعد الإضافة/التعديل
      setShowPopup(false);
      setEditingId(null);
      setActiveRow(null);
      setImageFiles([]);
    } else {
      alert(data.message || "Error saving product");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};



  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Products</h2>
        <p className="text-slate-400">Manage your product inventory</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative">
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg font-semibold text-white">Product Inventory</h3>
          <div className="relative hidden sm:block mb-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
/>

          </div>
          <button
            onClick={() => openPopup()}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* جدول المنتجات */}
        <div className="overflow-x-auto relative">
          {loading ? (
            <p className="text-slate-400 text-center py-6">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-slate-400 text-center py-6">No products yet.</p>
          ) : (
            <table className="w-full relative">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>


                {filteredProducts.map((p) => (
                  <tr
                    key={p._id}
                    className={`border-b border-slate-700/50 relative cursor-pointer`}
                    onClick={() => setActiveRow(activeRow === p._id ? null : p._id)}
                  >
                    <td className={`py-4 px-4 text-white ${activeRow === p._id ? "blur-sm" : ""}`}>
                      {p.title}
                    </td>
                    <td className={`py-4 px-4 text-white font-semibold ${activeRow === p._id ? "blur-sm" : ""}`}>
                      {p.price} {p.currency}
                    </td>
                    <td className={`py-4 px-4 text-slate-400 ${activeRow === p._id ? "blur-sm" : ""}`}>
                      {p.stock}
                    </td>
                    <td className={`py-4 px-4 ${activeRow === p._id ? "blur-sm" : ""}`}>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        p.isPublished ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                      }`}>
                        {p.isPublished ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Overlay أزرار */}
                    {activeRow === p._id && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="flex gap-2 p-2 rounded-xl pointer-events-auto backdrop-blur-md border border-slate-700/50 shadow-2xl">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openPopup(p);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:shadow-lg"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProduct(p._id);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleActive(p);
                            }}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:shadow-lg ${
                              p.isPublished ? "bg-gray-500 text-white" : "bg-green-500 text-white"
                            }`}
                          >
                            <ToggleRight className="w-4 h-4" /> {p.isPublished ? "Deactivate" : "Activate"}
                          </button>
                          <button
  onClick={(e) => {
    e.stopPropagation();
    setSelectedProduct(p);
    setShowImages(true);
  }}
  className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:shadow-lg"
>
  <Search className="w-4 h-4" /> Show
</button>

                        </div>
                      </div>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Popup إضافة / تعديل منتج */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-semibold text-white mb-4">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  required
                />
                <input
                  type="text"
                  name="currency"
                  placeholder="Currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
                <input
                  type="text"
                  name="categories"
                  placeholder="Categories (comma separated)"
                  value={formData.categories}
                  onChange={handleChange}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
  <label className="block text-slate-400 mb-1">Upload Images</label>
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => setImageFiles(Array.from(e.target.files))}
    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
  />
</div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                {isEdit ? "Save Changes" : "Add Product"}
              </button>
            </form>
          </div>
        </div>





    )}
    {showImages && selectedProduct && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-3xl relative">
      <button
        onClick={() => setShowImages(false)}
        className="absolute top-4 right-4 text-slate-400 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <h3 className="text-xl font-semibold text-white mb-6">
        Product Images — {selectedProduct.title}
      </h3>

      {selectedProduct.images?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {selectedProduct.images.map((imgUrl, idx) => (
            <div key={idx} className="relative group">
              <img
                src={imgUrl.startsWith("http") ? imgUrl : `http://localhost:5000${imgUrl}`}
                alt={`Product ${idx}`}
                className="rounded-lg border border-slate-700 object-cover w-full h-32"
              />
              <button
                onClick={async () => {
                  if (!confirm("Delete this image?")) return;
                  try {
                    const res = await fetch(
                      `http://localhost:5000/api/products/${selectedProduct._id}/remove-image`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ imageUrl: imgUrl }),
                      }
                    );
                    const data = await res.json();
                    if (res.ok) {
                      setSelectedProduct(data.product);
                      setProducts((prev) =>
                        prev.map((p) => (p._id === data.product._id ? data.product : p))
                      );
                    } else alert(data.message || "Error deleting image");
                  } catch (err) {
                    console.error(err);
                    alert("Network error");
                  }
                }}
                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-90 hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-center py-10">No images uploaded for this product.</p>
      )}
    </div>
  </div>
)}
    </>
  );
}
