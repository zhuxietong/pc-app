
/**
 * 处理第n 窗口所在的网格布局信息
 * 第一个参数是窗口的序号
 * 第二个参数是网格布局信息{row:number,col:number}
 * 第三个参数是网格布局所在的容器窗口的大小
 * @param {number} index
 * @param {{row:number,col:number}} layout
 * @param {{width:number,height:number}} container
 * return {x:number,y:number,width:number,height:number}
 */
export const getGridLayout = (index: number, layout: {row:number,col:number}, container: {width:number,height:number}) => {
  const {row, col} = layout;
  const totalWindows = row * col;
  const windowWidth = Math.floor(container.width / col);
  const windowHeight = Math.floor(container.height / row);
  const x = (index % col) * windowWidth;
  const y = Math.floor(index / col) * windowHeight;
  return {x, y, width: windowWidth, height: windowHeight}
}
