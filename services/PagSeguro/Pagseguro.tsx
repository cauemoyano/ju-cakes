import axios from "axios";

const URL = `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${process.env.NEXT_PUBLIC_PAGSEGURO_EMAIL}&token=${process.env.NEXT_PUBLIC_PAGSEGURO_TOKEN}`;

export const createCode = async () => {
  const options = {
    currency: "BRL",
    "item: id": "xxdd",
    "item: description": "desc",
    "item: amount": 22.0,
    "item: quantity": 2,
    "item: weight": 500,
    "shipping: addressRequired": false,
  };

  try {
    const res = await axios.post(URL, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
      },
      data: options,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
