import date, { getToday } from '@useweb/date'

import type MessageSchema from './message.schema.js'

const commonProps = {
  conversationId: 'direct-conversation-1',
}

// seenBy is the same as senderUid or both have seen it
const developerProps = {
  senderUid: 'developer1',
  seenBy: 'developer1',
}
const creatorProps = {
  senderUid: 'user1',
  seenBy: 'user1',
}

// every job has a created offer system message
const systemMessageCommonProps = {
  sentDate: Date.parse(date('2023-01-01').toISOString()),
  body: `developer1 created an offer`,
  isSystemMessage: true,
  senderUid: 'developer1',
}

// force id in stub messages in order to test sent messages, messages with no ids are not in firestore, they are added by updateMessagesList
type ForcedIdMessageSchema = MessageSchema & {
  id: string
}

const MessagesStubs: ForcedIdMessageSchema[] = [
  // direct-conversation-3
  {
    id: Math.random().toString(),
    conversationId: 'direct-conversation-3',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
  },
  {
    conversationId: 'direct-conversation-3',
    senderUid: 'developer1',
    seenBy: 'developer1',
    id: Math.random().toString(),
    sentDate: Date.parse(date('2023-01-01').toISOString()),
    body: `Hello! I hope this message finds you well. I am reaching out from XYZ Company, and I came across your YouTube channel and was impressed by your content. We would love to work with you on a sponsored video. Can you please share your rates for a sponsored video?`,
  },

  // direct-conversation-1
  {
    ...commonProps,
    ...developerProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-01-01').toISOString()),
    body: `Hello! I hope this message finds you well. I am reaching out from XYZ Company, and I came across your YouTube channel and was impressed by your content. We would love to work with you on a sponsored video. Can you please share your rates for a sponsored video?`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-02-01').toISOString()),
    body: ` Hi there! Thank you for considering me for a sponsored video opportunity. Yes, of course! I'd be happy to share my rates with you. Can you give me a little more information about the project? What type of video are you looking to create and what are the goals for the collaboration?.`,
  },
  {
    ...commonProps,
    ...developerProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-03-01').toISOString()),
    body: 'Sure! We are looking to create a product review video for our latest product launch. We want to showcase its features and benefits to your audience in an engaging and informative way. Our goal is to drive sales and increase developer awareness.',
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-04-01').toISOString()),
    body: 'Okay, got it. Based on the type of video and your goals, my rate for a sponsored product review video would be $X. This rate includes pre-production planning, filming, editing, and promoting the video on my channel and social media platforms.',
  },
  {
    ...commonProps,
    ...developerProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-05-01').toISOString()),
    body: 'That sounds great! Can you also let me know if there are any other add-ons or extras that we can include in the package?',
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-06-01').toISOString()),
    body: 'Yes, definitely! We can add things like a custom intro/outro, additional promotional posts on my social media platforms, a giveaway for my audience, or any other requests you may have. These services can be added to the package for an additional fee.',
  },
  {
    ...commonProps,
    ...developerProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-07-01').toISOString()),
    body: 'Perfect thank you! Can you please send me a detailed proposal with all the services included and their respective prices? I would like to go over it and get back to you as soon as possible.',
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-08-01').toISOString()),
    body: `Absolutely! I'll put together a proposal for you and send it over within the next 24 hours. Let me know if there's anything else I can help with in the meantime.`,
  },
  {
    ...commonProps,
    ...developerProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-09-01').toISOString()),
    body: 'Great, thank you! I look forward to hearing back from you soon. Have a great day!',
    attachments: [
      { downloadUrl: 'https://i.pravatar.cc/206', type: 'image/', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/200', type: '.pdf', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/201', type: 'image/', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/202', type: 'image/', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/203', type: '.mp4', name: 'file' },
      { downloadUrl: 'https://i.pravatar.cc/204', type: 'image/', name: 'hello' },
    ],
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2013-10-01').toISOString()),
    body: `You too! I'm looking forward to working with you.`,
    attachments: [
      { downloadUrl: 'https://i.pravatar.cc/206', type: 'image/', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/200', type: '.pdf', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/201', type: 'image/', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/202', type: 'image/', name: 'hello' },
      { downloadUrl: 'https://i.pravatar.cc/203', type: '.mp4', name: 'file' },
      { downloadUrl: 'https://i.pravatar.cc/204', type: 'image/', name: 'hello' },
    ],
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `1`,
  },
  // 26
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `more`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    body: `more`,
  },
  {
    ...commonProps,
    ...creatorProps,
    id: Math.random().toString(),
    sentDate: Date.parse(date('2010-08-01').toISOString()),
    body: `LAST MESSAGE`,
  },

  // job conversations

  // creator and developer negotiating
  {
    id: Math.random().toString(),
    conversationId: 'pending-creator-approval-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'pending-creator-approval-job-1',
    seenBy: 'user1developer1',
    ...systemMessageCommonProps,
    body: 'Hi, I am willing to pay $500',
  },
  {
    id: Math.random().toString(),
    conversationId: 'pending-creator-approval-job-2',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'pending-creator-approval-job-2',
    body: 'Hi, I am interested in this job',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'developer1',
  },

  // Job in progress
  {
    id: Math.random().toString(),
    conversationId: 'inProgress-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'inProgress-job-1',
    body: 'I accept your offer',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'user1',
  },
  {
    id: Math.random().toString(),
    conversationId: 'inProgress-job-1',
    body: 'System message: Job in progress',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    isSystemMessage: true,
    senderUid: 'user1',
  },
  {
    id: Math.random().toString(),
    conversationId: 'inProgress-job-1',
    body: 'Thank you so much for accepting our offer to collaborate with our developer. We are thrilled to have the opportunity to work with such a talented creator like yourself.',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'developer1',
  },

  // Job Paid
  {
    id: Math.random().toString(),
    conversationId: 'paid-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'paid-job-1',
    body: 'Thank you for you payment. I look forward to working with you again!',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'user1',
  },

  // Job Delivered =
  {
    id: Math.random().toString(),
    conversationId: 'delivered-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },

  // offer conversations

  // negotiating offer
  {
    id: Math.random().toString(),
    conversationId: 'offer-negotiating-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'offer-negotiating-job-1',
    body: 'I can offer $1000',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'developer1',
  },
  // system message
  {
    id: Math.random().toString(),
    conversationId: 'offer-negotiating-job-1',
    body: 'developer1 updated offer',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'developer1',
    senderUid: 'developer1',
    isSystemMessage: true,
  },
  // accepted offer
  {
    id: Math.random().toString(),
    conversationId: 'offer-accepted-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'offer-accepted-job-1',
    body: 'I can offer $2000',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'developer1',
  },
  // declined offer
  {
    id: Math.random().toString(),
    conversationId: 'offer-declined-job-1',
    seenBy: 'developer1',
    ...systemMessageCommonProps,
    body: `developer1 created an offer`,
  },
  {
    id: Math.random().toString(),
    conversationId: 'offer-declined-job-1',
    body: 'I can offer $3000',
    sentDate: Date.parse(date('2011-08-01').toISOString()),
    seenBy: 'user1developer1',
    senderUid: 'developer1',
  },

  // Game Zone Ad

  // Pending Offer Response
  {
    id: 'game-zone-ad-1-pending-offer-response',
    body: `developer2 is offering you $400 to advertise in your game.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer1',
    senderUid: 'developer1',
    sentDate: getToday(),
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdOfferResponseForm: {
          gameZoneAdId: 'pending-offer-response',
        },
      },
    },
  },

  // Declined
  {
    id: 'game-zone-ad-1-declined',
    body: `developer1 declined offer.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer1',
    senderUid: 'developer1',
    sentDate: getToday(),
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdOfferResponseForm: {
          gameZoneAdId: 'declined',
        },
      },
    },
  },

  // Cancelled
  {
    id: 'game-zone-ad-1-cancelled',
    body: `developer1 cancelled.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer1',
    senderUid: 'developer1',
    sentDate: getToday(),
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdOfferResponseForm: {
          gameZoneAdId: 'cancelled',
        },
      },
    },
  },

  // Pending Payment
  {
    id: 'game-zone-ad-1-pending-payment',
    body: `developer1 accepted offer to advertise.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer1',
    senderUid: 'developer1',
    sentDate: getToday(),
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdPendingPaymentCard: {
          gameZoneAdId: 'pending-payment',
        },
      },
    },
  },

  // Pending Setup
  {
    id: 'game-zone-ad-1-pending-setup',
    body: `developer2 paid for the game zone ad.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer1',
    senderUid: 'developer1',
    sentDate: getToday(),
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdPendingSetup: {
          gameZoneAdId: 'pending-setup',
        },
      },
    },
  },

  // Pending Setup Approval
  {
    id: 'game-zone-ad-1-pending-setup-approval',
    body: `developer1 submitted setup for Review`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer1',
    senderUid: 'developer1',
    sentDate: getToday() + 1,
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdPendingSetupApproval: {
          gameZoneAdId: 'pending-setup-approval',
        },
      },
    },
  },

  // Live
  {
    id: 'game-zone-ad-1-live',
    body: `developer2 approved ad setup. The ad is now live.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer2',
    senderUid: 'developer1',
    sentDate: getToday() + 1,
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdIsLiveCard: {
          gameZoneAdId: 'live',
        },
      },
    },
  },

  // Paused
  {
    id: 'game-zone-ad-1-paused',
    body: `developer2 paused ad.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer2',
    senderUid: 'developer1',
    sentDate: getToday() + 1,
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdIsPausedCard: {
          gameZoneAdId: 'paused',
        },
      },
    },
  },

  // Completed
  {
    id: 'game-zone-ad-1-completed',
    body: `Campaign completed.`,
    conversationId: 'game-zone-ad-1',
    seenBy: 'developer2',
    senderUid: 'developer1',
    sentDate: getToday() + 1,
    isSystemMessage: true,
    systemMessageProps: {
      showToSenderImmediately: true,
      hideCtas: true,
      components: {
        gameZoneAdIsPausedCard: {
          gameZoneAdId: 'completed',
        },
      },
    },
  },
]

export default MessagesStubs
