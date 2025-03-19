import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormConainer, PaymentFormContainer } from "./payment-form.styles";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then((res) => res.json());
    // Get Client Secret form response
    const {
      paymentIntent: { client_secret },
    } = response;
    console.log("C Secret", client_secret);
  
  
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Ben Corbett",
        },
      },
    });

    if(paymentResult.error) {
      alert(paymentResult.error) 
    } else {
      if(paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Success')
      }
    }
  };

  return (
    <div>
      <PaymentFormContainer>
        <FormConainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment: </h2> <CardElement />
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
        </FormConainer>
      </PaymentFormContainer>
    </div>
  );
}
