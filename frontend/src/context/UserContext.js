import React, {useState} from 'react'
import { useEffect } from 'react'
import getEvents from '../services/getEvents'
import Cookies from 'js-cookie'
const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [events, setEvents] = useState([])
  const [jwt, setJWT] = useState(
    () => Cookies.get('jwt')
  )

  useEffect(() => {
     if (!jwt) return setEvents([])

      getEvents({jwt}).then(ev=>{
      localStorage.setItem("events", JSON.stringify(events));
      return setEvents(ev)
    }).catch(
      e=> alert(e)
    )
  }, [jwt])
  

  return <Context.Provider value={{
    events,
    jwt,
    setEvents,
    setJWT
  }}>
    {children}
  </Context.Provider>
}

export default Context