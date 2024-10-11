import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  // State สำหรับ input fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleAddProduct = () => {
    if (name && price && description) {
      const newProduct = {
        id: productList.length + 1,
        name,
        price,
        description,
      };
      dispatch(addProduct(newProduct));

      // Reset ค่า input fields หลังจากเพิ่ม product
      setName('');
      setPrice('');
      setDescription('');
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}  >Product List</h2>
      <div style={styles.productContainer}>
        <ul style={styles.list}>
          {productList.map((product) => (
            <li key={product.id} style={styles.listItem}>
              <Link to={`/product/${product.id}`} style={styles.link}>
                {product.name} - {product.price}
              </Link>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <h3 style={styles.formTitle}>Add a new product</h3>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddProduct} style={styles.addButton}>
          Add Product
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'black',
    
  },
  productContainer: {
    width: '400px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '10px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Products;
