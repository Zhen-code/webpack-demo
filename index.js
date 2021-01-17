import './src/font/iconfont.css';
import './src/css/index.css'; // eslint-disable-next-line
import print from "./src/js/print";
import print1 from './src/js/print1';

if (module.hot) {
  module.hot.accept('./src/js/print.js', () => {
    print();
  });
  module.hot.accept('./src/js/print1.js', () => {
    print1();
  });
}
