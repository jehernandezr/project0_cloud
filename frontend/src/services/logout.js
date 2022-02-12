import {API} from '../constant/apiURI'

export default function logout ({jwt}) {
  return fetch(`${API}/auth/logout`, {
    method: 'GET',
    headers: {
      "Authorization":"Bearer "+jwt,
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.status==="fail") throw JSON.stringify(res)
    return res.message;
  })
}