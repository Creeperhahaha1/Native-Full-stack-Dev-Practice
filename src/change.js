
const scroll = document.querySelector('div#pdf');
const buttons = [next,back,begin,end];
const normalizeRight = (r) => Math.round(r / 360) * 360;

const handleButtonClick = (event) => {
  const children = scroll.children;
  const scrollWidth = scroll.scrollWidth;
  const currentRight = parseInt(window.getComputedStyle(children[0]).right.slice(0, -2));
  const endDif = scrollWidth - currentRight;
  
  let newRight; 
  const updateElement = (children,newRight) => {
    for(const ele of children) {
      ele.style.right = `${newRight}px`
    }
  }

  switch (event.currentTarget.id) {
    case 'next': 
      if (endDif < 360) return normalizeRight(currentRight);
      newRight = normalizeRight(currentRight + 360);
      updateElement(children,newRight);
    return newRight;

    case 'back': 
      if(currentRight < 360) return normalizeRight(currentRight);
      newRight = normalizeRight(currentRight - 360);
      updateElement(children,newRight);
    return newRight;

    case 'begin':
      for (const ele of children) {
        ele.style.right = `0px`;
      }
    return 0;

    case 'end':
      newRight = 360 * Math.floor(scrollWidth / 360);
      updateElement(children,newRight);
    return newRight;

    default: throw new Error(`unknown id: ${event.currentTarget.id}`)
  }
};

const pageDisplay = document.getElementById('page');

const calculatePages = (scr, scrollWidth) => {
  const currentPage = scr/360 + 1
  const totalPages = normalizeRight(scrollWidth) / 360;
  return { currentPage, totalPages };
};

const initPages = () => {
  const observer = new MutationObserver(() => {
    if (scroll.scrollWidth) {
      const totalPages = normalizeRight(scroll.scrollWidth) / 360;
      pageDisplay.innerText = `1/${totalPages}`;
      observer.disconnect(); 
    }
  });
  observer.observe(document.body, { childList: true, subtree: true }); 
}

window.onload = () => {
  initPages();
};

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const scr = handleButtonClick(event); 
    const { currentPage, totalPages } = calculatePages(scr, scroll.scrollWidth);
    pageDisplay.innerText = `${currentPage}/${totalPages}`;
  });
});