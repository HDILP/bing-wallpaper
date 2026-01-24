export default async function handler(req, res) {
  try {
    // 1. 获取 Bing 壁纸数据
    const response = await fetch(
      'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
    );
    const data = await response.json();
    
    // 2. 提取图片信息
    const image = data.images[0];
    const baseUrl = 'https://www.bing.com';
    
    // 3. 获取 1k 分辨率图片 (1920x1080)
    // 修改 URL 获取 1920x1080 分辨率
    let imageUrl = image.url;
    imageUrl = imageUrl.replace('&rf=LaDigue_1920x1080.jpg&pid=hp', '');
    
    // 构造 1k 图片 URL
    const image1kUrl = `${baseUrl}${imageUrl}_1920x1080.jpg`;
    
    // 4. 重定向到图片（直接返回图片）
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 缓存24小时
    res.redirect(302, image1kUrl);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch Bing wallpaper' });
  }
}