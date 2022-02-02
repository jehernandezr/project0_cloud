import {API} from '../constant/apiURI'
export default function getEvents ({ jwt }) {
  return fetch(`${API}/events`, {
    method: 'GET',
    headers: {
      "Authorization":"Bearer "+jwt,
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res.status==="fail") throw JSON.stringify(res)
    const events = res;
    return events
  })
}
