import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Api, {CATEGORIES_URL, PRODUCT_URL, PRODUCTS_URL} from "../helpers/Api";
import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import FormInput from "../components/form/FormInput";
import useAuth from "../hooks/useAuth";

const AddEditProduct = () => {
    const auth = useAuth();
    const [categories, setCategories] = useState(null);
    const [imageFile, setImageFile] = useState();
    const [currentImage, setCurrentImage] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;

    const validationSchema = yupResolver(
        Yup.object().shape({
            name: Yup.string().required('Name is required'),
            category: Yup.string().required('Category is required'),
        })
    );

    const {
        handleSubmit,
        register,
        control,
        formState: {errors},
        setValue
    } = useForm({
        resolver: validationSchema
    });

    function onSubmit(data) {
        return isAddMode
            ? createProduct(data)
            : updateProduct(id, data);
    }

    const createProduct = async (data) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('image', imageFile);
        formData.append('category', data.category);

        const response = await Api.post(PRODUCTS_URL, formData);
        if (response.status === 200) {
            navigate('/products');
        }
    }

    const updateProduct = async (id, data) => {
        const formData = new FormData();

        formData.append('name', data.name);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        formData.append('category', data.category);

        const response = await Api.put(PRODUCT_URL(id), formData);
        if (response.status === 200) {
            navigate('/products');
        }
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    }

    const fetchData = useCallback(async () => {
        const response = await Api.get(PRODUCT_URL(id));
        setValue('name', response.data.name);
        setValue('category', response.data.category.id);

        if (!isAddMode) {
            setCurrentImage(response.data.image);
        }
    }, [isAddMode, setValue, id])

    const fetchCategories = useCallback(async () => {
        const categoriesResponse = await Api.get(CATEGORIES_URL);
        setCategories(categoriesResponse.data);
    }, [])

    useEffect(() => {
        if (!isAddMode) {
            fetchData().catch(console.log);
        }
    }, [fetchData, isAddMode]);

    useEffect(() => {
        fetchCategories().catch(console.log);
    }, [fetchCategories]);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);

    return (
        <>
            <Card className='mt-4'>
                <Card.Body>
                    <h4 className="header-title">{isAddMode ? 'Add Product' : 'Update Product'}</h4>
                    <Row>
                        <Col xs={12}>
                            <div className="p-2">
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group as={Row} className="mb-2">
                                        <Form.Label column md={2}>
                                            Name
                                        </Form.Label>
                                        <Col md={10}>
                                            <FormInput
                                                type="text"
                                                name="name"
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2">
                                        <Form.Label column md={2}>
                                            Image
                                        </Form.Label>
                                        <Col md={10}>
                                            {(currentImage && !isAddMode) && (
                                                <Image height='100' src={currentImage} alt=''/>
                                            )}
                                            <FormInput
                                                type="file"
                                                name="image"
                                                register={register}
                                                errors={errors}
                                                control={control}
                                                onChange={handleFileChange}
                                                required={isAddMode}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2">
                                        <Form.Label column md={2}>
                                            Category
                                        </Form.Label>
                                        <Col md={10}>
                                            <FormInput
                                                type="select"
                                                name="category"
                                                className="form-select"
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            >
                                                <option value=''>Open this select menu</option>
                                                {categories && categories.map(category => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </FormInput>
                                        </Col>
                                    </Form.Group>
                                    <div className="d-grid text-center">
                                        <Button type="submit">Submit</Button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default AddEditProduct;