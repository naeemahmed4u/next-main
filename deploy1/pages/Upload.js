import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "./Files";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file){
      filename
    }
  }
`;

// export const Upload = () => {
//   const [uploadFile] = useMutation(uploadFileMutation, {
//     refetchQueries: [{ query: filesQuery }]
//   });



  
const Upload = (props) => {
  const [mutate, { loading, error }] = useMutation(uploadFileMutation);
  
  const onChange = ({
    target: {
      validity,
      files: [file],
      //props = file.filename      
      
    }
  } ) => validity.valid && mutate({ variables: { file } });
  
  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};

export default Upload;

  
//   const onDrop = useCallback(
//     ([file]) => {
//       uploadFile({ variables: { file } });
//     },
//     [uploadFile],
//   );
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// };
