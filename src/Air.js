import React, { useState, useEffect } from 'react';
import ShowData from './ShowData.js';  //載入顯示資料元件
//主程式進入點
export default function Air() {
  const [data, setData] = useState(null);  //存放 web API 回傳的資料
  const [county, setCounty] = useState("臺北市");  //預設地區為臺北市
  //web API : 定時取得空氣品質指標(AQI)
  let url="https://data.moenv.gov.tw/api/v2/aqx_p_432?"
  url+="api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d"
  url+="&limit=1000&sort=ImportDate%20desc&format=JSON"

  useEffect( () => {
    const fetchData = async () => {  // async 函式內才能使用 await 同步等待
      try {
        const response = await fetch(url);  //呼叫 web API, 並等待取得 web API 回傳的資料
        const dataObject = await response.json();  // 取得 web API 回傳的資料, 並等待轉為物件
        setData(dataObject.records)  // data.records 為地區資料陣列, 存在 data 狀態變數
      } catch (error) {
        console.error('錯誤:', error);  // 顯示錯誤
      }
    };
    fetchData();  //執行 async 函式
  }, []);  // [] : 只在程式開始時, 執行一次

  // 選擇的顯示地區改變時，執行的函式
  const handleChange = (event) => {
    console.log('Selected option:', event.target.value);
    setCounty(event.target.value);  //狀態:county一有更新,會驅動ShowData元件函式,重新顯示資料!
  };

  return (
    <>
      {data ? (  // 有資料才顯示, 標記:<ShowData> 視同呼叫函式 ShowData(data, county, handleChange) 
        <div>
          <ShowData data={data} county={county} func={handleChange} /> 
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};







