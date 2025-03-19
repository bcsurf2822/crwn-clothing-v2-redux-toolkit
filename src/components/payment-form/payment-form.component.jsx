import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormConainer, PaymentFormContainer } from "./payment-form.styles";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefaule();

    if (!stripe || !elements) {
      return;
    }
  };
  return (
    <div>
      <PaymentFormContainer>
        <FormConainer>
          <h2>Credit Card Payment: </h2> <CardElement />
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
        </FormConainer>
      </PaymentFormContainer>
    </div>
  );
}
