import { useContext } from 'react';
import { Box, Avatar, Typography, TextField, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from './firebase';
import { AuthContext } from './context/AuthContext';

const SignUp = () => {
  const loggedUser = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let email = data.get('email') as string;
    let password = data.get('password') as string;
    let confirmPassword = data.get('confirmPassword') as string;

    if (password !== confirmPassword) return;

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (err: any) {
      console.error(err.message);
    }
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Typography>{loggedUser && loggedUser!.email}</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="confirm-password"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link href="/login" variant="body2">
              {'Already have an account? Log In'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
