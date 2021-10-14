import React from "react";
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import Style from "./TransferCountFilter.module.scss";
import { observer } from "mobx-react-lite";
import { Filter } from "store/store";
import {
  FILTER_TRANSFERS_ALL,
  FILTER_TRANSFERS_NONE,
  FILTER_TRANSFERS_ONE,
  FILTER_TRANSFERS_THREE,
  FILTER_TRANSFERS_TWO,
} from "models/filter";

const TransferCountFilter: React.FC = observer(() => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      return Filter.push(event.target.name);
    }

    return Filter.remove(event.target.name);
  };

  return (
    <div className={Style.wrap}>
      <Card>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Количество пересадок</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Filter.includes(FILTER_TRANSFERS_ALL)}
                  onChange={handleChange}
                  name={FILTER_TRANSFERS_ALL}
                />
              }
              label="Все"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Filter.includes(FILTER_TRANSFERS_NONE)}
                  onChange={handleChange}
                  name={FILTER_TRANSFERS_NONE}
                />
              }
              label="Без пересадок"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Filter.includes(FILTER_TRANSFERS_ONE)}
                  onChange={handleChange}
                  name={FILTER_TRANSFERS_ONE}
                />
              }
              label="1 пересадка"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Filter.includes(FILTER_TRANSFERS_TWO)}
                  onChange={handleChange}
                  name={FILTER_TRANSFERS_TWO}
                />
              }
              label="2 пересадки"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Filter.includes(FILTER_TRANSFERS_THREE)}
                  onChange={handleChange}
                  name={FILTER_TRANSFERS_THREE}
                />
              }
              label="3 пересадки"
            />
          </FormGroup>
        </FormControl>
      </Card>
    </div>
  );
});

export default TransferCountFilter;
