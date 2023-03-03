import { Person } from '@mui/icons-material';
import { Avatar, Box, Button, Container, CssBaseline, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

export default function Register() {
  const [state, setState] = useState<any>({
    loading: false,
    message: '',
    user: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      gender: '',
      hobbies: '',
      occupation: '',
    },
  });

  ValidatorForm.addValidationRule('isValidUsername', (value: string) => {
    return value.length <= 30 && value.length >= 3;
  });

  ValidatorForm.addValidationRule('isValidPassword', (value: string) => {
    return value.length <= 40 && value.length >= 6;
  });

  ValidatorForm.addValidationRule('isValidText', (value: string) => {
    return value.length <= 255 && value.length >= 5;
  });

  ValidatorForm.addValidationRule('isValidOccupation', (value: string) => {
    return value.length <= 50 && value.length >= 3;
  });

  const onChangeUsername = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        username: e.target.value,
      },
    });
  };

  const onChangeFirstName = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        firstName: e.target.value,
      },
    });
  };

  const onChangeLastName = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        lastName: e.target.value,
      },
    });
  };

  const onChangePassword = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        password: e.target.value,
      },
    });
  };

  const onChangeGender = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        gender: e.target.value,
      },
    });
  };

  const onChangeHobbies = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        hobbies: e.target.value,
      },
    });
  };

  const onChangeEmail = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        email: e.target.value,
      },
    });
  };

  const onChangeOccupation = (e: any) => {
    setState({
      ...state,
      user: {
        ...state.user,
        occupation: e.target.value,
      },
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

    AuthService.register(state.user).then(
      () => {
        navigate('/');
        window.location.reload();
      },
      (error) => {
        console.log(error);

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
          marginBottom: 10,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Person />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create your dating profile
        </Typography>

        <ValidatorForm onSubmit={handleSubmit} onError={(errors: any) => console.log(errors)}>
          <TextValidator
            margin='normal'
            fullWidth
            label='Username'
            name='username'
            value={state.user?.username || ''}
            onChange={onChangeUsername}
            validators={['required', 'isValidUsername']}
            errorMessages={[
              'Enter a username for your profile',
              'Your username should be between 3 and 30 characters',
            ]}
          />

          <TextValidator
            margin='normal'
            fullWidth
            name='new-password'
            label='Password'
            type='password'
            value={state.user?.password || ''}
            onChange={onChangePassword}
            validators={['required', 'isValidPassword']}
            errorMessages={[
              'Enter a password for your profile',
              'Your password should be between 6 and 40 characters',
            ]}
          />

          <TextValidator
            margin='normal'
            fullWidth
            label='First name'
            name='firstName'
            value={state.user?.firstName || ''}
            onChange={onChangeFirstName}
            validators={['required']}
            errorMessages={['Enter your first name']}
          />

          <TextValidator
            margin='normal'
            fullWidth
            label='Last name'
            name='lastName'
            value={state.user?.lastName || ''}
            onChange={onChangeLastName}
            validators={['required']}
            errorMessages={['Enter your last name']}
          />

          <TextValidator
            margin='normal'
            fullWidth
            type='text'
            name='email'
            label='Email'
            value={state.user?.email || ''}
            onChange={onChangeEmail}
            validators={['required', 'isEmail']}
            errorMessages={['Enter your email address', 'Enter a valid email address']}
          />

          <SelectValidator
            margin='normal'
            fullWidth
            type='select'
            name='gender'
            label='Gender'
            value={state.user?.gender || ''}
            onChange={onChangeGender}
            validators={['required']}
            errorMessages={['Select your sex']}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
          </SelectValidator>

          <TextValidator
            margin='normal'
            fullWidth
            type='text'
            name='hobbies'
            label='Hobbies'
            value={state.user?.hobbies || ''}
            onChange={onChangeHobbies}
            validators={['required', 'isValidText']}
            errorMessages={[
              'Enter what you do for fun',
              'Your hobbies should be between 5 and 255 characters',
            ]}
          />

          <TextValidator
            margin='normal'
            fullWidth
            type='text'
            name='occupation'
            label='Occupation'
            value={state.user?.occupation || ''}
            onChange={onChangeOccupation}
            validators={['required', 'isValidOccupation']}
            errorMessages={[
              'Enter your job title',
              'Your hobbies should be between 3 and 50 characters',
            ]}
          />

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </ValidatorForm>

        {state.message && <h5>{state.message}</h5>}
      </Box>
    </Container>
  );
}
