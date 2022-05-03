import DateFnsUtils from '@date-io/date-fns';
import {css} from '@emotion/css';
import {Button, TextField} from '@material-ui/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import React, {ChangeEvent, FC} from 'react';
import {OrderContext, TOrderContext} from '../core/OrderContext';
import {TOrder, TOrderDetails} from '../core/OrderModel';

const styles = css`
  display: grid;
  grid-template:
    [row1-start] "number provider date nothing1" 1fr [row1-end]
    [row2-start] "total status nothing2 send" 1fr [row2-end];
  gap: 50px 20px;
  padding: 20px;
  border: solid 1px black;
`;

export type TProps = {
  onSend: (data: TOrderContext) => void;
};

const getTotal = (lines: TOrderDetails[]): number =>
  lines
    .map((line) => Number(line.amount))
    .reduce((previousValue, currentValue) => previousValue + currentValue);

const getPercentage = (lines: TOrderDetails[]): number =>
  (lines
      .map((line) => line.isValid)
      .reduce(
        (previousValue, currentValue) => Number(currentValue) + previousValue,
        0
      ) /
    lines.length) *
  100;

function validateData(details: TOrder): boolean {
  return (
    (details.percentageStatus ?? 0) >= 100 &&
    Boolean(details.entityNumber) &&
    Boolean(details.provider) &&
    Boolean(details.date)
  );
}

export const Header: FC<TProps> = (props) => {
  const {onSend} = props;
  const context = React.useContext(OrderContext);
  const {details, setDetails, lines} = context;

  details.total = getTotal(lines);
  details.percentageStatus = getPercentage(lines);

  const handleSendButton = () => {
    if (validateData(details)) {
      onSend(context);
    }
  };

  React.useEffect(() => {
    setDetails({
                 ...details,
                 total: getTotal(lines),
                 percentageStatus: getPercentage(lines),
               });
  }, [lines]);

  const handleInputChange = <K extends keyof TOrder>(
    property: K
  ): ((e: unknown) => void) => {
    return (data) => {
      details[property] = data as TOrder[K];
      setDetails({...details});
    };
  };
  const handleTextChange = (
    property: keyof TOrder
  ): ((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) => {
    return (e) => handleInputChange(property)(e.target.value);
  };

  return (
    <div className={styles}>
      <TextField
        required
        label="Número"
        value={details.entityNumber}
        onChange={handleTextChange('entityNumber')}
        error={!details.entityNumber}
      />
      <TextField
        required
        label="Proveedor"
        value={details.provider}
        onChange={handleTextChange('provider')}
        error={!details.provider}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required
          label="Fecha"
          variant="inline"
          format="dd/MM/yyyy"
          disableToolbar
          value={details.date}
          onChange={handleInputChange('date')}
          error={!details.date}
        />
      </MuiPickersUtilsProvider>
      <TextField
        style={{gridArea: 'total'}}
        label="Importe Total"
        InputProps={{readOnly: true}}
        value={details.total}
      />
      <TextField
        style={{gridArea: 'status'}}
        helperText="Estado"
        InputProps={{readOnly: true}}
        value={`${details.percentageStatus}%`}
      />
      <Button
        style={{gridArea: 'send'}}
        variant="contained"
        onClick={handleSendButton}
        disabled={!validateData(details)}
      >
        Enviar
      </Button>
    </div>
  );
};
