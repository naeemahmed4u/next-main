import React, { useContext } from "react";
import { useRouter } from 'next/router'
import { Field, Formik, Form, useFormikContext } from "formik";
import { TextField } from "../components/TextField";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as Yup from "yup";
import gql from "graphql-tag";
import { ModalContext } from "../components/Modal";




export default function Location({refetch}) {
  const closeModal = useContext(ModalContext);
  
  const router = useRouter();
  const [addLocation] = useMutation(ADD_LOCATION);
  const { data: { getSites = [] } = {} } = useQuery(GET_SITES_QUERY);

  return (

    <Formik
      initialValues={{
        name: [{ getSites }],
        location: "",

      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required"),
        location: Yup.string()
          .required("Required"),
      })}

      onSubmit={(values) => {
        const { name, location } = values;

        addLocation({
          variables: { name, location },
        });
        refetch();
        closeModal();
      }}
    >
      {(props) => {
      const {
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        resetForm
      } = props;
      return(
        <Form >
          <Field as="select" label="Site *" name="name" >
            <option value="Select Site">Select Site</option>
            {getSites.map(i =>
              <option key={i.id} value={i.site}>{i.site}</option>
            )}
          </Field>
          <TextField label="Location *" name="location" type="text" />
          
          
          <button className="btn btn-dark mt-3" type="submit"  >
            Submit
          </button>
          <button className="btn btn-danger mt-3 ml-3" type="reset" onClick={resetForm}>
            Cancel
          </button>
              
        </Form>)}}
    </Formik>


  );
}

// const ADD_LOCATION = gql`
//   mutation addLocation($name:String,
//     $location:String    
//   ) {
//     addLocation(name:$name,
//       locationInput:{
//         location:$location      
//       }
//     ) {
//       id
//       {
//       name}
//       location
//     }
//   }
// `;

const ADD_LOCATION = gql`
  mutation addLocation(
    $name:String,
    $location:String    
  ) {
    addLocation(
      locationInput:{
        name:$name,
        location:$location      
      }
    ) {
      id      
      name
      location
    }
  }
`;

const GET_SITES_QUERY = gql`
 {
    getSites {
      id
     site    
    }
  }
`;

// const FETCH_SITE_QUERY = gql`
//   query($siteId: ID!) {
//     getSite(siteId: $siteId) {
//      site      
//     }
//   }`;