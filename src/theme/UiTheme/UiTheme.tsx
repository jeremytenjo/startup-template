import React from 'react'
import MuiCssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, type CreateThemeProps } from '@useweb/ui-theme'
import { UiLocalizationProvider } from '@useweb/ui/DatePicker'

import colors from '../tokens/colors.js'
import { variants as typography } from '../tokens/typography/typography.js'
import Button from '../../lib/components/useweb/Button/Button.defaults.js'
import IconButton from '../../lib/components/useweb/IconButton/IconButton.defaults.js'
import Dialog from '../../lib/components/useweb/Dialog/Dialog.defaults.js'
import Alert from '../../lib/components/useweb/Alert/Alert.defaults.js'
import Select from '../../lib/components/useweb/forms/fields/Select/Select.defaults.js'
import TextField from '../../lib/components/useweb/forms/fields/TextField/TextField.defaults.js'
import NumberField from '../../lib/components/useweb/forms/fields/NumberField/NumberField.defaults.js'
import DatePicker from '../../lib/components/useweb/forms/fields/DatePicker/DatePicker.defaults.js'
import Menu from '../../lib/components/useweb/Menu/Menu.defaults.js'
import Divider from '../../lib/components/useweb/Divider/Divider.defaults.js'
import Popover from '../../lib/components/useweb/Popover/Popover.defaults.js'
import ChipSelector from '../../lib/components/useweb/ChipSelector/ChipSelector.defaults.js'
import Switch from '../../lib/components/useweb/Switch/Switch.defaults.js'
import NavLink from '../../lib/components/useweb/NavLink/NavLink.defaults.js'
import Drawer from '../../lib/components/useweb/Drawer/Drawer.defaults.js'
import ActionBox from '../../lib/components/useweb/ActionBox/ActionBox.defaults.js'
import ActionBoxCtas from '../../lib/components/useweb/ActionBoxCtas/ActionBoxCtas.defaults.js'
import FormFieldHeader from '../../lib/components/useweb/FormFieldHeader/FormFieldHeader.defaults.js'
import FileInput from '../../lib/components/useweb/forms/fields/FileInput/FileInput.defaults.js'
import Radio from '../../lib/components/useweb/forms/fields/Radio/Radio.defaults.js'
import Popper from '../../lib/components/useweb/Popper/Popper.defaults.js'
import ConfirmationButton from '../../lib/components/useweb/ConfirmationButton/ConfirmationButton.defaults.js'
import SectionHeader from '../../lib/components/useweb/SectionHeader/SectionHeader.defaults.js'
import EmptyMessage from '../../lib/components/useweb/EmptyMessage/EmptyMessage.defaults.js'
import TableRow from '../../lib/components/useweb/TableRow/TableRow.defaults.js'
import InfiniteTable from '../../lib/components/useweb/InfiniteTable/InfiniteTable.defaults.js'
import Table from '../../lib/components/useweb/Table/Table.defaults.js'
import Skeleton from '../../lib/components/useweb/Skeleton/Skeleton.defaults.js'
import Rating from '../../lib/components/useweb/Rating/Rating.defaults.js'
import FormFieldError from '../../lib/components/useweb/FormFieldError/FormFieldError.defaults.js'
import Checkbox from '../../lib/components/useweb/Checkbox/Checkbox.defaults.js'
import Avatar from '../../lib/components/useweb/Avatar/Avatar.defaults.js'
import Stepper from '../../lib/components/useweb/Stepper/Stepper.defaults.js'
import RangeSlider from '../../lib/components/useweb/forms/fields/RangeSlider/RangeSlider.defaults.js'
import PhoneInput from '../../lib/components/useweb/forms/fields/PhoneInput/PhoneInput.defaults.js'
import VerificationCodeInput from '../../lib/components/useweb/VerificationCodeInput/VerificationCodeInput.defaults.js'
import SelectPill from '../../lib/components/useweb/forms/fields/SelectPill/SelectPill.defaults.js'
import Pill from '../../lib/components/useweb/Pill/Pill.defaults.js'
import Accordion from '../../lib/components/useweb/Accordion/Accordion.defaults.js'
import InfiniteList from '../../lib/components/useweb/InfiniteList/InfiniteList.defaults.js'
import Snackbar from '../../lib/components/useweb/Snackbar/Snackbar.defaults.js'

import CssBaseline from './CssBaseline/CssBaseline.defaults.js'

const themeData: CreateThemeProps = {
  palette: colors as any,
  typography,
  // https://mui.com/customization/theme-components/#global-style-overrides
  components: {
    CssBaseline,
    Button,
    Dialog,
    IconButton,
    Alert,
    Select,
    TextField,
    Menu,
    Divider,
    Popover,
    ChipSelector,
    Switch,
    DatePicker,
    NavLink,
    Drawer,
    ActionBox,
    ActionBoxCtas,
    FormFieldHeader,
    FileInput,
    Radio,
    Popper,
    ConfirmationButton,
    SectionHeader,
    EmptyMessage,
    TableRow,
    InfiniteTable,
    Table,
    Skeleton,
    Rating,
    FormFieldError,
    Checkbox,
    Avatar,
    Stepper,
    RangeSlider,
    PhoneInput,
    VerificationCodeInput,
    SelectPill,
    Pill,
    Accordion,
    InfiniteList,
    Snackbar,
    NumberField,
  },
}

export const theme = createTheme(themeData)

export default function UiTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <UiLocalizationProvider>
        <MuiCssBaseline />
        {children}
      </UiLocalizationProvider>
    </ThemeProvider>
  )
}
