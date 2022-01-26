import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useField } from 'formik';
import { filesQuery } from '../pages/Files';



// const HANDLE_UPLOAD = React.createContext();


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file){
      filename
      location
    }
  }
`;


export default function Previews({ value, name, pathValue, props }) {
  const [mutate, { loading, error }] = useMutation(uploadFileMutation);
  const [_, __, helpers] = useField(name);


  const [file, setFiles] = useState([]);



  // const handleUpload = async () => {

  const handleUpload =  () => {
    if (file) {
      mutate({
        variables: { file },
        //  refetchQueries: [{ query: filesQuery, variables: file }], // update the store after a successful upload.         
      });
      // setFiles({}); // reset state after a successful upload      
      console.log('Uploaded successfully: ', file);
      const path = file.path;
      pathValue(file);
      value = path;
      console.log(file);
      // console.log(value);
      helpers.setValue(value);
      helpers.setTouched(true);
      // window.sessionStorage('imgpath', path);      
      //  console.log(pathValue);
      //  localStorage.setItem("eee", file.path)

     } 
     //else {
    //   console.log('No files to upload');
    // }
  };


  
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      setFiles(
        // convert preview string into a URL
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        }),
      );
      // handleUpload();

    },
  });

  const thumbs = (
    <div className='thumb' key={file.name}>
      <div className='thumb-inner'>
        <img src={file.preview} className='img' alt={file.length && 'img'} height="50px" width="50px" />
      </div>
    </div>
  );

  useEffect(
    () => () => {
      URL.revokeObjectURL(file.preview);
      // helpers.setValue(value);
      // helpers.setTouched(true);
    },
    [file],
  );

  return (
    <>
       {/* <HANDLE_UPLOAD.Provider value={file}> */}

        {/* <h1>{file.path}</h1> */}
        <section className="container">
          <div  {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>            
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
            
          <button
          type='button'
          className={`button`}
          style={{ display: file && !Object.keys(file).length && 'none' }}
          onClick={handleUpload}
        >
          Upload
        </button>
          </aside>
        </section>
       {/* </HANDLE_UPLOAD.Provider> */}
    </>
  );
}

// export { HANDLE_UPLOAD };