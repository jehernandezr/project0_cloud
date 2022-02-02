import {API} from '../constant/apiURI'

export default function login ({ email, password }) {
  return fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  }).then(res => {
    return res.json()
  }).then(res => {
    console.log(res)
    if(res.status==="fail") throw JSON.stringify(res)
    const  token  = res.access_token;
    return token
  })
}
