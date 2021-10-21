import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { observer } from "mobx-react-lite";
import { Sorts } from "store/store";
import {
  SORTING_TICKETS_BY_CHEAPEST,
  SORTING_TICKETS_BY_FASTEST,
  SORTING_TICKETS_OPTIMAL,
} from "models/filter";

const TicketsSort = observer(() => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement, MouseEvent>,
    newAlignment: string
  ) => {
    if (newAlignment) Sorts.set(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={Sorts.get()}
      sx={{
        maxHeight: "48px",
        bgcolor: "#fff",
        color: "#4A4A4A",
        "& .Mui-selected": {
          bgcolor: "#2196F3 !important",
          color: "#fff !important",
        },
      }}
      exclusive
      onChange={handleChange}
      fullWidth
    >
      <ToggleButton
        sx={{ fontWeight: "600" }}
        value={SORTING_TICKETS_BY_CHEAPEST}
      >
        САМЫЙ ДЕШЕВЫЙ
      </ToggleButton>
      <ToggleButton
        sx={{ fontWeight: "600" }}
        value={SORTING_TICKETS_BY_FASTEST}
      >
        САМЫЙ БЫСТРЫЙ
      </ToggleButton>
      <ToggleButton sx={{ fontWeight: "600" }} value={SORTING_TICKETS_OPTIMAL}>
        ОПТИМАЛЬНЫЙ
      </ToggleButton>
    </ToggleButtonGroup>
  );
});

export default TicketsSort;
