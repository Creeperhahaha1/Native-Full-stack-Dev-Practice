//list.js
import Abstract from './abstract.js'

class Homepage extends Abstract {
  constructor(){super();}

  async setHtml() {
    await this.loadData("/api/data");
    let content = '';
    for (const ele of this.msg) {
      content += `<div><a href=/src/pdf/${ele.file} target="_blank">${ele.file.slice(0,-4)}</a></div>`;
    }
    document.querySelector("#pdf").innerHTML = content; 
  }
}

const page = new Homepage();
page.setHtml();
