import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './FollowingList.scss';
import { FollowingItem } from '../following-item/FollowingItem';
import { Box, Paper, Grid } from '@mui/material';
import { isArray } from 'cypress/types/lodash';

// make axios call to mongo api to get all followers for current user --> where is source of truth for that? --> login?
  // pass results to state via react hook

// for each followed (map) Instantiate a <followingItem> with relevant data (username)

export const FollowingList = () => {
  const [followingList, setFollowingList] = useState<any>([])
  const [userName, setUserName] = useState<string | undefined>('Nourse41');

  useEffect(() => {
    console.log('use effect')
    fetchFollowingList();
  },[])

  function fetchFollowingList () {
    axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
      .then((results: any) => {
        setFollowingList(results.data.followingList);
      })
      .catch((error) => {
        console.log('fetchFollowingList() Failed', error);
      })
  }

  console.log('followingList', followingList);

  return (
    <div>
      {followingList.map((userName: any, index: any) => {
        return (
          FollowingItem(userName, index)
        );
      })}
    </div>
        //   <Box sx={{ flexGrow: 1 }}>
        //   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        //     {Array.from(Array(6)).map((_, index) => (
        //       <Grid xs={2} sm={4} md={4} key={index}>
        //         {FollowingItem(userName, index)}
        //       </Grid>
        //     ))}
        //   </Grid>
        // </Box>
  );
};