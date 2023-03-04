import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import EventBus from './common/EventBus';
import Home from './components/home.component';
import Login from './components/login.component';
import Profile from './components/profile.component';
import Register from './components/register.component';
import AuthService from './services/auth.service';

import { AppRegistrationRounded, LoginOutlined, Logout, Person, Search } from '@mui/icons-material';
import { User } from './common/interfaces';
import ViewProfile from './components/view-profile.component';

interface AppComponentState {
  currentUser: User | null;
}

function App() {
  const [state, setState] = useState<AppComponentState>({
    currentUser: null,
  });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: [
        'Nunito',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  const [value, setValue] = useState('recents');
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'logout') {
      logOut();
      return;
    }
    navigate(`/${newValue}`);
  };
  const logOut = () => {
    AuthService.logout();
    setState({
      currentUser: null,
    });
    navigate('/login');
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setState({
        currentUser: user,
      });
    }
    EventBus.on('logout', () => {
      logOut();
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <link href='https://fonts.googleapis.com/css2?family=Nunito&display=swap' rel='stylesheet' />
      <CssBaseline />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Person sx={{ m: 1 }} />
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              The Love Doctor
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div>
        <div className='container mt-3'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/view-profile' element={<ViewProfile />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={logOut} /> */}

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation value={value} onChange={handleChange} showLabels>
            {state.currentUser && (
              <BottomNavigationAction label='Find love' value='home' icon={<Search />} />
            )}
            {state.currentUser && (
              <BottomNavigationAction label='Profile' value='profile' icon={<Person />} />
            )}
            {!state.currentUser ? (
              <BottomNavigationAction label='Login' value='login' icon={<LoginOutlined />} />
            ) : (
              <BottomNavigationAction label='Logout' value='logout' icon={<Logout />} />
            )}
            {!state.currentUser && (
              <BottomNavigationAction
                label='Register'
                value='register'
                icon={<AppRegistrationRounded />}
              />
            )}
          </BottomNavigation>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default App;
