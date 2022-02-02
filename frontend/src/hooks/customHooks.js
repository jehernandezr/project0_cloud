/* eslint-disable no-useless-escape */
import { useState,useEffect } from "react";
import editEvent from "../services/editEvent";
import useUser from './useUser'
const emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
let name, email, pass,passconf=false;
const findErrors=(inputs)=>{
  let errs={}
  if(inputs.name!==undefined){

  if(inputs.name==="" || inputs.name===" "){
    errs['name']= "Must have a name"
  }
  else{
    name=true
  }
}
if(inputs.email!==undefined){
  if(inputs.email===" "){
    errs['email']= "Must have an email"
  }
  if(!emailRegex.test(inputs.email)){
    errs['email']= "Must provide a valid email"
  }
  else{
    email=true
  }
}
if(inputs.password!==undefined){
  if(inputs.password==="" || inputs.password===" "){
    errs['password']= "Must has a password"
  }
  else if(inputs.password.length<4){
    errs['password']= "password must be at least 4 caracters"
  }
  else if(inputs.password!==inputs.passwordConfirm){
    errs['password']= "password must be equal"
    errs['passwordConfirm']= "password must be equal"
  }
  else {pass=true}
}
if(inputs.passwordConfirm!==undefined){
  console.log(inputs.passwordConfirm.length<4);
  if(inputs.passwordConfirm==="" || inputs.passwordConfirm===" "){
    errs['passwordConfirm']= "Must has a password confirmation"
  }
  else if(inputs.passwordConfirm.length<4){
    errs['passwordConfirm']= "password must be at least 4 caracters"
  }
  else if(inputs.passwordConfirm!==inputs.password){
    errs['password']= "password must be equal"
    errs['passwordConfirm']= "password must be equal"
  }
  else passconf=true
}

  if(inputs.passwordConfirm!==undefined && 
    inputs.password!==undefined && inputs.passwordConfirm===inputs.password 
    && inputs.passwordConfirm.length>=4 && inputs.email!==undefined && inputs.name!==undefined && name &&email &&passconf &&pass){
      let s={}
      s['send']=true
    return s
  }
  console.log(errs)
  return errs
}
export const useSignUpForm = (schema) => {
  const [inputs, setInputs] = useState({});
  const {register,hasLoginError,registerErr} =  useUser();
  const [errors, setErrors]=useState({});
  
  useEffect(() => {
    setErrors(findErrors(inputs))
  }, [inputs])

  useEffect(() => {
    if(registerErr!=="" && registerErr.includes('Duplicate field value')){
      let f= {...errors}
      f['email']="Email Already Exists"
      setErrors(f)
    }
  }, [registerErr])

  useEffect(()=> {},[errors])

  const handleSubmit = (event,  setRegistered , setIsSubmitting) => {
    event.preventDefault();
    setIsSubmitting(true);
    let name = inputs.name;
    let email = inputs.email;
    let password = inputs.password;
    let passwordConfirm = inputs.passwordConfirm;

    register(name, email, password, passwordConfirm)
    if(hasLoginError) {setRegistered(false)
     }
    setIsSubmitting(false)
  };
  

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { handleSubmit, handleInputChange, errors };
};










const findLoginErrors=(inputs)=>{
  let errs={}
if(inputs.email!==undefined){
  if(inputs.email===" "){
    errs['email']= "Must have an email"
  }
  if(!emailRegex.test(inputs.email)){
    errs['email']= "Must provide a valid email"
  }
  else{
    email=true
  }
}
if(inputs.password!==undefined){
  if(inputs.password==="" || inputs.password===" "){
    errs['password']= "Must has a password"
  }
  else if(inputs.password.length<4){
    errs['password']= "password must be at least 4 caracters"
  }
  else {pass=true}
}

  if( 
    inputs.password!==undefined
    && inputs.password.length>=4 && inputs.email!==undefined && email  &&pass){
      let s={}
      s['send']=true
    return s
  }
  console.log(errs)
  return errs
}







export const  useLoginForm= (schema) => {
  const {login,registerErr} =  useUser();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors]=useState([]);

  useEffect(()=> {},[errors])
  useEffect(() => {
    setErrors(findLoginErrors(inputs))
  }, [inputs])

  useEffect(() => {
    if(registerErr!=="" && registerErr.includes('email or password')){
      let f= {...errors}
      f['email']="email or password incorrect"
      f['password']="email or password incorrect"
      setErrors(f)
    }
  }, [registerErr])

  const handleSubmit = (event) => {
    event.preventDefault();
    let email = inputs.email;
    let passwordPlaceHolder = inputs.password;

    login(email, passwordPlaceHolder);
    
  };

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { handleSubmit, handleInputChange, errors };
};


export const  useDetailEventForm= (schema) => {

  const [inputs, setInputs] = useState({});
  const {editEvent} =  useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const {category, name, starts_at, ends_at, place , is_face_to_face, address} = inputs;

    editEvent({id:null, category, name, starts_at, ends_at, place , is_face_to_face, address})
   

    
  };

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { handleSubmit, handleInputChange };
};