const normalizeLocationId = (locationId: string): string =>
  locationId.includes("|") ? locationId.replace("|", ",") : locationId

const isValidPosition = (locationId: string): boolean =>
  /^-?\d{1,3},-?\d{1,3}$/.test(locationId)

export { isValidPosition, normalizeLocationId }
