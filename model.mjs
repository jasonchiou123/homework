import mysql from 'mysql2/promise';

export default class model {
    static async find() {  
        const connection = await mysql.createConnection({   //開啟mysql連線
            host: 'localhost',  //主機名稱或IP, 使用本機則是: localhost,或127.0.0.1
            user: 'root',       //使用者名稱, 這裡就用mysql預設的管理帳號:root
            password: 'mysql',    //使用者密碼, 之前在 docker 容器設定好的密碼
        });
            
        try {   
            const [results, fields]  = await connection.query("SELECT * FROM mydb.customers"); 
            return (JSON.stringify(results));
        } catch (err) {
            return (JSON.stringify({ error: err }));
        } finally { 
            await connection.end(); //關閉連線
        }
    }
}





