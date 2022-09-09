import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Post } from '../post/Post';
import { Stack, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { display } from '@mui/system';

export const PersonalFeed = (props: any) => {
   const [userFeed, setUserFeed] = useState<any>([]);
   const [displayedPosts, setDisplayedPosts] = useState([]);
   const [numDisplayed, setNumDisplayed] = useState(2);

   useEffect(() => {
     fetchUserFeed();
   },[]);

   useEffect(() => {
     setDisplayedPosts(userFeed.splice(0, numDisplayed));
   }, [numDisplayed])

   function fetchUserFeed () {
     axios.get('http://localhost:8080/videoDB/user/feed', {params: {userName: props.userName}})
       .then((results) => {
         setUserFeed(results.data);
         setDisplayedPosts(results.data.splice(0, numDisplayed));
       })
       .catch((error: any) => {
         console.log('fetchUserFeed() Failed: ', error);
       })
   }

   const showMore = (<Button variant="text" startIcon={<ExpandMoreIcon />} onClick={() => {
         setNumDisplayed(numDisplayed + 2);
      }}>
         SHOW MORE
      </Button>
   );

   const showLess = (<Button variant="text" startIcon={<ExpandLessIcon />} onClick={() => {
      setNumDisplayed(numDisplayed - 2);
   }}>
      SHOW LESS
   </Button>
);

   return (
      <div>
         <Stack spacing={2} className="personalFeed">
            {displayedPosts.map((feedData: any, index: number) => {
            return (
               <Post
                  feedData={feedData}
                  key={index}
                  setValue={props.setValue}
                  setFolloweeData={props.setFolloweeData}
               />
            );
            })}
         </Stack>
         <Stack direction="row" spacing={1} justifyContent="left" alignItems="center"  className="showMoreOrLess">
            {(numDisplayed >= displayedPosts.length) ? showMore : null}
            {(displayedPosts.length > 2) ? showLess : null}
         </Stack>
      </div>
   );
};
