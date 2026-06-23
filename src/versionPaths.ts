export const getSafeVersionName = (version: string): string => {
  const safe = version.replace(/[^a-zA-Z0-9._-]/g, '_')
  return safe || 'version'
}
