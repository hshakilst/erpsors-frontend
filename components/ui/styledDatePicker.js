import React, { Fragment, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function StyledDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(null);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        {...props}
        autoOk
        clearable
        disablePast
        label={props.label}
        format="dd/MM/yyyy"
        InputProps={{
          disableUnderline: true,
        }}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}
