import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export default function Home() {
  const [state, setState] = useState<any>({});
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
    {
      field: 'username',
      headerName: 'Profile',
      flex: 0.1,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/view-profile?user=${params.row.username}`);
        };

        return <Button onClick={onClick}>View</Button>;
      },
    },
  ];
  let count = 1;
  const rows = state?.users?.map((user: any) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      registrationDate: new Date(user.createdAt).toLocaleString(),
      id: count++,
      username: user.username,
    };
  });

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setState({
          users: response.data.users,
        });

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) navigate(`/login`);
      },
      (error) => {
        setState({
          content: (error.response && error.response.data) || error.message || error.toString(),
        });
      }
    );
  }, []);

  return (
    <Box
      sx={{
        height: '500px',
        width: '80vw',
        margin: '40px auto 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          marginBottom: '30px',
        }}
        component='h1'
        variant='h5'
      >
        Find your partner below
      </Typography>
      {state?.users?.length && (
        <DataGrid
          sx={{
            width: '100%',
          }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      )}
    </Box>
  );
}
