import { Typography } from "@material-ui/core";
import React from "react";
import { OrderContextProvider, TOrderContext } from "../core/OrderContext";
import { Header } from "../pods/Header";
import { OrderDetails } from "../pods/OrderDetails";

const mockData: TOrderContext = {
  selectedLines: [],
  details: {
    date: new Date(),
    provider: "proveedor mockeado",
    entityNumber: 1,
  },
  lines: [
    { isValid: true, amount: 100.23, description: "asdf" },
    { isValid: false, amount: 21100.23, description: "expensive" },
    { isValid: true, amount: 34.23, description: "cheap" },
    { isValid: false, amount: 1044.23, description: "qwerty" },
    { isValid: false, amount: 582, description: "zxcvb" },
  ],
};

export const Checkout = () => {
  const handleOnSend = (data: TOrderContext): void => {
    console.log(data);
    alert("Datos enviados");
  };

  return (
    <OrderContextProvider {...mockData}>
      <Typography variant="h5">Pedido a proveedor</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "100vh",
        }}
      >
        <Header onSend={handleOnSend} />
        <OrderDetails />
      </div>
    </OrderContextProvider>
  );
};
