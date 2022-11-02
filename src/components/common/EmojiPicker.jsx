import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react';
import Picker from "@emoji-mart/react"

const EmojiPicker = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState();
    const [isShowPicker, setIsShowPicker] = useState(false);

    useEffect(() => {
        setSelectedEmoji(props.icon);
    }, [props.icon]);

    const showPicker = () => setIsShowPicker(!isShowPicker);

    // emoji插件裝入DB
    const selectEmoji = (e) => {
        // 取得emoji的編號
        const emojiCode = e.unified.split("-");
        // 將取得的編號引入Array List
        let codeArray = [];
        emojiCode.forEach((eArray) => codeArray.push("0x" + eArray));  //Example [0x1f605]
        const emoji = String.fromCodePoint(...codeArray); //😀
        setIsShowPicker(false);
        props.onChange(emoji);
    }

  return (
    <Box>
        <Typography variant='h3' fontWeight='700' sx={{cursor:"pointer"}} onClick={showPicker}>
            {selectedEmoji}
        </Typography>
        <Box sx={{display: isShowPicker ? "block" : "none", position: "absolute", zIndex:"100"}}>
            {/* emoji插件 */}
            <Picker onEmojiSelect={selectEmoji}/>
        </Box>
    </Box>
  )
}

export default EmojiPicker