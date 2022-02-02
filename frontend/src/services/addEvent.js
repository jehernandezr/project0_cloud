import {API} from '../constant/apiURI'

export default function addEvent ({ id, jwt }) {

  return fetch(`${API}/events`, {
    method: 'POST',
    headers: {
      "Authorization":"Bearer "+jwt,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id: id})
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.status==="fail") throw JSON.stringify(res)
    const favs  = res
    return favs
  })
}