import React, {useEffect} from 'react';
import { styled, Chip, Paper, Container, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

type ChildProps = {
  service: string;
  handleDelete: any;
};

export const OwnedProviderItem : React.FC<ChildProps> = ({service, handleDelete}) => {
  
  useEffect(() => {
    console.log('in useEffect of OwnedProviderItem')
  }, [service])
  return (
    <ListItem >
      <Chip
        label={service}
        onDelete={handleDelete(service)}
        deleteIcon={<RemoveCircleOutlineIcon />}
      />
  </ListItem>
  )
}