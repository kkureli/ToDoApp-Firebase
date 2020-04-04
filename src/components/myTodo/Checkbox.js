import React from "react";
import { Checkbox } from "@material-ui/core";

export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        checked={props.checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
}
