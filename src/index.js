import * as $ from 'jquery';
import Post from "@models/Post";
// import json from './assets/json.json';
// import xml from './assets/data.xml';
// import csv from './assets/csv.csv';
import WebpackLogo from '@/assets/webpack-logo.png';
import './styles/styles.css';
import './styles/less.less';
import './styles/sass.sass';
import './styles/scss.scss';

const post = new Post('Webpack Post Title', WebpackLogo);

console.log('Post to Sting', post.toString());

$('pre').addClass('code').html(post.toString());

// console.log('JSON:', json);
// console.log('XML:', xml);
// console.log('CSV:', csv);

async function test() {
    return await Promise.resolve('Async is working');
}

test().then(console.log);