import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import EventBus from '../common/EventBus';
import UserService from '../services/user.service';

import { Person } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { User } from '../common/interfaces';

interface ViewProfileComponentState {
  user: User | null;
}

export default function ViewProfile() {
  const [state, setState] = useState<ViewProfileComponentState>({ user: null });
  const [queryParameters] = useSearchParams();
  const usernameUrlParam = queryParameters.get('user');

  useEffect(() => {
    if (!usernameUrlParam) return;

    UserService.getUserProfile(usernameUrlParam).then(
      (response) => {
        setState({
          user: response.data.user,
        });
      },
      (error) => {
        setState({
          user:
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      }
    );
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
                Their Dating Profile
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
              {state.user.createdAt && (
                <Typography>{new Date(state.user.createdAt).toLocaleString()}</Typography>
              )}
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
