import os
import urllib.request
import zipfile

games = [
    ("snake", "https://github.com/CodeExplainedRepo/Snake-JavaScript/archive/refs/heads/master.zip"),
    ("tetris", "https://github.com/jonhoo/tetris/archive/refs/heads/master.zip"),
    ("minesweeper", "https://github.com/robinsonkwame/minesweeper/archive/refs/heads/master.zip"),
    ("flappybird", "https://github.com/nebez/floppybird/archive/refs/heads/master.zip"),
]

for folder, url in games:
    zip_path = f"{folder}.zip"
    print(f"Downloading {folder}...")
    try:
        urllib.request.urlretrieve(url, zip_path)
        print(f"Downloaded {zip_path}")
        # 解压到对应文件夹
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # 获取zip包内的根目录名
            root_dir = zip_ref.namelist()[0].split('/')[0]
            zip_ref.extractall(".")
            # 如果目标文件夹已存在，先删除
            if os.path.exists(folder):
                import shutil
                shutil.rmtree(folder)
            os.rename(root_dir, folder)
        print(f"Extracted to {folder}")
        os.remove(zip_path)
    except Exception as e:
        print(f"Failed to download or extract {folder}: {e}") 