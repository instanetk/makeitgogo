import { useState, FormEvent } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  const [error, setError] = useState<string>('');
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let email = data.get('email') as string;
    let password = data.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return <LoginForm handleSubmit={handleSubmit} error={error} />;
};

export default Login;
