import os
import urllib.request
import zipfile

url = "https://github.com/xviniette/Minesweeper/archive/refs/heads/master.zip"
zip_path = "minesweeper.zip"
folder = "minesweeper"

print("Downloading new Minesweeper game...")
urllib.request.urlretrieve(url, zip_path)
print("Downloaded minesweeper.zip")

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