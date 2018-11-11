// 1.导入包
import React from 'react';
import ReactDom from 'react-dom';

const msg = '哇哈哈2';
const title = '我是 DIV';
const list = [
  <p>1</p>,
  <p>2</p>,
];

/**
 * 2.创建虚拟 DOM 元素
 */
const div =
  <div title={ title }>
    { msg }
    { list }
  </div>
;



/**
 * 3.将虚拟 DOM 渲染到页面的 DOM 元素
 * @param-1 {object} 虚拟 DOM 对象
 * @param-2 {HTMLElement} DOM 容器
 */
ReactDom.render(div, document.querySelector('#app'));
