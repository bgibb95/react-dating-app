import { FormEvent, useState } from 'react';

import { LockOutlined } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

interface LoginComponentState {
  username: string;
  password: string;
  loading: boolean;
  errorMessage: string;
}

export default function Login() {
  const [state, setState] = useState<LoginComponentState>({
    username: '',
    password: '',
    loading: false,
    errorMessage: '',
  });
  const onChangeUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      username: event.currentTarget.value,
    });
  };
  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: event.currentTarget.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();

    setState({
      ...state,
      errorMessage: '',
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
          errorMessage: resMessage,
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

        <ValidatorForm onSubmit={handleSubmit}>
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

        {state.errorMessage && (
          <Alert
            sx={{ m: 2 }}
            variant='outlined'
            severity='warning'
            onClose={() => setState({ ...state, errorMessage: '' })}
          >
            {state.errorMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
}
