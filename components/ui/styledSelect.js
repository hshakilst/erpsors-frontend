import React from "react";
import Select from "react-select";

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

export default function StyledSelect(props) {
  return (
    <Select
      isClearable
      isMulti
      options={options}
      styles={customStyles}
      {...props}
    />
  );
}
