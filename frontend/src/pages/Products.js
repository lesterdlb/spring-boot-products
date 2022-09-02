import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';

import Api, {PRODUCT_URL, PRODUCTS_URL} from "../helpers/Api";
import {Container, Image} from "react-bootstrap";

function Products() {
    const [products, setProducts] = useState(null);

    const fetchData = useCallback(async () => {
        const response = await Api.get(PRODUCTS_URL);
        setProducts(response.data)
    }, [])

    useEffect(() => {
        fetchData().catch(console.log);
    }, [fetchData]);

    const deleteProduct = async (id) => {
        setProducts(products.map(x => {
            if (x.id === id) {
                x.isDeleting = true;
            }
            return x;
        }));
        const response = await Api.delete(PRODUCT_URL(id));
        if (response.status === 200) {
            setProducts(products => products.filter(x => x.id !== id));
        }
    }

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