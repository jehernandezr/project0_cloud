import {API} from '../constant/apiURI'

export default function delEvent ({ id, jwt }) {
  return fetch(`${API}/events/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization":"Bearer "+jwt,
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.status==="fail") throw JSON.stringify(res)
    return res.status;
  })
}
