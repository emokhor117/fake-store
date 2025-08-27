import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct} from './services/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [titleFilter, setTitleFilter] = useState('');
  const [priceMinFilter, setPriceMinFilter] = useState('');
  const [priceMaxFilter, setPriceMaxFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchData = async (filters = {}) => {
    const data = await getProducts(filters);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  const handleSubmit = async (formData) => {
    if (editProduct) {
      await updateProduct(editProduct.id, formData);
    } else {
      await createProduct(formData);
    }
    setShowForm(false);
    fetchData();
  };

  const handleFilter = () => {
    const filters = {};
    if (titleFilter) filters.title = titleFilter;
    if (priceMinFilter) filters.price_min = priceMinFilter;
    if (priceMaxFilter) filters.price_max = priceMaxFilter;
    if (categoryFilter) filters.categoryId = categoryFilter;

    fetchData(filters);
  };

  return (
    <div className="container">
      <h1>🛍️ JOY Clothing Store Admin Page</h1>

      
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={priceMinFilter}
          onChange={(e) => setPriceMinFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={priceMaxFilter}
          onChange={(e) => setPriceMaxFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Category ID"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <button onClick={handleFilter}>🔍 Filter</button>
        <button onClick={() => {
          setTitleFilter('');
          setPriceMinFilter('');
          setPriceMaxFilter('');
          setCategoryFilter('');
          fetchData();
        }}>🔄 Reset</button>
      </div>

      <button className="add-btn" onClick={handleAdd}>➕ Add Product</button>
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          initialData={editProduct}
        />
      )}
    </div>
  );
}

export default App;
