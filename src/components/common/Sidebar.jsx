import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LogoutOutlinedIcon from "@mui/icons-material/LoginOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import React from 'react'
import assets from "../../assets/index";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import memoApi from '../../api/memoApi'
import { setMemo } from '../../redux/features/memoSlice'
import { useState } from 'react'

function Sidebar() {
  const navigate = useNavigate();
  //把store中的reducer入面user的數值導入
  const user = useSelector((state) => state.user.value);
  //將memo info引入Redux dispatch準備
  const dispatch = useDispatch();
  //將在redux 的 memo重新拎出來
  const memos = useSelector((state) => state.memo.value);
  const { memoId } = useParams();

  const [activeIndex, setActiveIndex] = useState(0);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async() => {
      try {
        const res = await memoApi.getAll();
        //將memo info引入Redux
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  },[dispatch]);

  //按邊個列表,邊個會被HighLight,logic係睇navigate(跳頁)來執行
  useEffect(() => {
    //根據排列的Index number來特定需要的項目
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
    
  },[navigate])

  const addMemo = async() =>{
    try {
      const res = await memoApi.create();
      //即時更新增加了memo, 所以要實時更新埋Redux中的Memo資料
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      //即時跳到最新的Memo頁面
      navigate(`memo/${res._id}`);
    } catch(err) {
      alert(err);
    } 
  }

  return (
    //Drawer 是 Material UI 的插件之一,用於快速建立menu
    <Drawer container={window.document.body} variant="permanent" open={true} sx={{width: 250, height:"100vh"}}>
      <List sx={{width:250, height:"100vh", backgroundColor: assets.colors.secondary, }}>
        <ListItemButton>
          <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Typography variant='body2' fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon/>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{paddingTop:"10px"}}></Box>
 
        <ListItemButton>
          <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Typography variant='body2' fontWeight="700">
            Like
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{paddingTop:"10px"}}></Box>
        
        <ListItemButton>
          <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <Typography variant='body2' fontWeight="700">
              Private
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon />
            </IconButton>
          </Box>

        </ListItemButton>
        {/* memo */}
        {/* item為資料本身, index為排列所用之參數 */}
        {memos.map((item, index) => (
          <ListItemButton sx={{pl:'20px'}} component={Link} to={`/memo/${item._id}`} key={item._id} selected={index === activeIndex}>
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}

      </List>
    </Drawer>
  )
}

export default Sidebar