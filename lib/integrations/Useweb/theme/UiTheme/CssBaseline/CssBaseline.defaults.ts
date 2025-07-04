import { type CssBaselineProps } from '@mui/material'
import { type ComponentDefaultsProps } from '@useweb/ui-theme'

import { interFont } from '../../fonts/fonts.js'
import colors from '../../tokens/colors.js'
import { datePickerCss } from '../../../components/forms/fields/DatePicker/DatePicker.css.js'
import { rootLayoutConfig } from '../../../../../layouts/RootLayout/rootLayout.config.js'

const defaults: ComponentDefaultsProps<CssBaselineProps> = {
  styleOverrides: `
  * {
    box-sizing: border-box;
  }

  html {
    font-family: ${interFont.style.fontFamily};
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    margin: 0;
    background-color: ${colors.backgroundColor};
    scrollbar-width: thin;
    color: ${colors.neutral[100]};
  }

  *::-webkit-scrollbar {
    width: 3px;
    background-color: ${colors.backgroundColor};

  }

  *::-webkit-scrollbar-thumb {
    background-color: ${colors.neutral[250]};
    border-radius: 10px;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    list-style: none;
  }

  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0px;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration { display: none; }

  .firebase-emulator-warning {
    display: none;
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  input {
    border: none;
  }

  textarea {
    font-family: ${interFont.style.fontFamily};
    resize: vertical;
  }

  textarea:focus, input:focus{
    outline: none;
  }

  .text-placeholder {
    color: #777777;
  }

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #777777;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #777777;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #777777;
}

// Select options height, prevents from coverting page
.MuiPopover-root .MuiPaper-root  {
  max-height: 300px !important;
  transform: translateY(10px) !important;
}

// import Skeleton from '@useweb/ui/Skeleton'
@keyframes react-loading-skeleton {
  100% {
      transform: translateX(100%);
  }
}
.react-loading-skeleton {
  --base-color: #ebebeb;
  --highlight-color: #f5f5f5;
  --animation-duration: 1.5s;
  --animation-direction: normal;
  --pseudo-element-display: block; /* Enable animation */

  background-color: var(--base-color);

  width: 100%;
  border-radius: 0.25rem;
  display: inline-flex;
  line-height: 1;

  position: relative;
  overflow: hidden;
  z-index: 1; /* Necessary for overflow: hidden to work correctly in Safari */
}

.react-loading-skeleton::after {
  content: ' ';
  display: var(--pseudo-element-display);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      90deg,
      var(--base-color),
      var(--highlight-color),
      var(--base-color)
  );
  transform: translateX(-100%);

  animation-name: react-loading-skeleton;
  animation-direction: var(--animation-direction);
  animation-duration: var(--animation-duration);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

  // Helpers
  .absoluteCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .blurBackground {
    backdrop-filter: blur(8px);
  }
  .mainBackground {
    border-radius: 3px;
    background-color: ${colors.neutral[500]};
    border: 1px solid ${colors.neutral[300]};
  }
  .iconBackground {
    cursor: pointer;
    background-color: ${colors.neutral[300]};
    border-radius: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // componets 
  ${datePickerCss}

  // MuiPaper
  .MuiPaper-root {
    border: 1px solid ${colors.neutral[300]} !important;
  }

  div[data-id="ValuePreview"], input[data-id="ValuePreview"] {
    background-color: ${colors.neutral[300]};
    border: 1px solid ${colors.neutral[300]};
    color: ${colors.neutral[100]};
    border-radius: 14px;
  },

  ol[data-sonner-toaster="true"] {
    top: calc(${rootLayoutConfig.mobileHeaderHeight} + 15px) !important;
    height: fit-content !important;
  }

  @media screen and (min-width: 900px) {
    ol[data-sonner-toaster="true"] {
      top: calc(${rootLayoutConfig.desktopHeaderHeight} + 15px) !important;
    }
  }
`,
}

export default defaults
