import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';  //MVC-view套件:圓餅圖
import natal from "./natal.js"  //取得行星的位置

const zodiac = [  //12個星座, value為此區塊所佔的圓餅比例
  { name: '白羊', value: 1},{ name: '金牛', value: 1},{ name: '雙子', value: 1},
  { name: '巨蟹', value: 1},{ name: '獅子', value: 1},{ name: '處女', value: 1},
  { name: '天秤', value: 1},{ name: '天蠍', value: 1},{ name: '射手', value: 1},
  { name: '摩羯', value: 1},{ name: '水瓶', value: 1},{ name: '雙魚', value: 1},  
];

export default function Charts() {
  let [planet,setPlanet]= useState([]) 
  let [birth,setBirth]= useState('')
 
  useEffect(() =>{
    let originalArray = Array.from({ length: 360 }, () => ({ name: '', value: 1 }));
    setPlanet(originalArray)  //劃出360度的圓
  },[])

  //計算出行星的位置
  const calculate = () => {
    let bir=birth
    let y=bir.substring(0,4)
    let m=bir.substring(5,7) 
    let d=bir.substring(8,10)
    let h=bir.substring(11,13)
    let i=bir.substring(14,16)
    let me=new natal(y,m,d,h,i)
    let myData=me.calc()  //取得各行星資料
    
    //把行星標示在圓餅圖上    
    let setArray = Array.from({ length: 360 }, () => ({ name: '', value: 1 }));
    const starArray = ["Sun","Moon","Venus","Jupiter","Mercury","Mars","Saturn","Ascendant"];
    for (let key in myData){
      if (starArray.includes(key)){
        setArray[Math.floor(myData[key].value)].name+= myData[key].name
      }
    }
    setPlanet(setArray)
  }

  //計算圓餅文字的中點座標, 複雜的數學公式就暫不解釋了~
  const RADIAN = Math.PI / 180;
  const charMiddle = (cx, cy,innerRadius,outerRadius,midAngle) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return [x,y]
  }

  //顯示星座文字
  const zodiacLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    let [x,y]=charMiddle(cx, cy,innerRadius,outerRadius,midAngle) 
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {zodiac[index].name}
      </text>
    );
  };
  //顯示行星文字
  const planetLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    let [x,y]=charMiddle(cx, cy,innerRadius,outerRadius,midAngle) 
    if (planet[index].name !== '') {
      return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          { planet[index].name }
        </text>
      );      
    }
  };

    return (<>
    出生時間 : <input type="datetime-local" name="bdaytime" 
    value={birth} onChange={(e) => setBirth(e.target.value)} />
    <button onClick={calculate}>運算</button>

    <PieChart width={700} height={700}>
{/*     cx,cy: 圓心點座標, 50% = 700/2 = 350
        innerRadius,outerRadius: 圓弧段內外緣半徑
        label: 顯示文字之函數
        startAngle: 圓餅圖起始角度(白羊座起始點為315度)
        endAngle: 圓餅圖結束角度(繞一圓圈:315+360=675度)   */}

        <Pie data={zodiac} dataKey="value" cx="50%" cy="50%" startAngle={315} endAngle={675}
        labelLine={false} label={zodiacLabel} innerRadius={150} outerRadius={250} fill="#0088FE"  />

        <Pie data={planet} dataKey="value" cx="50%" cy="50%" startAngle={315} endAngle={675}
        labelLine={false} label={planetLabel} innerRadius={250} outerRadius={300} fill="pink">
          {/* 紅色:行星度數, 橘色:每隔10度, 粉紅色:預設的空白 */}
          {planet.map((entry, index) => (  
          <Cell fill={entry.name !=='' ? 'red' : index % 10 ===0 ? 'orange':'pink'} />
          ))}
        </Pie>
    </PieChart>
    </>
    );
}

