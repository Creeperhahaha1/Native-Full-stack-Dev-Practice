//server.js 

const http = require("http");
const fs = require("fs");
const path = require("path");
const handleContentType = (ext) => {
  switch(ext){
    case ".html":
      return "text/html"
    case ".css":
      return "text/css"
    case ".js":
      return "text/javascript"
    case ".pdf":
      return "application/pdf"
    default:
      return "text/plain"
  }
}
const findPage = (targetPage) => {
  const Pages = [
    {url:"/",path:"/public/pages/index.html"}
  ]
  const find = Pages.find((item)=>{
    return item.url === targetPage
  })
  return find ? find.path : "";
}
const renderPage = (req, res) => {
  let reqPath = req.url; 
  console.log(reqPath);
  if((/^\/(?!src|public).*/).test(req.url)){ 
    reqPath = findPage(req.url);
  }
  const contentType = handleContentType(path.extname(reqPath));
  const filePath = path.resolve(__dirname, "."+ reqPath);
  fs.readFile(filePath,(err,data)=>{
    if(err){
      res.writeHead(404, { "Content-Type":"text/plain" })
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType })
      res.end(data);
    }
  })
}

const searchPDF = async () => {
  const folderPath = path.join(__dirname,'src','pdf');
  const files = await fs.promises.readdir(folderPath);
  const pdfFiles = [];
  for(const file of files){
    const filePath = path.join(folderPath,file);
    const data = await fs.promises.readFile(filePath);
    if(data)
      pdfFiles.push({file});
  }
  return pdfFiles;
}

const handleApiRequest = async (req, res) => {
  if(req.method === 'GET' && req.url === '/api/data'){
    res.writeHead(200,{'Content-Type': 'application/json'})
    const data = await searchPDF();
    res.end(JSON.stringify({msg: data}));
    return true;
  } else {
    return false;
  }
}
const server = http.createServer(async (req,res)=>{
  if(await handleApiRequest(req, res)) {
  } else {
    renderPage(req,res);
  }
})
server.listen(5000, ()=> console.log("server running..."))