import shell from '../../../../../../../devtools/utils/node/shell.js'
import jobstubs from '../../../../../../../src/data/jobs/jobs.stubs.js'
import type JobSchema from '../../../../../../../src/data/jobs/job.schema.js'

const job = jobstubs.find((j) => j.accepted?.date) as JobSchema

// RUN stripe listen --forward-to http://localhost:5002/social-seed-main/us-central1/stripeWebhooksReceiver in other terminal to listen to webhook events

export default async function triggerJobPaymentIntentSuccess() {
  shell(
    `stripe trigger payment_intent.succeeded --add payment_intent:metadata.jobId=${job.id}`,
  )
}
