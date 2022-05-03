import React, {FC} from 'react';
import {TOrder, TOrderLines} from './OrderModel';

export type TOrderContext = {
  details: TOrder;
  lines: TOrderLines;
  selectedLines: Array<number>;
};

type TInternalOrderContext = TOrderContext & {
  setDetails(order: TOrder): void;
  setLines(lines: TOrderLines): void;
  setSelectedLines(lines: Array<number>): void;
};

const defaultValues: TInternalOrderContext = {
  details: {
    percentageStatus: 0,
    date: new Date(),
    entityNumber: 0,
    provider: '',
    total: 0,
  },
  lines: [],
  selectedLines: [],
  setDetails(): void {
  },
  setLines(): void {
  },
  setSelectedLines(): void {
  },
};

export const OrderContext =
  React.createContext<TInternalOrderContext>(defaultValues);

export const OrderContextProvider: FC<TOrderContext> = (props) => {
  const [details, setDetails] = React.useState<TOrder>(props.details as TOrder);
  const [lines, setLines] = React.useState<TOrderLines>(props.lines);
  const [selectedLines, setSelectedLines] = React.useState<Array<number>>(
    props.selectedLines
  );

  const value: TInternalOrderContext = {
    details,
    lines,
    selectedLines,
    setDetails,
    setLines,
    setSelectedLines,
  };
  return (
    <OrderContext.Provider value={value}>
      {props.children}
    </OrderContext.Provider>
  );
};
