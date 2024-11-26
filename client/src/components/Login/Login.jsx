import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import './Login.css'

function Login() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
      setErrMsg('');
  }, [email, password]);

  const handleLogin = async (e) => {
      try {
          e.preventDefault();
          console.log({ email, password });
          if (!email || !password) {
              setErrMsg('all fields are required');
              return;
          }

          const userData = await login({ email, password }).unwrap();
          console.log('userData : ',userData);
          dispatch(setCredentials({ ...userData }));
          setEmail('');
          setPassword('');
          navigate(from, { replace: true });

      } catch (error) {
          setErrMsg(error?.data?.message || "Login failed");
      }
  };

  return (
    <div className="signup-container">
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
      
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {isLoading ? <p style={{display:'flex',justifyContent:'center'}} className="signup-button">logging in...</p>:<button type="submit" className="signup-button">Login</button>}
      </form>
      <div className="login-link">
        Dont have ACCOUNT? <a href="/signup">Signup</a>
      </div>
    </div>
    <div className="image-container">
      <div className="overlay">
        <h1>Lorem ipsum dolor sit amet, consectetur</h1>
      </div>
    </div>
  </div>
  )
}

export default Login