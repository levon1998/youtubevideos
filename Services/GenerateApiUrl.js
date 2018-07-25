export function generateApiUrl (data) {
    let baseUrl = '/youtube/v3/videos';
    Object.keys(data).map((key, item) => {
        baseUrl += (item === 0) ? `?${key}=${data[key]}` : `&${key}=${data[key]}`;
    });
    return `${baseUrl}&fields=items(id,snippet(channelId,title,channelTitle,thumbnails),statistics)`;
}