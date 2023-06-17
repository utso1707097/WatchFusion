import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Videos,ChannelCard } from "./"
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const {id} = useParams();
  const [channelDetail,setChannelDetail] = useState(null);
  const [videos,setVideos] = useState([]);

  //console.log(channelDetail);
  //console.log(videos);
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  },[id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(39,39,217,1) 0%, rgba(36,36,201,1) 34%, rgba(0,212,255,1) 86%)',
      zIndex:10,
      height:'300px',marginBottom:"20px"}}>
        <ChannelCard channelDetail={channelDetail}/>
        </div>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail