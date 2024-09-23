import React, { useState } from 'react';
import * as ml5 from 'ml5';  
/* 圖片識別程式 */
export default function ImageClassifier() {
  const [image, setImage] = useState(null);   //顯示的圖片
  const [result, setResult] = useState('');  //圖片識別結果

  //上傳圖片處理
  const handleImageUpload = (event) => {
    const file = event.target.files[0];   //取得上傳檔案
    if (file) {
      const reader = new FileReader();    //web-browser的 檔案讀取器
      reader.onload = () => {   //異步讀取完檔案後執行
        setImage(reader.result);
        setResult('圖片識別中...');
        classifyImage(reader.result);   //呼叫圖片識別
      };
      reader.readAsDataURL(file);   //將指定的檔案內容讀取為 Data URL
    }
  };

  //圖片AI識別
  const classifyImage = (imageSrc) => {
    const classifier = ml5.imageClassifier('MobileNet', () => {   //MobileNet:手機用/輕量級 神經網路
      const img = new Image();  //web-browser的 圖片物件
      img.src = imageSrc;
      img.onload = () => {  //異步讀取完圖片後執行
        classifier.classify(img, (err, results) => {    //開始圖片AI識別,結果存入results
          if (err) {
            console.error(err);
            return;
          }
          setResult(`類別: ${results[0].label}, 可信度(0~1): ${results[0].confidence.toFixed(2)}`);
        });
      };
    });
  };

  //顯示圖片,以及 圖片AI識別結果
  return (
    <div>
      <center>
      <h1>圖片識別AI</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && 
      <img src={image} alt="Uploaded" style={{ maxWidth: '300px', marginTop: '20px' }} />
      }
      <br /> <hr /> <br />
      <div>{result}</div>
      </center>
    </div>
  );
};


