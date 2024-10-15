

export const getCloudinaryUrl = (
  url: string,
  params: { [key: string]: string | number }
): string => {
  const [baseUrl, resourcePath] = url.split('/upload/');

  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  return `${baseUrl}/upload/${paramString}/${resourcePath}`;
}
