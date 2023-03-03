import { useState } from 'react';

import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

export default function Login() {
  const [state, setState] = useState<any>({
    username: '',
    password: '',
    loading: false,
    message: '',
  });
  const onChangeUsername = (e: any) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };
  const onChangePassword = (e: any) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (event: any) => {
    event.preventDefault();

    setState({
      ...state,
      message: '',
      loading: true,
    });

    AuthService.login(state.username, state.password).then(
      () => {
        navigate('/');
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setState({
          ...state,
          loading: false,
          message: resMessage,
        });
      }
    );
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>

        <ValidatorForm onSubmit={handleSubmit} onError={(errors: any) => console.log(errors)}>
          <TextValidator
            margin='normal'
            fullWidth
            label='Username'
            name='username'
            autoFocus
            value={state.username || ''}
            onChange={onChangeUsername}
            validators={['required']}
            errorMessages={['Enter the username for your profile']}
          ></TextValidator>

          <TextValidator
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            value={state.password || ''}
            onChange={onChangePassword}
            validators={['required']}
            autoComplete='current-password'
            errorMessages={['Enter the password for your profile']}
          ></TextValidator>

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </ValidatorForm>

        {state.message && <h5>{state.message}</h5>}
      </Box>
    </Container>
  );
}

//export default withRouter(Login);
