/**
 * 通过在原始URL中插入裁剪路径段来生成裁剪后的图片URL。
 *
 * 该函数会查找提供的URL中的'media/'片段，并在其后插入'crop/600/400/'，
 * 从而生成一个指向尺寸为600x400裁剪图片的URL。
 *
 * @param url - 包含'media/'片段的原始图片URL。
 * @returns 插入裁剪路径后，指向600x400裁剪图片的URL。
 */
const getCroppenedImageUrl = (url: string) => {
    const target = 'media/';
    const index = url.indexOf(target) + target.length;
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
}

export default getCroppenedImageUrl;