from python:3.11-slim-buster

copy . /app
workdir /app
run pip install -r requirements.txt
cmd gunicorn src.this_material_does_not_exist.app:server -b 0.0.0.0:8050
