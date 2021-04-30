//导入封装axios的文件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//配置进度条参数
NProgress.configure({ showSpinner: false, minimum: 0.2, easeing: 'swing', speed: 1000, trickleRate: 0.2 });

//防止多次请求进度条重复加载
let loadingNum = 0;
export const startLoading = ()=> {
  if (loadingNum == 0) {
    NProgress.start()
  }
  loadingNum++;
}

export const endLoading = ()=> {
  loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

// Tips：如果想修改进度条颜色，可在app.vue样式中加入 #nprogress .bar { background: #F8C23B !important; }
