@echo off

cd C:\Users\usuario\Documents\ImageEditor
php -S localhost:8000
start chrome "http://localhost:8000"