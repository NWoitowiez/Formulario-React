import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function MyForm(props) {
    const {
        isSubmitting,
        isValid,
    } = props;

    return (
        <Form>
            <div className="row">
                Email:
                <Field name="email" type="email" className="input" />
                <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Contraseña:
                <Field name="password" type="password" className="input" />
                <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                <button
                    type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                    disabled={isSubmitting || !isValid}
                >
                    Enviar
                </button>
            </div>
        </Form>
    );
}

export default withFormik({
    mapPropsToValues(props) {
        return {
            email: props.defaultEmail,
            password: '',
        };
    },

    async validate(values) {
        const errors = {};

        if (!values.password) {
            errors.password = 'Se necesita una contraseña.';
        } else if (values.password.length < 8) {
            errors.password = 'La contraseña tiene que tener al menos 8 carácteres.';
        }

        await sleep(100);

        if (Object.keys(errors).length) {
            throw errors;
        }
    },

    handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        console.log(values);
    },
})(MyForm);
