import './src/font/iconfont.css';
import './src/css/index.css'; // eslint-disable-next-line
import $ from 'jquery'
import print from './src/js/print';
// eslint-disable-next-line
//实现代码分割到不同对应文件
// import(/* webpackChunkName: "print1" */ './src/js/print1')

// js懒加载(点击使用时加载)与预加载(浏览器空闲自动加载资源)
const a = () => import(/* webpackChunkName: "print1",webpackPrefetch:true */ './src/js/print1');
setTimeout(() => {
  a();
}, 6000);
// eslint-disable-next-line
console.log($)
if (module.hot) {
  module.hot.accept('./src/js/print.js', () => {
    print();
  });
}
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/service-worker.js').then(res=>{
      // eslint-disable-next-line
      console.log('service register')
    }).catch(err=>{
      // eslint-disable-next-line
      console.log(err)
    })
  })
}
