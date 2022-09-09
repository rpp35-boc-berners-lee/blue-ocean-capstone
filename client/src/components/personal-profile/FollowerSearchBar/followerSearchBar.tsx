import React, { useState, useEffect } from 'react';
import { SearchItem } from './searchItem/searchItem';
import axios from 'axios';
import { TextField, Box, InputAdornment } from '@mui/material';

export const FollowerSearchBar = (props: any) => {
   const [userList, setUserList] = useState([]);
   const [matchedUserList, setMatchedUserList] = useState<any>([]);
   const [shownSearchItems, setShownSearchItems] = useState<any>(undefined);

   useEffect(() => {
      fetchUserList();
   }, []);

   useEffect(() => {
      setShownSearchItems(
         matchedUserList.map((followee: any, index: number) => {
            return (
               <SearchItem
                  followee={followee}
                  key={index}
                  setValue={props.setValue}
                  setFolloweeData={props.setFolloweeData}
               />
            );
         })
      );
   }, [matchedUserList]);

   function fetchUserList() {
      axios
         .get('http://localhost:8080/videoDB/user/all')
         .then((results: any) => {
            setUserList(results.data);
         })
         .catch((error: any) => {
            console.log('fetchUserList() FAILED: ', error);
         });
   }

   function handleChange(event: any) {
      let regex = new RegExp(event.target.value);
      let matchedUsers: any = [];
      if (event.target.value.length >= 2) {
         matchedUsers = userList.filter((user: any) => {
            if (regex.test(user)) {
               return user;
            }
         });
      }
      setMatchedUserList(matchedUsers);
   }

   return (
      <div>
         <TextField
            sx={{ mt: 3, ml: 3 , width: '25ch' }}
            variant='outlined'
            className='followerSearchBar'
            fullWidth
            label='Search a user...'
            onChange={handleChange}
         />
         <>{shownSearchItems}</>
      </div>
   );
};
