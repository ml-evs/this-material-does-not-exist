from python:3.11-slim-buster

copy . /app
workdir /app
run pip install -r requirements.txt
cmd python src/this_material_does_not_exist/app.py
