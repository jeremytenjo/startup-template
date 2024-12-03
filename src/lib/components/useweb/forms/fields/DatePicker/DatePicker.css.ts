import colors from '../../../../../../theme/tokens/colors.js'

// Needed in global scope to override DatePicker's modal styles
export const datePickerCss = `
.MuiPickersDay-root.Mui-selected {
  color: ${colors.neutral['100']} !important;
}

[data-id="DatePickerInputWrapper"] input.MuiInputBase-input[name="TextField"] {
  border-radius: 14px;
  height: 42px;
  padding: 0 8px;
  font-size: 14px;
}

.MuiPickersYear-yearButton.Mui-selected {
  color: ${colors.neutral['100']} !important;
  background-color: ${colors.neutral[600]} !important;
}

[class*="MuiDatePickerToolbar-title"] {
  color: ${colors.neutral['100']};
}

[class*="MuiPickersToolbar-root"] span {
  color: ${colors.neutral['100']};
}

[class*="MuiPickersCalendarHeader-label"] {
  color: ${colors.neutral['100']};
}

[class*="MuiPickersCalendarHeader-labelContainer"] svg path {
  color: ${colors.neutral['100']};
}

[class*="MuiPickersYear-root"] {
  color: ${colors.neutral['100']};
}

[class*="MuiPickersYear-yearButton"].Mui-disabled {
  color: ${colors.neutral['250']} !important;
}

[class*="MuiPickersYear-yearButton"].Mui-selected {
  color: ${colors.neutral['100']} !important;
  background-color: ${colors.primary['main']} !important;
  border: 2px solid ${colors.primary['light']} !important;
}

.MuiPickersArrowSwitcher-root svg path {
  color: ${colors.neutral['100']};
}

.MuiDateCalendar-root span {
  color: ${colors.neutral['100']};
}

.MuiPickersDay-root {
    color: ${colors.neutral['100']} !important;
}

.MuiPickersDay-root.Mui-disabled {
    color: ${colors.neutral['200']} !important;
}

.MuiPickersDay-root.Mui-selected {
    color: ${colors.neutral['100']} !important;
    background-color: ${colors.primary['main']} !important;
    border: 2px solid ${colors.primary['light']} !important;
}

.MuiPickersDay-root.Mui-selected:hover {
    background-color: ${colors.primary['main']} !important;
}

.MuiPickersDay-today {
    border: 2px solid ${colors.primary['light']} !important;
}

[data-id="DatePickerCancelButton"] {
    color: ${colors.neutral['100']} !important;
    background-color: ${colors.neutral['400']} !important;
    border: 1px solid ${colors.neutral['300']} !important;
}

[data-id="DatePickerOkButton"] {
    color: ${colors.neutral['100']} !important;
    background-color: ${colors.primary['main']} !important;
    border: 1px solid ${colors.primary['light']} !important;
}

`
