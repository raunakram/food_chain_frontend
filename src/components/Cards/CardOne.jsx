import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import lizard from '../../assets/lizard.jpg'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from 'react-hot-toast';

export default function CardOne({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={lizard}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <a href='#'>{data.message}</a>
          <PayPalScriptProvider options={{ "client-id": "AbffzeI4M-S3QdJaQ-EY1ovXMiGFsWC5yOPomyN7W4gqvG4aM3_NkzikkVCFA-xW-JMrg4mEk_k4QVq7" }}>
            <PayPalButtons style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1.00",
                      },
                    },
                  ],
                });
              }}

              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                  toast.success("Payment completed" + details.id)
                })
              }}

              onCancel={() => {
                toast('You cancelled payments', {
                  duration: 10000
                })
              }}

              onError={() => {
                toast.error("There was an error with your payment...")
              }}

            />
          </PayPalScriptProvider>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
