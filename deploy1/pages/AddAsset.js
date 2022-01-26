import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Field, Formik, Form, useFormikContext } from "formik";
import { TextField } from "../components/TextField";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as Yup from "yup";
import gql from "graphql-tag";
import DatePicker1 from "../components/DatePicker";
import styles from "../styles/Home.module.scss";
import Site from "../components/Site";
import Location from "../components/Location";
import Department from "../components/Department";
import Category from "../components/Category";

import Dropzone from "../components/Dropzone";

import QRCode from "qrcode";

import Modal from "../components/Modal";

//import QrReader from 'react-qr-reader';
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });
//  import {Form, DropZone} from 'react-formik-ui';

export default function AddAsset(props) {
  // const fileContext = React.useContext(HANDLE_UPLOAD);
  // console.log(fileContext);
  //Main Mutation of this form
  const [addAsset] = useMutation(ADD_ASSET);
  // Queries for dropdown
  const { data: { getSites = [] } = {}, refetch: refetchSite } =
    useQuery(GET_SITES_QUERY);
  const { data: { getCategorys = [] } = {}, refetch: refetchCategory } =
    useQuery(GET_CATEGORYS_QUERY);
  const { data: { getLocations = [] } = {}, refetch: refetchLocation } =
    useQuery(GET_LOCATIONS_QUERY);
  const { data: { getDepartments = [] } = {}, refetch: refetchDepartment } =
    useQuery(GET_DEPARTMENTS_QUERY);

  // const formikProps = useFormikContext();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [filePath, setFilePath] = useState("");


  // for Modal Form
  const [showSite, setShowSite] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  // for Modal Form end

  const qrRef = useRef(null);

  useEffect(() => {
    // refetch();
  }, []);


  const updateFilePath = (filePath) => {
    setFilePath(filePath);
    // setFilePath(fileContext.path);
    //console.log(fileContext.path);
    console.log(filePath);
  };

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile = result;
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          picture: "",
          description: "",
          assetTagID: "",
          purchasedFrom: "",
          purchaseDate: new Date().toDateString(),
          brand: "",
          cost: "",
          model: "",
          serialNo: "",
          site: "",
          category: "",
          location: "",
          department: "",
          depreciableAsset: "Yes",
          depreciableCost: "",
          assetLife: "",
          salvageValue: "",
          depreciationMethod: "",
          dateAquired: new Date().toDateString()
        }}
        validationSchema={Yup.object({
          picture: Yup.string(),
          description: Yup.string()
            .max(15, "Must be 15 charaters or less")
            .required("Required"),
          assetTagID: Yup.string()
            .max(20, "Must be 20 charaters or less")
            .required("Required"),
          purchasedFrom: Yup.string()
            .max(20, "Must be 20 charaters or less")
            .required("Required"),
          purchaseDate: Yup.string()
            //.max(20, "Must be 20 charaters or less")
            .required("Required"),
          brand: Yup.string()
            .max(20, "Must be 20 charaters or less")
            .required("Required"),
          cost: Yup.string()
            .max(20, "Must be 20 charaters or less")
            .required("Required"),
          model: Yup.string()
            .max(20, "Must be 20 charaters or less")
            .required("Required"),
          serialNo: Yup.string()
            .max(20, "Must be 20 charaters or less")
            .required("Required"),
          // site: Yup.string()
          //   .max(20, "Must be 20 charaters or less")
          //   .required("Required"),
          // category: Yup.string()
          //   .max(20, "Must be 20 charaters or less")
          //   .required("Required"),
          // location: Yup.string()
          //   .max(20, "Must be 20 charaters or less")
          //   .required("Required"),
          // department: Yup.string()
          //   .max(20, "Must be 20 charaters or less")
          //   .required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          const {
            picture,
            description,
            assetTagID,
            purchasedFrom,
            purchaseDate,
            brand,
            cost,
            model,
            serialNo,
            site,
            category,
            location,
            department,
            depreciableAsset,
            depreciableCost,
            assetLife,
            salvageValue,
            depreciationMethod,
            dateAquired,
          } = values;

          // picture = filePath;
          // filePath();
          // const {file} = picture;
          // console.log(picture);
          // depcreciableCost:String,

          addAsset({
            variables: {
              picture,
              description,
              assetTagID,
              purchasedFrom,
              purchaseDate,
              brand,
              cost,
              model,
              serialNo,
              site,
              category,
              location,
              department,
              depreciableAsset,
              depreciableCost,
              assetLife,
              salvageValue,
              depreciationMethod,
              dateAquired,
            },
          });

          console.log(values);
          resetForm();
        }}
      >
        {(formik) => (
          <Form className={styles.card}>
            <h3>Add Asset</h3>
            {/* <TextField label="Picture" name="picture" type="text" placeholder="Path" value={filePath}  /> */}
            <TextField
              label="Description"
              name="description"
              type="text"
              placeholder="Enter Asset Description..."
            />
            <TextField label="Asset Tag ID" name="assetTagID" type="text" />
            <TextField
              label="Purchased From"
              name="purchasedFrom"
              type="text"
            />
            <DatePicker1 label="Purchase Date" name="purchaseDate" />
            {/* myValue={updateDate} value={newDate} */}
            <TextField label="Brand" name="brand" type="text" />
            <TextField label="Cost" name="cost" type="text" />
            <TextField label="Model" name="model" type="text" />
            <TextField label="Serial No." name="serialNo" type="text" />
            <hr />
            <h4>Site, Location, Category and Department</h4>
            <label htmlFor="site">Site</label>
            <Field as="select" name="site" className="form-control shadow-none form-select">
              <option value="Select Site">Select Site</option>
              {getSites.map((index) => (
                <option key={index.id} value={index.site}>
                  {index.site}
                </option>
              ))}
            </Field>
            <button type="button" onClick={() => setShowSite(true)} className="btn btn-dark">
              +New
            </button>
            <br />
            <Modal
              onClose={() => {
                setShowSite(false), refetchSite();
              }}
              show={showSite}
            >
              <Site refetch={()=>refetchSite()}/>
            </Modal>
            <label htmlFor="category">Category</label>
            <Field as="select" name="category" className="form-control shadow-none form-select">
              <option value="Select Category">Select Category</option>
              {getCategorys.map((i) => (
                <option key={i.id} value={i.category}>
                  {i.category}
                </option>
              ))}
            </Field>
            <button type="button" onClick={() => setShowCategory(true)} className="btn btn-dark">
              +New
            </button>
            <Modal
              onClose={() => {
                setShowCategory(false), refetchCategory();
              }}
              show={showCategory}
            >
              <Category refetch={()=>refetchCategory()} />
            </Modal>{" "}
            <br /> 
            <label>Location</label>
            <Field as="select" name="location" className="form-control shadow-none form-select">
              <option value="Select Location">Select Location</option>
              {getLocations.map((i) => (
                <option key={i.id} value={i.location}>
                  {i.location}
                </option>
              ))}
            </Field>
            <button type="button" onClick={() => setShowLocation(true)} className="btn btn-dark">
              +New
            </button>
            <Modal
              onClose={() => {
                setShowLocation(false), refetchLocation();
              }}
              show={showLocation}
            >
              <Location refetch={()=>refetchLocation()}/>
            </Modal>
            <br />
            <label>Department</label>
            <Field as="select" name="department" className="form-control shadow-none form-select">
              <option value="Select Department">Select Department</option>
              {getDepartments.map((i) => (
                <option key={i.id} value={i.department}>
                  {i.department}
                </option>
              ))}
            </Field>
            <button type="button" onClick={() => setShowDepartment(true)} className="btn btn-dark">
              +New
            </button>
            <Modal
              onClose={() => {
                setShowDepartment(false), refetchDepartment();
              }}
              show={showDepartment}
            >
              <Department refetch={()=>refetchDepartment()}/>
            </Modal>
            {/* {console.log(localStorage.getItem('eee'), "ted")}  */}
            <Dropzone name="picture" pathValue={updateFilePath} value={filePath} />
            <hr />
            <label>Depreciable Asset &nbsp; &nbsp;&nbsp;&nbsp; </label>
            <label>
              <Field name="depreciableAsset" type="radio" value="Yes" />
              &nbsp; Yes&nbsp;&nbsp;&nbsp;
            </label>
            <label>
              &nbsp;&nbsp;&nbsp;
              <Field name="depreciableAsset" type="radio" value="No" />
              &nbsp;No
            </label>
            <TextField
              label="Depreciable Cost"
              name="depreciableCost"
              type="text"
            />
            <TextField
              label="Asset Life (months)"
              name="assetLife"
              type="text"
            />
            <TextField label="Salvage Value" name="salvageValue" type="text" />

            <label htmlFor="depreciationMethod">Depreciation Method</label>
            <Field name="depreciationMethod" as="select" className="form-control shadow-none form-select">
              <option value="Straight Line">Straight Line</option>
              <option value="Declining Balance">Declining Balance</option>
            </Field>

            <DatePicker1 label="Date Aquired" name="dateAquired" />

            <button className="btn btn-dark mt-3" type="submit">
              Submit
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              Cancel
            </button>
          </Form>
        )}
      </Formik>

      <div>
        <input
          type="text"
          label="QR Code"
          name="QRCode"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-dark mt-3" onClick={() => generateQrCode()}>
          Generate QRCode
        </button>
        {imageUrl ? (
          <a href={imageUrl} download>
            <img src={imageUrl} alt="img" />
          </a>
        ) : null}

        <button onClick={onScanFile}>Scan QR Code</button>

        <QrReader
          ref={qrRef}
          delay={300}
          style={{ width: "10%" }}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
        <h3>Scanned Code: {scanResultFile}</h3>

        <h3>Qr Code Scan by Web Cam</h3>
        <QrReader
          delay={300}
          style={{ width: "10%" }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
        />
        <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
      </div>
    </>
  );
}

