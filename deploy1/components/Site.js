import { Formik, Form, useFormikContext } from "formik";
import { TextField } from "../components/TextField";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";
import gql from "graphql-tag";
import { ModalContext } from "../components/Modal";
import React, { useContext } from "react";


export default function Site({refetch}) {
    const closeModal = useContext(ModalContext);
    const [addSite] = useMutation(ADD_SITE);



    return (

        <Formik
            initialValues={{
                site: "",
                description: "",
                address: "",
                city: "",
                province: "",
                postalCode: "",
                country: "",
            }}
            validationSchema={Yup.object({
                site: Yup.string()
                    .required("Required"),
                description: Yup.string(),
                address: Yup.string(),
                city: Yup.string(),
                province: Yup.string(),
                postalCode: Yup.string(),
                country: Yup.string(),
            })}

            onSubmit={(values) => {
                const { site, description, address, city, province, postalCode, country } = values;

                addSite({
                    variables: {
                        site, description, address, city, province, postalCode, country
                    },
                });
                refetch();
                closeModal();
            }}
        >
            {() => (
                <Form >
                    <TextField label="Site" name="site" type="text" />

                    <TextField label="Description" name="description" type="text" />
                    <TextField label="Address" name="address" type="text" />
                    <TextField label="City" name="city" type="text" />
                    <TextField label="Province" name="province" type="text" />
                    <TextField label="Postal Code" name="postalCode" type="text" />
                    <TextField label="Country" name="country" type="text" />
                    <button className="btn btn-dark mt-3" type="submit" >
                        Submit
                    </button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">
                        Cancel
                    </button>
                </Form>)}
        </Formik>


    );
}

const ADD_SITE = gql`
  mutation addSite(
    $site:String
    $description: String!
    $address: String!
    $city: String!
    $province: String!
    $postalCode: String!
    $country: String!    
  ) {
    addSite(
      siteInput:{
        site:$site
        description: $description
        address: $address
        city: $city
        province: $province
        postalCode: $postalCode
        country: $country        
      }
    ) {
      id
      site
      description
      address
      city
      province
      postalCode
      country
    }
  }
`;

