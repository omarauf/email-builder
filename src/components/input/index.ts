import { XSwitch } from './other/switch';
import { XSlider } from './other/slider';
import { XRadioGroup } from './other/radio-group';
import { XCheckboxGroup } from './other/checkbox-group';
import { XCheckbox } from './other/checkbox';

import { XCode } from './text/code';
import { XNumber } from './text/number';
import { XNumber2 } from './text/number-2';
import { XTextField } from './text/text-field';

import { XSelect } from './select/select';
import { XMultiSelect } from './select/multi-select';

import { XDatePicker } from './date/date-picker';
import { XTimePicker } from './date/time-picker';
import { XDateTimePicker } from './date/date-time-picker';

export { useDataForm } from './use-data-form';

export const XField = {
  Number: XNumber,
  Number2: XNumber2,
  Switch: XSwitch,
  Select: XSelect,
  Slider: XSlider,
  Text: XTextField,
  RadioGroup: XRadioGroup,
  DatePicker: XDatePicker,
  TimePicker: XTimePicker,
  MultiSelect: XMultiSelect,
  CheckboxGroup: XCheckboxGroup,
  Checkbox: XCheckbox,
  DateTimePicker: XDateTimePicker,
  Code: XCode,
};
