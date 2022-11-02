import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import memoApi from "../api/memoApi";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async () =>{
    try {
      setLoading(true);
      const res = await memoApi.create();
      console.log(res);
      navigate(`/memo/${res._id}`)
    } catch(err) {
      alert(err)
    } finally { //不論結果最後都會執行finally中的程式碼
      setLoading(false)
    }
  };

  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <LoadingButton variant='outlined' onClick={() => createMemo()} loading={loading}>輸入最初的通知</LoadingButton>
    </Box>
  )
}

export default Home