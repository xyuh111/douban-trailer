// import React from 'react'
// import { render } from 'react-dom'
// import {
//     BrowserRouter
// } from 'react-router-dom'
// import App from './app'
// const rootElement = document.getElemetById('app')

// render(<BrowserRouter>
//   <App />
// </BrowserRouter>,rootElement)

import './assets/common.sass'
function changeTitle(){
    window.$('#app').html('Parcel 打包包')
}

setTimeout(function(){
    changeTitle()
},2000)