const normalizeLocationId = (locationId: string): string =>
  locationId.includes("|") ? locationId.replace("|", ",") : locationId

export { normalizeLocationId }
