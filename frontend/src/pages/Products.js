import React, {useState, useEffect, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Api, {PRODUCT_URL, PRODUCTS_URL} from "../helpers/Api";
import {Container, Image} from "react-bootstrap";
import useAuth from "../hooks/useAuth";

function Products() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);

    const deleteProduct = async (id) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                product.isDeleting = true;
            }
            return product;
        }));
        const response = await Api.delete(PRODUCT_URL(id));
        if (response.status === 200) {
            setProducts(products => products.filter(product => product.id !== id));
        }
    }

    const fetchData = useCallback(async () => {
        const response = await Api.get(PRODUCTS_URL);
        setProducts(response.data)
    }, [])

    useEffect(() => {
        fetchData().catch(console.log);
    }, [fetchData]);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);

    return (
        <Container>
            <h1>Products</h1>
            <Link to={`add`} className="btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{width: '30%'}}>Name</th>
                    <th style={{width: '30%'}}>Image</th>
                    <th style={{width: '30%'}}>Category</th>
                    <th style={{width: '10%'}}></th>
                </tr>
                </thead>
                <tbody>
                {products && products.map(product =>
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>
                            <Image height='100' src={`${product.image}`}/>
                        </td>
                        <td>{product.category.name}</td>
                        <td style={{whiteSpace: 'nowrap'}}>
                            <Link to={`./edit/${product.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            {' '}
                            <button onClick={() => deleteProduct(product.id)}
                                    className="btn btn-sm btn-danger btn-delete-user" disabled={product.isDeleting}>
                                {product.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!products &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                }
                {products && !products.length &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="p-2">No Products To Display</div>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </Container>
    );
}

export default Products;