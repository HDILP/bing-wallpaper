import requests
import os

def download_bing_wallpaper():
    # Bing API 地址
    url = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN"
    response = requests.get(url).json()
    
    # 获取图片相对路径并拼接完整 URL
    img_url = "https://www.bing.com" + response['images'][0]['url']
    
    # 下载图片
    img_data = requests.get(img_url).content
    with open("bing.jpg", "wb") as f:
        f.write(img_data)
    print("今日壁纸已更新！")

if __name__ == "__main__":
    download_bing_wallpaper()
