/* eslint-disable */
import * as functions from "firebase-functions";
import * as mercadopago from "mercadopago";
import { uid } from "uid";

if (process.env.MERCADOPAGO_PUBLIC_KEY) {
  mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_PUBLIC_KEY);
}

// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
import { OrderData, Product } from "./types";
import { PaymentCreateResponse } from "mercadopago/resources/payment";
/* import { Product } from "./types"; */
admin.initializeApp();

exports.createPayment = functions.https.onCall(async (data, context) => {
  const store = admin.firestore();
  const today = new Date();
  const orderId =
    `ORDEM${today.getDate()}${today.getMonth()}${today.getFullYear()}${uid(
      6
    )}`.toUpperCase();

  const { mercadoData, orderData }: { mercadoData: any; orderData: OrderData } =
    data;
  let paymentResponse: PaymentCreateResponse;
  try {
    paymentResponse = await mercadopago.payment.save({
      ...mercadoData,
      payer: { ...mercadoData.payer, email: orderData.email },
    });
  } catch (err) {
    throw new functions.https.HttpsError(
      "unavailable",
      "Failed processing payment"
    );
  }
  const { status, id, transaction_details, transaction_amount } =
    paymentResponse.body;
  const {
    uid: ordId,
    name,
    email,
    phone,
    dateAndPeriod,
    cart,
    paymentRate,
  } = orderData;
  if (status === "approved") {
    try {
      await store
        .collection("orders")
        .doc(orderId)
        .set({
          status,
          paymentId: id,
          transaction_details,
          transaction_amount,
          customerId: ordId || null,
          name,
          email,
          phone: phone || null,
          dateAndPeriod,
          cart,
          paymentRate,
          createAt: admin.firestore.Timestamp.now(),
        });

      return orderId;
    } catch (error) {
      throw new functions.https.HttpsError("internal", "Error creating order");
    }
  }

  throw new functions.https.HttpsError("aborted", "Payment failed");
});

type CartProduct = { quantity: number; price: number };

exports.getPaymentAmount = functions.https.onCall(async (data, context) => {
  const {
    cartItems,
  }: {
    cartItems: { id: string; quantity: number; variantSelected: string }[];
  } = data;

  const products = [] as CartProduct[];
  const store = admin.firestore();
  for (let item of cartItems) {
    const { id, quantity, variantSelected } = item;

    try {
      const docRef = await store.collection("products").doc(id).get();
      const product = docRef.data() as Product;
      console.log(product);
      if (!product?.variants) continue;
      const variant = product.variants.find((v) => v.name === variantSelected);
      if (!variant) continue;
      const data = { quantity, price: variant.price };
      products.push(data);
    } catch (error) {
      return error;
    }
  }
  if (!products.length) {
    throw new Error("No valid products");
  }
  const subtotal = products.reduce((total, curr) => {
    return (total += curr.price * curr.quantity);
  }, 0);

  return subtotal;
});
