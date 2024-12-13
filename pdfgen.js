
// 用來生成測試pdf

const fs = require('fs');
const PDFDocument = require('pdfkit');

for (let i = 1; i <= 52; i++) {
  const doc = new PDFDocument();
  
  const filename = `./src/pdf/${i}.pdf`;
  doc.pipe(fs.createWriteStream(filename));
  
  doc.fontSize(25)
     .text(`${i}`, { align: 'center' });

  doc.end();
}

console.log("PDFs generated successfully!");