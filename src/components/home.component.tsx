import { Alert, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../common/interfaces';
import { eventBus } from '../common/utilities';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

interface HomeComponentState {
  errorMessage: string;
  users: User[] | null | undefined;
}

export default function Home() {
  const [state, setState] = useState<HomeComponentState>({ errorMessage: '', users: null });
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 0.1,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 0.1,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 0.1,
    },
    {
      field: 'registrationDate',
      headerName: 'Registration date',
      flex: 0.1,
    },
  ];
  let count = 1;
  const rows = state.users?.map((user) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      registrationDate: user.createdAt ? new Date(user.createdAt).toLocaleString() : null,
      id: count++,
      username: user.username,
    };
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) return navigate(`/login`);

    UserService.getAllUsers().then(
      (response) => {
        setState({
          ...state,
          users: response.data.users,
          errorMessage: '',
        });
      },
      (error) => {
        setState({
          ...state,
          errorMessage:
            error?.response?.data?.message ||
            'Sorry, something went wrong fetching the users. Please try again later.',
        });

        if (error.response && error.response.status === 401) {
          eventBus.dispatch('logout');
        }
      }
    );
  }, []);

  const handleRowClick: GridEventListener<'rowClick'> | undefined = (params, event) => {
    event.stopPropagation(); // Prevents selecting this row after clicking
    navigate(`/view-profile?user=${params.row.username}`);
  };

  return (
    <Box
      sx={{
        height: '75vh',
        width: '80vw',
        margin: '40px auto 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {state?.users?.length && (
        <React.Fragment>
          <Typography
            sx={{
              marginBottom: '30px',
            }}
            component='h1'
            variant='h5'
          >
            Find your partner below
          </Typography>
          {rows && (
            <DataGrid
              sx={{
                width: '100%',
                '.MuiDataGrid-row': { cursor: 'pointer' },
              }}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onRowClick={handleRowClick}
            />
          )}
        </React.Fragment>
      )}
      {state.errorMessage && (
        <Alert
          variant='outlined'
          severity='warning'
          onClose={() => setState({ ...state, errorMessage: '' })}
        >
          {state.errorMessage}
        </Alert>
      )}
    </Box>
  );
}
