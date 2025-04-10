#!/bin/bash

# Sao lưu file gốc
cp index.html index.html.bak

# Làm sạch dấu gạch ngang và lưu vào file tạm
# Sử dụng sed để xóa các dấu gạch ngang dài
sed 's/\s*-\{5,\}.*"/"/g' index.html > index.html.tmp

# Thay thế file gốc bằng file đã làm sạch
mv index.html.tmp index.html

echo "Đã làm sạch file index.html"
echo "Bản sao lưu được lưu tại index.html.bak" 