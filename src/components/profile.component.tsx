import { Person } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

export default function Profile() {
  const [state, setState] = useState<any>({
    redirect: null,
    userReady: false,
    user: { username: '' },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) navigate('/login');
    setState({ user: currentUser, userReady: true });
  }, []);

  return (
    state.user && (
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
              <Typography>{new Date(state.user.createdAt).toLocaleString()}</Typography>
            </CardContent>
            <CardActions>
              <Button href={'mailto:' + state.user.email} sx={{ mb: 1 }} size='small'>
                Get in touch with email
              </Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    )
  );
}
