const isValidEthAddress = (address: string): boolean =>
  Boolean(address && address.startsWith("0x"))

const extractValidCreatorAddresses = <T extends { creator: string }>(
  items: T[]
): string[] => [
  ...new Set(
    items.map((item) => item.creator.toLowerCase()).filter(isValidEthAddress)
  ),
]

export { extractValidCreatorAddresses, isValidEthAddress }
