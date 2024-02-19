import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfilePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();
    
    // get user info from global state
    const userInfo = useSelector((state) => state.auth);

    // get profil name and email from user info 
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Submit');
    };

    return (
        <div>ProfilePage</div>
    );
};

export default ProfilePage;