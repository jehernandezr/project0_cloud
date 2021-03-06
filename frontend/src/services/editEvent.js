import {API} from '../constant/apiURI'

export default function editEvent ({ id, info, jwt }) {
  return fetch(`${API}/events/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization":"Bearer "+jwt,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.status==="fail") throw JSON.stringify(res)
    const event  = res
    return event
  }).catch(e => {console.log(e)})
}