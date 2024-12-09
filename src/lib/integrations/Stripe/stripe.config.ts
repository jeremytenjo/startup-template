import firebaseJson from '../../../../firebase.json' assert { type: 'json' }
import firebaseConfig from '../Google/Firebase/firebase.config.js'

export const stripeConfig = {
  webhooks: {
    listener: {
      forwardUrl: `http://localhost:${firebaseJson.emulators.functions.port}/${firebaseConfig.projectId}/us-central1/stripeWebhooksReceiver`,
    },
  },
}
