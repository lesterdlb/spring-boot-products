import React, {useState} from 'react';
import {Form, InputGroup} from 'react-bootstrap';

const PasswordInput = (props) => {
    const {
        name,
        placeholder,
        refCallback,
        errors,
        control,
        register,
        className,
        ...otherProps
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <InputGroup className="mb-0">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    as="input"
                    ref={(r) => {
                        if (refCallback) refCallback(r);
                    }}
                    className={className}
                    isInvalid={!!(errors && errors[name])}
                    {...(register ? register(name) : {})}
                    autoComplete={name}
                    {...otherProps}
                />
                <div
                    className={'input-group-text input-group-password showPassword'}
                    data-password={showPassword ? 'true' : 'false'}
                >
                    <span
                        className="password-eye"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    ></span>
                </div>
            </InputGroup>

            {errors && errors[name] ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                    {errors[name]['message']}
                </Form.Control.Feedback>
            ) : null}
        </>
    );
};

const TextualInput = (props) => {
    const {
        type,
        name,
        placeholder,
        endIcon,
        register,
        errors,
        comp,
        rows,
        className,
        refCallback,
        ...otherProps
    } = props;

    return (
        <>
            {type === 'password' && endIcon ? (
                <>
                    <PasswordInput
                        name={name}
                        placeholder={placeholder}
                        refCallback={refCallback}
                        errors={errors}
                        register={register}
                        className={className}
                        {...otherProps}
                    />
                </>
            ) : (
                <>
                    <Form.Control
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        as={comp}
                        id={name}
                        ref={(r) => {
                            if (refCallback) refCallback(r);
                        }}
                        className={className}
                        isInvalid={!!(errors && errors[name])}
                        {...(register ? register(name) : {})}
                        rows={rows}
                        {...otherProps}
                    />

                    {errors && errors[name] ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errors[name]['message']}
                        </Form.Control.Feedback>
                    ) : null}
                </>
            )}
        </>
    );
};

const CheckInput = (props) => {
    const {
        type,
        label,
        name,
        placeholder,
        register,
        errors,
        comp,
        rows,
        className,
        refCallback,
        ...otherProps
    } = props;

    return (
        <>
            <Form.Check
                type={type}
                label={label}
                name={name}
                id={name}
                ref={(r) => {
                    if (refCallback) refCallback(r);
                }}
                className={className}
                isInvalid={!!(errors && errors[name])}
                {...(register ? register(name) : {})}
                {...otherProps}
            />

            {errors && errors[name] ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                    {errors[name]['message']}
                </Form.Control.Feedback>
            ) : null}
        </>
    );
};

const SelectInput = (props) => {
    const {
        type,
        label,
        name,
        placeholder,
        register,
        errors,
        comp,
        className,
        children,
        refCallback,
        ...otherProps
    } = props;

    return (
        <>
            <Form.Select
                type={type}
                label={label}
                name={name}
                id={name}
                ref={(r) => {
                    if (refCallback) refCallback(r);
                }}
                children={children}
                className={className}
                isInvalid={!!(errors && errors[name])}
                {...(register ? register(name) : {})}
                {...otherProps}
            />

            {errors && errors[name] ? (
                <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
            ) : null}
        </>
    );
};

const FormInput = (props) => {
    const {
        label,
        type,
        name,
        placeholder,
        endIcon,
        register,
        errors,
        control,
        className,
        labelClassName,
        containerClass,
        refCallback,
        children,
        rows,
        ...otherProps
    } = props;

    // handle input type
    const comp = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';

    const hasEndIcon = endIcon !== undefined ? endIcon : true;

    return (
        <>
            {type === 'hidden' ? (
                <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
            ) : (
                <>
                    {type === 'select' ? (
                        <Form.Group className={containerClass}>
                            {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                            <SelectInput
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                refCallback={refCallback}
                                errors={errors}
                                register={register}
                                comp={comp}
                                className={className}
                                children={children}
                                {...otherProps}
                            />
                        </Form.Group>
                    ) : (
                        <>
                            {type === 'checkbox' || type === 'radio' ? (
                                <Form.Group className={containerClass}>
                                    <CheckInput
                                        type={type}
                                        label={label}
                                        name={name}
                                        placeholder={placeholder}
                                        refCallback={refCallback}
                                        errors={errors}
                                        register={register}
                                        comp={comp}
                                        className={className}
                                        rows={rows}
                                        {...otherProps}
                                    />
                                </Form.Group>
                            ) : (
                                <Form.Group className={containerClass}>
                                    {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                                    <TextualInput
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        endIcon={hasEndIcon}
                                        refCallback={refCallback}
                                        errors={errors}
                                        register={register}
                                        comp={comp}
                                        className={className}
                                        rows={rows}
                                        {...otherProps}
                                    />
                                </Form.Group>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default FormInput;
