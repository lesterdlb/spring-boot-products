import React, {createElement} from 'react';
import {useForm} from 'react-hook-form';

const VerticalForm = (props) => {
    const {
        defaultValues,
        resolver,
        children,
        onSubmit,
        formClass,
    } = props;

    const methods = useForm({defaultValues, resolver});
    const {
        handleSubmit,
        register,
        control,
        formState: {errors},
    } = methods;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
            {Array.isArray(children)
                ? children.map((child) => {
                    return child.props && child.props.name
                        ? createElement(child.type, {
                            ...{
                                ...child.props,
                                register,
                                key: child.props.name,
                                errors,
                                control,
                            },
                        })
                        : child;
                })
                : children}
        </form>
    );
};

export default VerticalForm;
