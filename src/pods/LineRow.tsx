import {
  Checkbox,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { ChangeEvent, FC } from "react";
import { OrderContext } from "../core/OrderContext";
import { TOrderDetails } from "../core/OrderModel";

export type TProps = {
  index: number;
};

export const LineRow: FC<TProps> = (props) => {
  const { index } = props;
  const { selectedLines, setSelectedLines, lines, setLines } =
    React.useContext(OrderContext);
  const currentLine = lines[index];

  const handleInputChange =
    <K extends keyof TOrderDetails>(
      property: K
    ): ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) =>
    (e) => {
      currentLine[property] = e.target.value as TOrderDetails[K];
      setLines([...lines]);
    };

  const isSelected = () => selectedLines.includes(index);
  const toggleIsSelected = () => {
    if (isSelected()) {
      selectedLines.splice(selectedLines.indexOf(index));
    } else {
      selectedLines.push(index);
    }
    setSelectedLines([...selectedLines]);
  };

  return (
    <TableRow
      hover
      role="checkbox"
      key={index}
      selected={isSelected()}
      aria-selected={isSelected()}
      onClick={() => toggleIsSelected()}
    >
      <TableCell>
        <Checkbox checked={isSelected()} />
      </TableCell>
      <TableCell>{currentLine.isValid ? "Válido" : "Pendiente"}</TableCell>
      <TableCell>
        <TextField
          disabled={currentLine.isValid}
          value={currentLine.description}
          onClick={(e) => e.stopPropagation()}
          onChange={handleInputChange("description")}
        />
      </TableCell>
      <TableCell>
        <TextField
          disabled={currentLine.isValid}
          InputProps={{
            endAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          type="number"
          value={currentLine.amount}
          onClick={(e) => e.stopPropagation()}
          onChange={handleInputChange("amount")}
        />
      </TableCell>
    </TableRow>
  );
};
