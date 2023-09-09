import List from './list';
import IndexPc from './indexPc'
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||false;
let index=List;
if(isMobile){
    index=List;
}
else{
    index=IndexPc;
}

export default index;