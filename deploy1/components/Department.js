import { Formik, Form, useFormikContext } from "formik";
import React, { useContext } from "react";
import { TextField } from "../components/TextField";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";
import gql from "graphql-tag";
import { ModalContext } from "../components/Modal";



export default function Department({refetch}) {
  const closeModal = useContext(ModalContext);

  const [addDepartment] = useMutation(ADD_DEPARTMENT);



  return (

    <Formik
      initialValues={{
        department: "",
      }}
      validationSchema={Yup.object({
        department: Yup.string()
          .required("Required"),
      })}

      onSubmit={(values) => {
        const { department } = values;

        addDepartment({
          variables: { department },
        });
        refetch();
        closeModal();
      }}
    >
      {() => (
        <Form >
          <TextField label="Department *" name="department" type="text" />
          <button className="btn btn-dark mt-3" type="submit">
            Submit
          </button>
          <button className="btn btn-danger mt-3 ml-3" type="reset">
            Cancel
          </button>
        </Form>)}
    </Formik>


  );
}

const ADD_DEPARTMENT = gql`
  mutation addDepartment(
    $department:String    
  ) {
    addDepartment(
      departmentInput:{
        department:$department      
      }
    ) {
      id
      department
    }
  }
`;