import React from "react";
import { Card, FormControl, FormGroup } from "@mui/material";
import Style from "./TransferCountFilter.module.scss";
import { observer } from "mobx-react-lite";
import { Filter } from "store/store";
import {
  FILTER_TRANSFERS_ALL,
  FILTER_TRANSFERS_ALL_OPTIONS,
} from "models/filter";
import TransferCountFilterCheckbox from "./TransferCountFilterCheckbox";

const TransferCountFilter: React.FC = observer(() => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      if (event.target.name === FILTER_TRANSFERS_ALL) {
        return Filter.replace(FILTER_TRANSFERS_ALL_OPTIONS);
      }

      const allOption = 1;
      const currentOption = 1;

      const updatedOptionsCount = Filter.length + allOption + currentOption;

      const isAllOptionChecked =
        FILTER_TRANSFERS_ALL_OPTIONS.length === updatedOptionsCount;

      if (isAllOptionChecked) {
        return Filter.replace(FILTER_TRANSFERS_ALL_OPTIONS);
      }

      return Filter.push(event.target.name);
    }

    if (!checked) {
      if (event.target.name === FILTER_TRANSFERS_ALL) {
        return Filter.clear();
      }

      if (Filter.length === FILTER_TRANSFERS_ALL_OPTIONS.length) {
        Filter.remove(event.target.name);
        return Filter.remove(FILTER_TRANSFERS_ALL);
      }

      return Filter.remove(event.target.name);
    }
  };

  return (
    <div className={Style.wrap}>
      <Card>
        <FormControl
          sx={{ display: "flex", margin: "24px 0" }}
          component="fieldset"
          variant="standard"
        >
          <p className={Style.checkboxGroupHeader}>Количество пересадок</p>
          <FormGroup className={Style.checkboxGroup}>
            {FILTER_TRANSFERS_ALL_OPTIONS.map((filterOption) => (
              <TransferCountFilterCheckbox
                checked={Filter.includes(filterOption)}
                key={filterOption}
                filterOption={filterOption}
                onChange={handleChange}
                name={filterOption}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Card>
    </div>
  );
});

export default TransferCountFilter;
