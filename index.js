import './src/font/iconfont.css';
import './src/css/index.css'; // eslint-disable-next-line
import $ from 'jquery'
import print from './src/js/print';
// eslint-disable-next-line
const a = () => import(/* webpackChunkName: "print1" */ './src/js/print1')
// eslint-disable-next-line
console.log($)
if (module.hot) {
  module.hot.accept('./src/js/print.js', () => {
    print();
  });
}
