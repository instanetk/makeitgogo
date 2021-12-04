import { FC, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripeTokenHandler } from '../../services/contributionService';
import { ICampaign } from '../../interfaces';

interface IProps {
  open: boolean;
  handleClose: () => void;
  campaign: ICampaign;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
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

const PaymentModal: FC<IProps> = ({ open, handleClose, campaign }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

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
        console.log(result.error.message);
      } else {
        // Send the token to server.
        let token = result.token;

        let transaction = {
          amount: 100,
          fundraiserId: campaign._id as string,
          token,
        };
        setIsLoading(true);
        stripeTokenHandler(transaction);
      }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="credit card payment form"
      aria-describedby="to make a contribution to this campaign enter your credit card details">
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
          MakeItGoGo is a is a demo for Stripe Connect and Express. It is not a real product. Payments will not be
          processed. Use card number 4242 4242 4242 4242 with an exipiration date anytime in the future, random CVC and
          Zip.
        </Typography>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
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
