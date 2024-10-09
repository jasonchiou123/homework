import { MongoClient } from 'mongodb';

// 連接 MongoDB 資料庫
const uri = "mongodb://localhost:27017"; //MongoDB 連接字串, 27017 為預設 port
const client = new MongoClient(uri);
/* 注意:資料庫是異步操作, 但是 await 不在函數內，不需要 async, try 語法防錯即可  */ 
  try {
    await client.connect();   // 開啟連線
    const database = client.db('mydb');   // 選擇資料庫
    const collection = database.collection('users');    // 選擇資料表    

    // 新增資料
    const result = await collection.insertOne({ name: "John Doe", age: 30 });
    console.log(`資料已新增, ID: ${result.insertedId}`);
    // 更新資料
    const updateResult = await collection.updateOne({ name: "John Doe" }, { $set: { age: 31 } });
    console.log(`${updateResult.matchedCount} 筆資料已更新`);
    // 查詢資料
    const findResult = await collection.findOne({ name: "John Doe" });
    console.log("查詢到的資料:", findResult);
    // 刪除資料
    const deleteResult = await collection.deleteOne({ name: "John Doe" });
    console.log(`${deleteResult.deletedCount} 筆資料已刪除`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();   //不論執行對錯, 都要關閉資料庫連線!!
  }
