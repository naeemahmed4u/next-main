import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { Formik, Form, Button } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import  {AuthContext}  from '../context/auth';




const Login = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});


    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(
            _,
            {
                data: { login: userData }                

            }
        ) {
            context.login(userData);
            // props.history.push('/');
            
            Router.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
   
    });



    const validate = Yup.object({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Password is required'),
    })


    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={validate}
            onSubmit={(values) => {

                const { username, password } = values;
                // console.log(username, password);
                // setUserName(username);
                // setPassword(password);

                loginUser({
                    variables: {
                        username,
                        password
                    },
                });

            }}

        >
            <Form>
                <h1 className="my-4 font-weight-bold-display-4">Login</h1>
                <TextField label="User Name: " name="username" type="text" placeholder="User Name" />
                <TextField label="Password: " name="password" type="password" placeholder="Password" />
                <button className="btn btn-dark mt-3" type="submit" >Login</button>
                <button className="btn btn-danger mt-3 ml-3" type="reset">Cancel</button>
                {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Form>

        </Formik>


        // <div className="form-container">
        //     <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        //         <h1>Login</h1>
        //         <Form.Input
        //             label="Username"
        //             placeholder="Username.."
        //             name="username"
        //             type="text"
        //             value={values.username}
        //             error={errors.username ? true : false}
        //             onChange={onChange}
        //         />
        //         <Form.Input
        //             label="Password"
        //             placeholder="Password.."
        //             name="password"
        //             type="password"
        //             value={values.password}
        //             error={errors.password ? true : false}
        //             onChange={onChange}
        //         />
        //         <Button type="submit" primary>
        //             Login
        //         </Button>
        //     </Form>
        //     {Object.keys(errors).length > 0 && (
        //         <div className="ui error message">
        //             <ul className="list">
        //                 {Object.values(errors).map((value) => (
        //                     <li key={value}>{value}</li>
        //                 ))}
        //             </ul>
        //         </div>
        //     )}
        // </div>
    );

}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;