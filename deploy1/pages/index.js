import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import AddAsset from './AddAsset';
import BasicTable from './BasicTable';
import GetAsset from './GetAsset';
import Card from '../components/Card'
import Dropzone from '../components/Dropzone';
import Upload from '../pages/Upload';
import Files from '../pages/Files';
import Site from '../components/Site';
import Category from '../components/Category';
import Location from '../components/Location';
import Department from '../components/Department';
import Modal from '../components/Modal';





export default function Home() {
  return (
    <>    
    
    <Card/> 

    {/* <Dropzone/>
    <GetAsset/>  
      <BasicTable/>
     <Sidebar/>
      <AddAsset/>
     <Site/>
     <Category/>
     <Modal/>
      <Location /> 
      <Department /> 
       <Upload />
       <Files />  */}
    </>
  )
}
