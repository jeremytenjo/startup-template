const colors = {
  primary: {
    main: '#5E00AA',
    light: '#A53CEB',
    dark: '#34005E',
    background: '#173230',
  },
  gradient: {
    purple: 'linear-gradient(83.6deg, #5D59FF 8.71%, #9076FF 98.37%)',
    green: 'linear-gradient(90deg, #02B74A 13.2%, #00AA6D 100%)',
    blue: 'linear-gradient(270deg, #2ACCFF 0%, #007ABF 32.51%)',
    aquaGreen: 'linear-gradient(83.6deg, #00FF85 8.71%, #00BEBE  98.37%)',
    red: 'linear-gradient(83.6deg, #ff0000 8.71%, #ff8f8f  98.37%)',
  },
  neutral: {
    '100': '#FFFFFF',
    '150': '#efefef',
    '200': '#bcbcbc',
    '250': '#5e636b',
    '300': '#292C33',
    '350': '#191b20',
    '400': '#1B1D22',
    '450': '#16181D',
    '500': '#101218',
    '600': '#090A0B',
  },
  semantic: {
    success: {
      100: '#00ce53',
    },
    error: {
      100: '#d93025',
      200: '#ff9494',
    },
    warning: {
      100: '#FFBD59',
      dark: '#843700',
    },
  },
  themeColor: '',
  backgroundColor: '',
}

colors.themeColor = colors.neutral[100]
colors.backgroundColor = colors.neutral[500]

export default colors
