import React from "react";

import Checkbox from "formsy-material-ui/lib/FormsyCheckbox";
import Date from "formsy-material-ui/lib/FormsyDate";
import Radio from "formsy-material-ui/lib/FormsyRadio";
import RadioGroup from "formsy-material-ui/lib/FormsyRadioGroup";
import Select from "formsy-material-ui/lib/FormsySelect";
import Text from "formsy-material-ui/lib/FormsyText";
import Time from "formsy-material-ui/lib/FormsyTime";
import Toggle from "formsy-material-ui/lib/FormsyToggle";


import ItemTypes from "web/ui/item-types";

Text.osDesigner = {
  itemType: ItemTypes.CONTROL,
  form: () => {
    return (<div>
      <Text name="name" required fullWidth floatingLabelText="Name" />
      <Toggle name="fullWidth" label="Full Width?" />
      <Text name="className" required fullWidth floatingLabelText="Class" />
    </div>);
  }
};

// Form.displayName = "Form";
export default {
  controls: {
    Checkbox,
    Date,
    Radio,
    RadioGroup,
    Select,
    Text,
    Time,
    Toggle,
  },
  name: "Formsy - Material Ui",
};

