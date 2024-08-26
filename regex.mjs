/*  JS使用 /.../ 來定義正規式  */
//檢測是否符合正規式
const pattern = /09\d{8}/;  //台灣手機號碼格式
let result = pattern.test("0912345678"); // .test() 檢測
console.log(result)  // true

//字串搜尋
const email = /([\w-.]+)@([\w-]+\.)+[\w-]{2,4}/;  //email郵件格式, 括號內的為子字串
let str="xxx@gmail.com";
let strArray = str.match(email); // .match() 搜尋子字串->陣列
console.log(`全字串: ${strArray[0]} , 使用者: ${strArray[1]} , 郵件主機: ${strArray[2]}`);  
//輸出=> 全字串: xxx@gmail.com , 使用者: xxx , 郵件主機: gmail.

//字串取代
let newstr = str.replace(/([\w-.]+)/, "john"); // .replace() 比對正規式後取代
console.log(newstr); // john@gmail.com