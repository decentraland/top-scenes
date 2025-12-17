/* eslint-disable no-undef */
// Stub for ua-parser-js/helpers to avoid ESM parsing error
const isAppleSilicon = () => {
  if (typeof window === "undefined" || typeof window.navigator === "undefined")
    return false
  const ua = window.navigator.userAgent || ""
  return /Mac/.test(ua) && /Apple/.test(window.navigator.vendor || "")
}

const getDeviceVendor = () => {
  return "Unknown"
}

export { getDeviceVendor, isAppleSilicon }
