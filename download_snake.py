import os
import urllib.request
import zipfile

url = "https://github.com/lorecioni/snake/archive/refs/heads/gh-pages.zip"
zip_path = "snake.zip"
folder = "snake"

print("Downloading new Snake game...")
urllib.request.urlretrieve(url, zip_path)
print("Downloaded snake.zip")

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    root_dir = zip_ref.namelist()[0].split('/')[0]
    zip_ref.extractall(".")
    if os.path.exists(folder):
        import shutil
        shutil.rmtree(folder)
    os.rename(root_dir, folder)
print(f"Extracted to {folder}")
os.remove(zip_path)
print("Done.") 