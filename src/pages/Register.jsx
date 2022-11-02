import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import authApi from '../api/authApi'
import { useState } from 'react'

const Register = () => {
  //註冊完跳回主頁
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setpasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameErrText("");
    setpasswordErrText("");
    setConfirmErrText("");

    //取得TextField (Text box)的資料 [trim();] = filter走空白
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();
    // console.log(username);
    // console.log(password);
    // console.log(confirmPassword);

    //Value Checking
    let error = false;

    if(username === "") {
      error = true;
      setUsernameErrText("請輸入你的名字");
    }
    if(password === "") {
      error = true;
      setpasswordErrText("請輸入你的密碼");
    }
    if(confirmPassword === "") {
      error = true;
      setConfirmErrText("請再次輸入你的密碼");
    }
    if(password !== confirmPassword) {
      error = true;
      setConfirmErrText("密碼與確認密碼不一致");
    }

    //如果error = true, 將error 回傳返去
    if(error) return;

    setLoading(true);

    try {
      const res = await authApi.register({username, password, confirmPassword});
      localStorage.setItem("token", res.token);
      setLoading(false);
      console.log("Register Successful");
      //註冊完跳回主頁
      navigate("/");
    } catch(err) {
      const errors = err.data.errors;
      errors.forEach((err) => {
        if(err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if(err.param === "password") {
          setpasswordErrText(err.msg);
        }
        if(err.param === "confirmPassword") {
          setConfirmErrText(err.msg);
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
        <TextField fullWidth id='confirmPassword' label='確認密碼' margin='normal' name='confirmPassword' type="password" required helperText={confirmErrText} error={confirmErrText !== ""} disabled={loading}/>
        <LoadingButton sx={{mt :3, mb:2}} fullWidth type='submit' loading={loading} color="primary" variant='outlined'>註冊帳號</LoadingButton>
      </Box>
      <Button component={Link} to="/login">已經擁有帳號?請登入</Button>
    </>
  )
}

export default Register