import { FC, useState } from 'react';
import { Modal, Box, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripeTokenHandler } from '../../services/contributionService';
import { IPaymentModalProps } from '../../interfaces';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#000',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '1.4rem',
      '::placeholder': {
        color: '#333',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: '#6d1b7b',
  p: 4,
  borderRadius: '10px',
  outlineStyle: 'none',
  width: '300px',
};

const PaymentModal: FC<IPaymentModalProps> = ({ open, handleClose, campaign, fetchData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | undefined>('');

  const stripe = useStripe();
  const elements = useElements();

  const handleAmount = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let amount = parseInt(event.target.value);
    if (!isNaN(amount)) {
      setAmount(amount);
    } else setAmount(null);
  };

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    let result;
    if (card !== null) result = await stripe.createToken(card);

    if (result !== undefined)
      if (result.error) {
        // Show error to customer.
        setError(result.error.message);
      } else {
        // Send the token to server.
        let token = result.token;

        if (amount === null) return;
        let transaction = {
          amount,
          fundraiserId: campaign._id as string,
          token,
        };
        setIsLoading(true);
        const { data } = await stripeTokenHandler(transaction);

        console.log(data);
        if (data.status === 'succeeded') {
          handleClose();
          fetchData();
        }
      }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-label="credit card payment form to make a contribution to this campaign enter credit card details">
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          MakeItGoGo is a is a demo application for Stripe integration. It is not a real product. Payments will not be
          processed. Use card number 4242 4242 4242 4242 with an expiration date anytime in the future, random CVC and
          any Zip.
        </Typography>

        <FormControl fullWidth>
          <InputLabel htmlFor="goal_amount">In U.S. Dollars</InputLabel>
          <OutlinedInput
            id="amount"
            placeholder="500"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            endAdornment={<InputAdornment position="end">USD</InputAdornment>}
            label="amount"
            sx={{ width: '100%', fontWeight: 'bold', fontSize: '2rem' }}
            onChange={handleAmount}
            value={amount}
            type="number"
          />
        </FormControl>

        <Box sx={{ marginTop: '20px' }}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Box>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          variant="contained"
          color="info"
          sx={{ height: '3rem', width: '100%', fontSize: '1.3rem', marginTop: '25px' }}>
          Make Contribution
        </Button>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
