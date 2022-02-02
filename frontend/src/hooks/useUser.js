import {useCallback, useContext, useState} from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'
import registerService from '../services/register'
import addEventService from '../services/addEvent'
import delteEventService from '../services/delEvent'
import editEventService from '../services/editEvent'

import logoutService from '../services/logout'
import Cookies from 'js-cookie'
export default function useUser () {
  const {events, jwt, setevents, setJWT} = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })
  const [registerErr,setRegisterErr]=useState("")
  const login = useCallback((email, password) => {
    setState({loading: true, error: false })
    loginService({email, password})
      .then(jwt => {
        Cookies.set('jwt', jwt)
        setState({loading: false, error: false })
        setJWT(jwt)
      })
      .catch(err => {
        Cookies.remove('jwt')
        setState({loading: false, error: true })
        setRegisterErr(err)
      })
  }, [setJWT])

  const register = useCallback((name, email, password, passwordConfirm) => {
    setState({loading: true, error: false })
    registerService({name, email, password, passwordConfirm})
      .then(jwt => {
        Cookies.set('jwt', jwt)
        setState({loading: false, error: false })
        setJWT(jwt)
        
      })
      .catch(err => {
        Cookies.remove('jwt')
        setState({loading: false, error: true })
        setRegisterErr(err)
      })
  }, [setJWT])

  const addEvent = useCallback( ({id}) => {
    addEventService({id, jwt})
    .then((events)=>  setevents(events))
    .catch(e => {
      alert(JSON.parse(e).message,'error')
    });
  }, [jwt, setevents]);

  const delEvent = useCallback(({id}) => {
    delteEventService({id, jwt})
    .then( (message)=>{
      if (message.includes("Succesfully")){
        let newevents = [...events]
        newevents =newevents.filter( el=>el._id!==id)
        setevents(newevents);
        
      }
    } )
    .catch(e => {
      alert(JSON.parse(e).message,'error')
    })
  }, [jwt, setevents,events]) 

  const editEvent = useCallback(({id, info}) => {
    editEventService({id, info, jwt})
    .then( (res)=>
      setevents([...events, res])
     )
    .catch(e => {
      alert(JSON.parse(e).message,'error')
    })
  }, [jwt, setevents,events]);

  const logout = useCallback(() => {
    logoutService({jwt})
    .then( (message)=>{
      Cookies.remove('jwt')
      setJWT(null)

    } )
    .catch(e => {
      alert(JSON.parse(e).message,'error')
    })
  }, [setJWT,jwt])

  return {
    addEvent,
    delEvent,
    editEvent,
    events,
    jwt,
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    register,
    registerErr
  }
} 