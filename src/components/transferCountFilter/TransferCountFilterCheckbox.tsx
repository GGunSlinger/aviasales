import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getFilterLabel } from "models/filter";
import Style from "./TransferCountFilter.module.scss";

interface Props {
  checked: boolean;
  filterOption: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => number | boolean | string[] | undefined;
  name: string;
}

const TransferCountFilterCheckbox: React.FC<Props> = ({
  checked,
  filterOption,
  onChange,
  name,
}) => {
  return (
    <FormControlLabel
      className={Style.checkboxLabel}
      control={<Checkbox checked={checked} onChange={onChange} name={name} />}
      label={getFilterLabel(filterOption)}
    />
  );
};

export default TransferCountFilterCheckbox;
