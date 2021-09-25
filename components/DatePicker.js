import { ErrorMessage, useField, useFormikContext } from 'formik';
import React, {useState} from 'react'; 
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


export default function DatePicker1({label, ...props}){
    // var newDate = new Date().toDateString(); new Date("09/21/2021")
    const [startDate, setStartDate] = useState(new Date());
    const [field, meta] = useField(props);
    const formik = useFormikContext();
    // const field1 = formik.getFieldProps(field.name);
    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <br/>
            {/* <DatePicker 
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} 
                selected={startDate}  value={value => {formik.setFieldValue(field.name, value)}} 
                onChange={(date)=>setStartDate(date)} /> */}
                <DatePicker className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                selected ={startDate} onChange={value=>{formik.setFieldValue(field.name,value),setStartDate(value)}}
                 />
                {/* selected={startDate} name={field.name} onChange={(date)=>setStartDate(date)} value={startDate}
                onChange={value => {formik.setFieldValue(field.name, value),setStartDate(value)}} */}
            <ErrorMessage component="div" name={field.name} className='error'/>
        </div>
    );
};
