// 设置 rem 函数
const setRem = () => {
  let CW
  switch (true) {
    case document.documentElement.clientWidth > 750:
      CW = 750
      break
    case document.documentElement.clientWidth < 320:
      CW = 320
      break
    default:
      CW = document.documentElement.clientWidth
  }
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = CW / 7.5
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = scale + 'px'
}

export default setRem
