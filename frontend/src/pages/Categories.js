import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';

import Api, {CATEGORIES_URL, CATEGORY_URL} from "../helpers/Api";
import {Container} from "react-bootstrap";

function Categories() {
    const [categories, setCategories] = useState(null);

    const deleteCategory = async (id) => {
        setCategories(categories.map(x => {
            if (x.id === id) {
                x.isDeleting = true;
            }
            return x;
        }));
        const response = await Api.delete(CATEGORY_URL(id));
        if (response.status === 200) {
            setCategories(categories => categories.filter(x => x.id !== id));
        }
    }

    const fetchData = useCallback(async () => {
        const response = await Api.get(CATEGORIES_URL);
        setCategories(response.data)
    }, [])

    useEffect(() => {
        fetchData().catch(console.log);
    }, [fetchData]);

    return (
        <Container>
            <h1>Categories</h1>
            <Link to={`add`} className="btn btn-sm btn-success mb-2">Add Category</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th style={{width: '30%'}}>Name</th>
                    <th style={{width: '10%'}}></th>
                </tr>
                </thead>
                <tbody>
                {categories && categories.map(category =>
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td style={{whiteSpace: 'nowrap'}}>
                            <Link to={`./edit/${category.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                            {' '}
                            <button onClick={() => deleteCategory(category.id)}
                                    className="btn btn-sm btn-danger btn-delete-user" disabled={category.isDeleting}>
                                {category.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!categories &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                }
                {categories && !categories.length &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <div className="p-2">No Categories To Display</div>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </Container>
    );
}

export default Categories;