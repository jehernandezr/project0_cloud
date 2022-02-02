import {API} from '../constant/apiURI'

export default function register (data) {
  return fetch(`${API}/auth/sign-up`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({...data})
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.status==="fail") throw JSON.stringify(res)
    const  token  = res.access_token;
    return token
  })
}