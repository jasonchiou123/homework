import mysql from 'mysql2/promise';
const connection = await mysql.createConnection({   //開啟mysql連線
  host: 'localhost',  //主機名稱或IP, 使用本機則是: localhost,或127.0.0.1
  user: 'root',       //使用者名稱, 這裡就用mysql預設的管理帳號:root
  password: 'mysql',    //使用者密碼, 之前在 docker 容器設定好的密碼
});

try {   //演練資料庫操作, await不在函數內,不需要async
  await connection.query("CREATE DATABASE mydb");
  console.log("資料庫已建立");
  await connection.query("USE mydb");
  console.log("使用mydb資料庫");
  await connection.query("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))");
  console.log("造表:customers");  
  await connection.query("INSERT INTO customers (name, address) VALUES ('John', 'Highway 71')");
  console.log("新增記錄");
  const [results, fields]  = await connection.query("SELECT * FROM customers"); 
  console.log(results); // 取得資料記錄
  console.log(fields);  // 取得資料欄位定義
} catch (err) {
  console.log(err);
}
await connection.end(); //關閉連線