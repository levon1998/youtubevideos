/**
 *
 * @param data is the list of parameters for api call
 * @param apiType is the last segment in baseUrl
 * @returns {string}
 */
export function generateApiUrl (data, apiType) {
    let baseUrl = `/youtube/v3/${apiType}`;
    Object.keys(data).map((key, item) => {
        baseUrl += (item === 0) ? `?${key}=${data[key]}` : `&${key}=${data[key]}`;
    });
    return `${baseUrl}&fields=items(id,snippet(channelId,title,channelTitle,thumbnails)${(apiType === 'videos') ? ',statistics' : ''})`;
}