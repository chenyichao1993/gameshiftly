import os
import urllib.request

os.makedirs('img', exist_ok=True)

logos = [
    ('2048.png', 'https://bkimg.cdn.bcebos.com/pic/63d9f2d3572c11dfc6632505692762d0f703c262'),
    ('snake.jpg', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Flpic%2Fs29294495.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1751948692&t=455c92c9a7a892a0a42605194142c9a9'),
    ('tetris.jpg', 'https://img2.baidu.com/it/u=2433796524,3705169855&fm=253&fmt=auto&app=138&f=JPEG?w=344&h=212'),
    ('minesweeper.jpg', 'https://img1.baidu.com/it/u=3133159963,3192606409&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'),
]

for filename, url in logos:
    path = os.path.join('img', filename)
    print(f'Downloading {filename}...')
    try:
        urllib.request.urlretrieve(url, path)
        print(f'Success: {filename}')
    except Exception as e:
        print(f'Failed to download {filename}: {e}') 