const ADD_ASSET = gql`
  mutation addAsset(
    $picture: String
    $description: String!
    $assetTagID: String!
    $purchasedFrom: String!
    $purchaseDate: String!
    $brand: String!
    $cost: String!
    $model: String!
    $serialNo: String!
    $site: String
    $category: String
    $location: String
    $department: String
    $depreciableAsset:String
    $depreciableCost:String
    $assetLife:String
    $salvageValue:String
   $depreciationMethod:String
    $dateAquired:String
    
  ) {
    addAsset(
      assetInput: {
        picture: $picture
        description: $description
        assetTagID: $assetTagID
        purchasedFrom: $purchasedFrom
        purchaseDate: $purchaseDate
        brand: $brand
        cost: $cost
        model: $model
        serialNo: $serialNo
        site: $site
        category: $category
        location: $location
        department: $department
        depreciableAsset:$depreciableAsset
        depreciableCost:$depreciableCost
        assetLife:$assetLife
        salvageValue:$salvageValue
        depreciationMethod:$depreciationMethod
        dateAquired:$dateAquired
      }
    ) {
      id
      picture
      description
      assetTagID
      purchasedFrom
      purchaseDate
      brand
      cost
      model
      serialNo
      site
      category
      location
      department
      depreciableAsset
      depreciableCost
      assetLife
      salvageValue
      depreciationMethod
      dateAquired
      
    }
  }
`;

// const uploadFileMutation = gql`
//   mutation UploadFile($file: Upload!) {
//     uploadFile(file: $file){
//       filename
//     }
//   }
// `;

const GET_SITES_QUERY = gql`
  {
    getSites {
      id
      site
    }
  }
`;

const GET_CATEGORYS_QUERY = gql`
  {
    getCategorys {
      id
      category
    }
  }
`;

const GET_LOCATIONS_QUERY = gql`
  {
    getLocations {
      id
      location
    }
  }
`;

const GET_DEPARTMENTS_QUERY = gql`
  {
    getDepartments {
      id
      department
    }
  }
`;
