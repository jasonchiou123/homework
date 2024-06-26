//元件函式: 顯示資料及地區選擇
export default function ShowData(args) {  //args為一個所有參數形成的物件
    return (
      <div align="center">
        <h1>空氣品質指標(AQI)</h1>
        <hr /> <br /> 請選擇地區: 
            <select value={args.county} onChange={args.func}>
            <option value="臺北市">臺北市</option>
            <option value="臺中市">臺中市</option>
            <option value="高雄市">高雄市</option>
            <option value="新竹縣">新竹縣</option>
            <option value="嘉義縣">嘉義縣</option>
            </select> 
            <br /><hr />
            空氣污染物名詞說明:<br />
            pm2.5: 細懸浮微粒（μg/m3）<br />
            co: 一氧化碳（ppm）<br />
            so2: 二氧化硫（ppb）<br />
            <br /><hr />
            <table  border="1">
              <thead bgcolor='Tomato'>
                <tr>
                  <th>縣市</th>
                  <th>監測站名</th>
                  <th>監測時間</th>
                  <th>空氣狀態</th>
                  <th>AQI</th>
                  <th>PM2.5</th>
                  <th>CO</th>
                  <th>SO2</th>
                </tr>
              </thead>
              <tbody bgcolor='orange'>
                {args.data.filter(item => item.county === args.county).map((item, index) => (
                  <tr key={index}>
                    <td>{item.county}</td>
                    <td>{item.sitename}</td>
                    <td>{item.publishtime}</td>
                    <td>{item.status}</td>
                    <td>{item.aqi}</td>
                    <td>{item["pm2.5"]}</td>
                    <td>{item.co}</td>
                    <td>{item.so2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    );
  }