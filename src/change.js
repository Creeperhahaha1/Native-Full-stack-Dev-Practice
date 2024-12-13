

const scroll = document.querySelector('div#pdf');

const normalizeRight = (r) => Math.round(r / 360) * 360;

const buttons = [next,back,begin,end];

const handleButtonClick = (event) => {
  switch(event.currentTarget.id){
    case 'next':
      for(const ele of scroll.children){
        const r = window.getComputedStyle(ele).right.slice(0,-2);
        const endDif = scroll.scrollWidth - r;
        if(endDif>360){
          const newR = normalizeRight(parseInt(r) + 360);
          ele.style.right = `${newR}px`;
        }
      } 
    return;

    case 'back':
      for(const ele of scroll.children){
        const r = window.getComputedStyle(ele).right.slice(0,-2);
        if(r>=360){
          const newR = normalizeRight(parseInt(r) - 360);
          ele.style.right = `${newR}px`;
        }
      } 
    return;

    case 'begin':
      for(const ele of scroll.children){
        ele.style.right = `0px`;
      }
    return;

    case 'end':
      for(const ele of scroll.children){
        const newR = 360*parseInt(scroll.scrollWidth/360);
        ele.style.right = `${newR}px`;
      }
    return; 

  }
}

buttons.forEach(button=>{
  button.addEventListener('click',handleButtonClick);
})