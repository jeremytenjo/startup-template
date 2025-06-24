import React from 'react'
import MuiCssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, type CreateThemeProps } from '@useweb/ui-theme'
import { UiLocalizationProvider } from '@useweb/ui/DatePicker'

import colors from '../tokens/colors.js'
import { variants as typography } from '../tokens/typography/typography.js'
import Button from '../../components/Button/Button.defaults.js'
import IconButton from '../../components/IconButton/IconButton.defaults.js'
import Dialog from '../../components/Dialog/Dialog.defaults.js'
import Alert from '../../components/Alert/Alert.defaults.js'
import Select from '../../components/forms/fields/Select/Select.defaults.js'
import TextField from '../../components/forms/fields/TextField/TextField.defaults.js'
import NumberField from '../../components/forms/fields/NumberField/NumberField.defaults.js'
import DatePicker from '../../components/forms/fields/DatePicker/DatePicker.defaults.js'
import Menu from '../../components/Menu/Menu.defaults.js'
import Divider from '../../components/Divider/Divider.defaults.js'
import Popover from '../../components/Popover/Popover.defaults.js'
import ChipSelector from '../../components/ChipSelector/ChipSelector.defaults.js'
import Switch from '../../components/Switch/Switch.defaults.js'
import NavLink from '../../components/NavLink/NavLink.defaults.js'
import Drawer from '../../components/Drawer/Drawer.defaults.js'
import ActionBox from '../../components/ActionBox/ActionBox.defaults.js'
import ActionBoxCtas from '../../components/ActionBoxCtas/ActionBoxCtas.defaults.js'
import FormFieldHeader from '../../components/FormFieldHeader/FormFieldHeader.defaults.js'
import FileInput from '../../components/forms/fields/FileInput/FileInput.defaults.js'
import Radio from '../../components/forms/fields/Radio/Radio.defaults.js'
import Popper from '../../components/Popper/Popper.defaults.js'
import ConfirmationButton from '../../components/ConfirmationButton/ConfirmationButton.defaults.js'
import SectionHeader from '../../components/SectionHeader/SectionHeader.defaults.js'
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage.defaults.js'
import TableRow from '../../components/TableRow/TableRow.defaults.js'
import InfiniteTable from '../../components/InfiniteTable/InfiniteTable.defaults.js'
import Table from '../../components/Table/Table.defaults.js'
import Skeleton from '../../components/Skeleton/Skeleton.defaults.js'
import Rating from '../../components/Rating/Rating.defaults.js'
import FormFieldError from '../../components/FormFieldError/FormFieldError.defaults.js'
import Checkbox from '../../components/Checkbox/Checkbox.defaults.js'
import Avatar from '../../components/Avatar/Avatar.defaults.js'
import Stepper from '../../components/Stepper/Stepper.defaults.js'
import RangeSlider from '../../components/forms/fields/RangeSlider/RangeSlider.defaults.js'
import PhoneInput from '../../components/forms/fields/PhoneInput/PhoneInput.defaults.js'
import VerificationCodeInput from '../../components/VerificationCodeInput/VerificationCodeInput.defaults.js'
import SelectPill from '../../components/forms/fields/SelectPill/SelectPill.defaults.js'
import Pill from '../../components/Pill/Pill.defaults.js'
import Accordion from '../../components/Accordion/Accordion.defaults.js'
import InfiniteList from '../../components/InfiniteList/InfiniteList.defaults.js'
import Snackbar from '../../components/Snackbar/Snackbar.defaults.js'
import LinkTab from '../../components/LinkTab/LinkTab.defaults.js'
import LinkTabs from '../../components/LinkTabs/LinkTabs.defaults.js'
import RouterLinkedSelect from '../../components/RouterLinkedSelect/RouterLinkedSelect.defaults.js'

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
    LinkTab,
    LinkTabs,
    RouterLinkedSelect,
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
