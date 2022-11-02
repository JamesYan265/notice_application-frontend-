import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import noticelogo from "../../assets/images/noticelogo.png"
import authUtils from '../../utils/authUtils'

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //檢查是否持有Token
    const checkJWT = async () => {
      //認證Check
      const isAuth = await authUtils.isAuthenticated();
      if(isAuth) {
        navigate("/");
      }
    };
    checkJWT();
  },[navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box 
          sx={{
            marginTop: 6,
            display:'flex',
            alignItems:'center',
            flexDirection:'column'
          }}
        >
          <img src={noticelogo} alt="" className="srt" style={{width:100, height:100, marginBottom:3}}/>
          Notice Application 
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default AuthLayout