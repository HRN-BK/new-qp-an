const fs = require('fs');

// Đọc file index.html
try {
  const indexHtml = fs.readFileSync('./index.html', 'utf8');
  
  // Làm sạch dữ liệu bằng cách xóa các dấu gạch ngang dài
  const cleanedHtml = indexHtml.replace(/\s*-{5,}\s*.*?"/g, '"');
  
  // Ghi lại file đã làm sạch
  fs.writeFileSync('./cleaned-index.html', cleanedHtml);
  
  console.log('Đã làm sạch index.html và lưu vào cleaned-index.html');
  console.log('Vui lòng kiểm tra file cleaned-index.html và nếu đúng, hãy đổi tên nó thành index.html');
} catch (error) {
  console.error('Lỗi khi xử lý file:', error);
} 