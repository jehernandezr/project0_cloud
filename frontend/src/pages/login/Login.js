import {useHistory,useLocation} from 'react-router-dom'
import { LoginCard } from "../../components/LoginCard/LoginCard";
import "./Login.scss";
export const Login = () => {
  let history = useHistory();
  let location = useLocation();


  let { from } = location.state || { from: { pathname: "/" } };

    return (
    <div className="main-bg-login">
	  <LoginCard></LoginCard>

	</div>
  );
}

export default Login;