import React, { useEffect, useState } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../redux/slices/userDetails";
//import { gid } from "../../config";
//import { REACT_APP_BACKEND_URL } from "../../config";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    async function handleCredentialResponse(response) {
        const decoded = jwtDecode(response.credential);
        const email = decoded.email;
        try {
            const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+'/login', {
                email,
            });
            console.log(data);
            //toast.success("Login successful!");
            navigate("/courseDes/64e0c36eec5d32490e9f22d7");
            setUserDetails(data);
        } catch (err) {
            toast.error(
                "Email id  is not found, Please provide registered email id."
            );

        }
    }
   /* useEffect(() => {
         global google
        google.accounts.id.initialize({
            client_id: gid,
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById("g_id_onload"),
            {
                type: "standard",
                theme: "filled_blue",
                size: "large",
                shape: "rectangular",
                width: "350",
                innerHeight: "250",
                outerHeight: "350",
                logo_alignment: "left",
            }
        );
        google.accounts.id.prompt();
    }, []);*/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setUserDetails = async (data) => {
        const newUserDetails = {
            isLoggedIn: true,
            username: data.name,
            useremail: data.email,
            userId: data.id,
        };
        dispatch(addUserDetails(newUserDetails));
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+'/login', {
                email,
                password,
            });
            await setUserDetails(data);
            navigate("/");
        } catch (err) {
            console.log("ERROR -----"+err);
            toast.error(err);
            alert("Invalid credentials. Please provide registered EmailId and password");
        }
    };

    return (
        <MDBContainer fluid className="box">
            <MDBRow className="d-flex justify-content-center align-items-center h-75">
                <MDBCol col="12">
                    <MDBCard
                        className="bg-white my-4 mx-auto"
                        style={{ borderRadius: "1rem", maxWidth: "450px" }}
                    >
                        <MDBCardBody className="p-4 w-100 d-flex flex-column">
                            <h6 className="fw-bold mb-2 text-center text-dark">
                                Log in to your Geneus Solutions account
                            </h6>
                           <div id="g_id_onload" className="flex flex-center"></div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <form>
                <MDBRow className="d-flex justify-content-center align-items-center h-75">
                    <MDBCol col="12">
                        <MDBCard
                            className="bg-white my-0 mx-auto"
                            style={{ borderRadius: "1rem", maxWidth: "450px" }}
                        >
                            <MDBCardBody className="p-4 w-100 d-flex flex-column">
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    label="Email"
                                    id="email"
                                    type="email"
                                    size="lg"
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    label="Password"
                                    id="pwd"
                                    type="password"
                                    size="lg"
                                />
                                <div className="d-flex justify-content-between text-dark mb-4">
                                    <MDBCheckbox
                                        name="flexCheck"
                                        value=""
                                        id="flexCheckDefault"
                                        label="Remember me"
                                    />
                                    <a href="/forgot-pwd">Forgot password?</a>
                                </div>
                                <MDBBtn
                                    className="mb-2 w-150 fw-bold text-capitalize"
                                    size="lg"
                                    onClick={handleSubmit}
                                >
                                    Log in
                                </MDBBtn>
                                <hr className="my-3 text-muted" />
                                <p className="text-center text-body pb-0">
                                    Don't have an account?
                                    <Link as={Link} to="/signup" className="sign_up">
                                        Sign up
                                    </Link>
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
    );
};

export default Login;