import React, {useCallback, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Api, {CATEGORIES_URL, CATEGORY_URL} from "../helpers/Api";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormInput from "../components/form/FormInput";

const AddEditCategory = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;

    const validationSchema = yupResolver(
        Yup.object().shape({
            name: Yup.string()
                .required('Name is required')
        })
    );

    const {register, handleSubmit, reset, control, errors} = useForm({
        resolver: validationSchema
    });


    function onSubmit(data) {
        return isAddMode
            ? createCategory(data)
            : updateCategory(id, data);
    }

    const createCategory = async (data) => {
        const response = await Api.post(CATEGORIES_URL, data);
        if (response.status === 200){
            navigate('/categories');
        }
    }

    const updateCategory = async (id, data) => {
        const response = await Api.put(CATEGORY_URL(id), data);
        if (response.status === 200){
            navigate('/categories');
        }
    }

    const fetchData = useCallback(async () => {
        const response = await Api.get(CATEGORY_URL(id));
        reset(response.data)
    }, [id, reset])

    useEffect(() => {
        if (!isAddMode) {
            fetchData().catch(console.log)
        }
    }, [fetchData, isAddMode]);

    return (
        <>
            <Card className='mt-4'>
                <Card.Body>
                    <h4 className="header-title">{isAddMode ? 'Add Category' : 'Update Category'}</h4>
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
                                                key="name"
                                                errors={errors}
                                                control={control}
                                            />
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

export default AddEditCategory;