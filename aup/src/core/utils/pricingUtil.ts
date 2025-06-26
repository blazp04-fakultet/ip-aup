export function calculatePrice(tokenCount: number, modelName: string) {
  return Math.round((tokenCount * 0.001 + Number.EPSILON) * 100) / 100;
}
