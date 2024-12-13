// abstract.js

export default class {
  constructor(){
    this.msg=null;
  }
  setTitle(title){
    document.title = title;
  }
  loadData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true); 
      xhr.send(); 
      xhr.onload = () => { 
        this.msg = JSON.parse(xhr.responseText).msg;
        console.log(this.msg);
        resolve();
      };
      xhr.onerror = () => { 
        reject(new Error('Failed to fetch data.'));
      };
    });
  }
  
  async setHtml(){
    return "";
  }
}