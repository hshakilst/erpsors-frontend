import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const customStyles = {
  menu: (provided) => ({
    ...provided,
    marginTop: "1rem",
  }),

  menuList: (provided) => ({
    ...provided,
    fontSize: "1rem",
    fontWeight: 400,
    color: "#14142B",
    letterSpacing: "0.047rem",
    "&:hover": {
      selectMenu: "#EFF0F6",
    },
  }),

  control: (provided) => ({
    ...provided,
    width: "100%",
    border: "none",
    paddingTop:10,
    boxShadow: "none",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: () => ({
    color: "#14142B",
    paddingTop: ".3rem",
  }),

  valueContainer: (provided) => ({ ...provided, flexWrap: "nowrap" }),
  indicatorContainer: (provided) => ({ ...provided }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "1rem",
    fontWeight: 400,
    color: "#14142B",
    letterSpacing: "0.047rem",
  }),
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function StyledSelect({
  name,
  placeholder,
  control,
  defaultValue,
  children,
  ...props
}) {
  return (
    <Controller
      render={(props) => (
        <Select
          {...props}
          placeholder={placeholder}
          isClearable
          isSearchable
          isMulti
          blurInputOnSelect
          options={options}
          styles={customStyles}
          delimiter=","

        />
      )}
      name={name}
      defaultValue={defaultValue}
      control={control}
    />
  );
}
