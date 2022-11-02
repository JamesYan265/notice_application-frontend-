import React, { memo } from 'react';
import { Box } from '@mui/system';
import { IconButton, TextField } from '@mui/material';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../redux/features/memoSlice';
import EmojiPicker from '../components/common/EmojiPicker';

function Memo() {
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const memos = useSelector((state) => state.memo.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    }
    getMemo();
  },[memoId])

  // 更新Memo
  
  //設定時限, 防止過多的即時請求 //每0.5s可以請求一次
  let timer;
  const timeout = 500;

  const updateTitle = async (e) =>{
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {title: newTitle});
      } catch(err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {description: newDescription});
      } catch(err) {
        alert(err);
      }
    }, timeout);

  };

  const deleteMemo = async() =>{
    try {
      const deleteMemo = await memoApi.delete(memoId);
      console.log(deleteMemo);

      //即時更新左邊位置,所以要filter走被刪除的項目,同時更新Redux中的資料
      const newMemos = memos.filter((e) => e._id !== memoId);
      dispatch(setMemo(newMemos));
      if(newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }

   
    } catch(err) {
      alert(err)
    }
  };

  const onIconChange = async (newIcon) => {
    //暫時轉換,未實際變更
    let temp = [...memos];
    //搜尋正在變更的Memo
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = {...temp[index], icon : newIcon};
    //將新Icon更新Redux資料
    setIcon(newIcon);
    dispatch(setMemo(temp));
    //最後經API更新DB
    try {
      await memoApi.update(memoId, {icon: newIcon})
    } catch(err) {
      alert(err)
    }
  };

  return (
    <>
      <Box sx={{ display:"flex", alignitems: "center", width:"100%"}}>
        <IconButton>
          <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon></DeleteOutlinedIcon>
        </IconButton>
      </Box>

      <Box sx={{padding:"10px 50px"}}>

        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />

        <TextField placeholder='無標題' variant='outlined' fullWidth value={title} onChange={updateTitle}
        sx={{".MuiInputBase-input" : { padding:0 }, 
             ".MuiOutlinedInput-notchedOutline" : {border: "none"},
             ".MuiOutlinedInput-root" : {fontSize: "2rem", fontWeight: "700"}, }}/>

        <TextField placeholder='增加' variant='outlined' fullWidth value={description} onChange={updateDescription}
        sx={{".MuiInputBase-input" : { padding:0 }, 
             ".MuiOutlinedInput-notchedOutline" : {border: "none"},
             ".MuiOutlinedInput-root" : {fontSize: "1rem"}, }}/>
        </Box>
      </Box>
    </>
  )
}

export default Memo