import { Person } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../common/interfaces';
import AuthService from '../services/auth.service';

interface ProfileComponentState {
  redirect?: null | string;
  userReady: boolean;
  user: User | null | undefined;
}

export default function Profile() {
  const [state, setState] = useState<ProfileComponentState>({
    redirect: null,
    userReady: false,
    user: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) navigate('/login');
    setState({ user: currentUser, userReady: true });
  }, []);

  return state.user ? (
    <Box sx={{ maxWidth: 520, margin: '80px auto', width: '80vw' }}>
      <Card variant='outlined'>
        <React.Fragment>
          <CardContent>
            <Avatar sx={{ margin: '10px auto 20px', bgcolor: 'secondary.main' }}>
              <Person />
            </Avatar>
            <Typography sx={{ fontSize: 14, mb: 2 }} color='text.secondary' gutterBottom>
              Your Dating Profile
            </Typography>
            <Typography sx={{ mb: 4 }} variant='h5' component='div'>
              {state.user.firstName} {state.user.lastName}
            </Typography>
            <Typography sx={{ mb: 1 }} color='text.secondary'>
              Email
            </Typography>
            <Typography sx={{ mb: 4 }}>{state.user.email}</Typography>
            <Typography sx={{ mb: 1 }} color='text.secondary'>
              Username
            </Typography>
            <Typography sx={{ mb: 4 }}>{state.user.username}</Typography>
            <Typography sx={{ mb: 1 }} color='text.secondary'>
              Occupation
            </Typography>
            <Typography sx={{ mb: 4 }}>{state.user.occupation}</Typography>
            <Typography sx={{ mb: 1 }} color='text.secondary'>
              Hobbies
            </Typography>
            <Typography sx={{ mb: 4 }} variant='body2'>
              {state.user.hobbies}
            </Typography>
            <Typography sx={{ mb: 1 }} color='text.secondary'>
              Gender
            </Typography>
            <Typography sx={{ mb: 4 }}>{state.user.gender}</Typography>
            <Typography sx={{ mb: 1 }} color='text.secondary'>
              Member since
            </Typography>
            {state.user.createdAt && (
              <Typography>{new Date(state.user.createdAt).toLocaleString()}</Typography>
            )}
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
