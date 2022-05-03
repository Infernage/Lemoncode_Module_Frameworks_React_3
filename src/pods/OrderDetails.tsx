import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { FC } from "react";
import { OrderContext } from "../core/OrderContext";
import { LineRow } from "./LineRow";

export const OrderDetails: FC = () => {
  const { selectedLines, setSelectedLines, lines, setLines } =
    React.useContext(OrderContext);

  const handleValidationButton = (status: boolean): void => {
    if (!selectedLines.length) return;

    for (const selectedLine of selectedLines) {
      lines[selectedLine].isValid = status;
    }

    setSelectedLines([]);
    setLines([...lines]);
  };

  return React.useMemo(
    () => (
      <div style={{ flex: 1 }}>
        <ButtonGroup variant="contained">
          <Button color="primary" onClick={() => handleValidationButton(true)}>
            Validar
          </Button>
          <Button color="default" onClick={() => handleValidationButton(false)}>
            Invalidar
          </Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography>Estado</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Descripción</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Importe</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lines?.map((line, index) => {
                return <LineRow key={index} index={index} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ),
    [lines, selectedLines]
  );
};
