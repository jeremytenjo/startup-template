type FirebaseFunctionsConfigProps = {
  cli: {
    ignoreList: string[]
  }
}

const firebaseFunctionsConfig: FirebaseFunctionsConfigProps = {
  cli: {
    // function names not to be deployed
    ignoreList: [],
  },
}

export default firebaseFunctionsConfig
