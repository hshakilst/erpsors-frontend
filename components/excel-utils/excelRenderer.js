import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import XLSX from "xlsx";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export const ReactExcel = (props) => {
  const theme = useTheme();
  const {
    initialData,
    onSheetUpdate,
    reactExcelClassName,
    activeSheetClassName,
  } = props;
  const [parsedData, setParsedData] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(undefined);
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);

  const createTableHeader = (firstRow) => {
    return (
      <TableHead>
        <TableRow>
          {Object.values(firstRow).map((cell, idx) => (
            <TableCell
              key={idx}
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                updateSheet(e.currentTarget.textContent, 0, idx);
              }}
            >
              {cell}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const createTableBody = (rowArray) => {
    const rows = rowArray.slice(1);
    return (
      <TableBody>
        {rows.map((row, id) => (
          <TableRow key={id}>
            {row.map((cell, idx) => (
              <TableCell
                key={idx}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  updateSheet(e.currentTarget.textContent, id + 1, idx);
                }}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const updateSheet = (newValue, row, col) => {
    const sheetRow = Object.values(currentSheet)[0][row];
    sheetRow.splice(col, 1, newValue);
    Object.values(currentSheet)[0].splice(row, 1, sheetRow);
    setCurrentSheet({
      ...currentSheet,
      [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0],
    });
    onSheetUpdate &&
      onSheetUpdate({
        [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0],
      });
  };

  const handleClick = (e, id) => {
    const sheet = parsedData.find((o) =>
      Object.keys(o).includes(e.target.value)
    );
    setCurrentSheet(sheet);
    onSheetUpdate && onSheetUpdate(sheet);
    setActiveSheet(id);
  };

  useEffect(() => {
    const setData = () => {
      const sheetNames = initialData.SheetNames;
      setSheetNames(sheetNames);
      const result = sheetNames.map((name) => {
        const ws = initialData.Sheets[name];
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defval: "",
        });
        return {
          [name]: dataParse,
        };
      });
      setParsedData(result);
      setCurrentSheet(result[0]);
      onSheetUpdate && onSheetUpdate(result[0]);
    };

    initialData && setData();
  }, [initialData]);

  return (
    <Box className={reactExcelClassName}>
      <Box my={2}>
        {sheetNames.map((name, idx) => (
          <Button
            key={idx}
            value={name}
            onClick={(e) => handleClick(e, idx)}
            className={`${
              activeSheet === idx ? `${activeSheetClassName}` : ""
            }`}
            variant="text"
            color="primary"
          >
            {name}
          </Button>
        ))}
      </Box>
      {currentSheet && (
        <TableContainer
          style={{
            borderRadius: 4,
            border: "2px solid",
            height: 300,
            width: "100%",
          }}
        >
          <Table
            size="small"
            style={{
              maxHeight: 400,
              minWidth: 650,
              backgroundColor: theme.palette.grey.inputBackground,
              boxShadow: "none",
            }}
          >
            {createTableHeader(Object.values(currentSheet)[0][0])}
            {createTableBody(Object.values(currentSheet)[0])}
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

// ReactExcel.propTypes = {
//   initialData: PropTypes.object,
//   onSheetUpdate: PropTypes.func,
//   activeSheetClassName: PropTypes.string,
//   reactExcelClassName: PropTypes.string,
// };

export const readFile = (file) => {
  var reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      var data = new Uint8Array(event.target.result);
      let readedData = XLSX.read(data, { type: "array" });
      if (readedData) {
        resolve(readedData);
      } else {
        reject({ message: "Error reading file" });
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

readFile.propTypes = {
  file: PropTypes.object.isRequired,
};

export const generateObjects = (currentSheet) => {
  const rows = Object.values(currentSheet)[0];
  const keys = rows[0];
  let result = [];
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])));
  }
  return result;
};

generateObjects.propTypes = {
  currentSheet: PropTypes.object.isRequired,
};
