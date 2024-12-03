export type GetYoutubeChannelAnalyticsProps = {
  accessToken: string
  startDate: string
  endDate: string
  metrics: string
  params?: {
    currency?: string
    dimensions?: string
    filters?: string
    includeHistoricalChannelData?: string
    maxResults?: string
    sort?: string
    startIndex?: string
  }
}

/**
 * [Params](https://developers.google.com/youtube/analytics/reference/reports/query)
 *
 * [Metrics](https://developers.google.com/youtube/reporting#metrics)
 */
export default async function getYoutubeChannelAnalytics(
  props: GetYoutubeChannelAnalyticsProps,
) {
  const headersList = {
    Accept: '*/*',
    Authorization: `Bearer ${props.accessToken}`,
  }

  const searchParams = new window.URLSearchParams({
    startDate: props.startDate,
    endDate: props.endDate,
    metrics: props.metrics,
  }).toString()

  // https://developers.google.com/youtube/analytics/reference/reports/query
  const response = await fetch(
    `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&${searchParams}`,
    {
      method: 'GET',
      headers: headersList,
    },
  )

  const data = await response.json()

  return { data }
}

export type GetYoutubeChannelAnalyticsReturn = ReturnType<
  typeof getYoutubeChannelAnalytics
>
