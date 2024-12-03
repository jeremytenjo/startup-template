const firebaseFunctionsConfig = {
  cli: {
    // function names not to be deployed
    ignoreList: [
      'updateCreatorPlatformStats',
      'updateSocialSeedRobloxApi',
      'cleanSocialSeedRobloxApi',
      'checkJobsPendingApproval',
    ],
  },
}

export default firebaseFunctionsConfig
