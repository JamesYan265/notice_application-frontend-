import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import authApi from '../api/authApi'
import { useState } from 'react'

const Login = () => {
  //登入後返回"/"
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setpasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    setLoading(true);
    try {
      const res = await authApi.login({username, password});
      localStorage.setItem("token", res.token);
      setLoading(false);
      console.log("Login Successful");
      navigate("/");
    } catch(err) {
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if(err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if(err.param === "password") {
          setpasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  }
  return (
  <>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField fullWidth id='username' label='使用者名稱' margin='normal' name='username' required helperText={usernameErrText} error={usernameErrText !== ""} disabled={loading}/>
      <TextField fullWidth id='password' label='密碼' margin='normal' name='password' type="password" required helperText={passwordErrText} error={passwordErrText !== ""} disabled={loading}/>
      <LoadingButton sx={{mt :3, mb:2}} fullWidth type='submit' loading={loading} color="primary" variant='outlined'>登入</LoadingButton>
    </Box>
    <Button component={Link} to="/register">還沒有帳號嗎?請註冊</Button>
  </>
  )
}

export default Login