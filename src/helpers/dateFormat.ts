const DEFAULT_LOCALE = 'en-US'

const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

const getUserLocale = () => {
  return navigator.language || DEFAULT_LOCALE
}

export const formatDateTime = (isoDateTime: string) => {
  const locale = getUserLocale()
  const date = new Date(isoDateTime)
  const formattedDate = date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: getUserTimezone(),
    timeZoneName: 'short',
  })

  return `${formattedDate} at ${formattedTime}`
}
