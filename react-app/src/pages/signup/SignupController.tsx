import { useState, FormEvent } from 'react';
import SignupForm from './SignupForm';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let email = data.get('email') as string;
    let password = data.get('password') as string;
    let confirmPassword = data.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return <SignupForm handleSubmit={handleSubmit} error={error} loading={loading} />;
};

export default SignUp;
