import { useEffect,useState } from "react";
import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, setCredentials } from "../features/auth/authSlice";
import { useAuthenticateQuery } from "../features/authenticate/authenticateApiSlice";

const RequireAuth = ({allowedRole}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading,setLoading] = useState(true);

    const token = useSelector(selectCurrentToken);

    const user = useSelector(state => state.auth.user);
    
    const { data, isError, error, isSuccess } = useAuthenticateQuery();
    
    useEffect(() => {

      let isMounted = true;

      if(isMounted){
        if (isError) {
            navigate('/login', { state: { from: location }, replace: true });
        }

        if (isSuccess) {
            setLoading(false);
            dispatch(setCredentials({ accessToken: token, user: data?.data }));
        }
      }

      return () => { isMounted = false };
    
    }, [isError, isSuccess,user,loading, error, navigate, location, dispatch, token, data]);

    if (loading) {
      return <p>Loading , please wait...</p>
    }

    return allowedRole?.includes(user?.role) ? 
      <Outlet /> 
      : user?._id ? <h1>Unauthorised</h1>
      :<Navigate to="/login" state={{ from: location }} replace />
};

export default RequireAuth;
