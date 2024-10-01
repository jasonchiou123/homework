import brain from 'brain.js';
const net = new brain.NeuralNetwork();  //神經網路模組

//先給AI幾筆訓練資料, 學習判斷顏色是亮或暗?
/* 三原色光線RGB表示法: [紅色/255, 綠色/255, 藍色/255] */
net.train([
//白色 
{input:[255/255, 255/255, 255/255], output:{light:1}},  //告訴AI:這是亮色
// 淺灰色 
{input:[192/255, 192/255, 192/255], output:{light:1}},  //同上
// 深灰色 
{ input:[65/255, 65/255, 65/255], output:{dark:1}},  //告訴AI:這是暗色
// 黑色
{ input:[0, 0, 0], output:{dark:1}},  //同上
]);

//測試:給AI判斷顏色 是亮或暗?
let result = net.run([0, 0, 128/255]);  //深藍色
console.log(`暗色機率: ${result["dark"]} , 亮色機率: ${result["light"]}`); 
if (result["dark"] > result["light"]) {
    console.log("AI判斷:暗色");
} else {
    console.log("AI判斷:亮色");
}
