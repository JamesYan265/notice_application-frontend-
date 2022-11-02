import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import noticelogo from "../../assets/images/noticelogo.png"
import authUtils from '../../utils/authUtils'
import Sidebar from '../common/Sidebar'
import { useDispatch } from "react-redux"
import { setUser } from '../../redux/features/UserSlice'

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //檢查是否持有Token
    const checkJWT = async () => {
      //認證Check
      const user = await authUtils.isAuthenticated();
      if(!user) {
        navigate("/login");
      } else {
        //user存在時保存User (Redux)
        dispatch(setUser(user));
      }
    };
    checkJWT();
  },[navigate]);
  return (
    <div>
      <Box sx={{display:"flex"}}>
        <Sidebar />
        <Box sx={{flexGrow:1, p:1, width:"max-content"}}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout