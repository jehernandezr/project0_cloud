import {useCallback, useContext, useState} from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'
import registerService from '../services/register'
import addEventService from '../services/addEvent'
import delteEventService from '../services/delEvent'
import editEventService from '../services/editEvent'
import {parseJwt} from '../utils/jwt'
import logoutService from '../services/logout'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
export default function useUser () {
  const {events, jwt, setEvents, setJWT} = useContext(Context)
  const history = useHistory();
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

  const addEvent = useCallback( ({info}) => {
    addEventService({info, jwt})
    .then((events)=>  setEvents(events))
    .catch(e => {
      console.log(e)
    });
  }, [jwt, setEvents]);

  const delEvent = useCallback(({id}) => {
    delteEventService({id, jwt})
    .then( (message)=>{
      if (message.includes("Succesfully")){
        let newevents = [...events]
        newevents =newevents.filter( el=>el._id!==id)
        setEvents(newevents);
        
      }
    } )
    .catch(e => {
     console.log(e)
    })
  }, [jwt, setEvents,events]) 

  const editEvent = useCallback(({id, info}) => {
    editEventService({id, info, jwt})
    .then( (res)=>
    {setEvents([...events, res]);
    history.push(`/events/${id}`);}
     )
    .catch(e => {
      console.log(e)
    })
  }, [jwt, setEvents,events]);

  const logout = useCallback(() => {
    logoutService({jwt})
    .then( (message)=>{
      Cookies.remove('jwt')
      setJWT(null)

    } )
    .catch(e => {
      console.log(e)
    })
  }, [setJWT,jwt])

  return {
    addEvent,
    delEvent,
    editEvent,
    events,
    jwt,
    isLogged: Boolean(parseJwt(jwt).exp * 1000 > new Date().getTime()),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
    register,
    registerErr
  }
} 