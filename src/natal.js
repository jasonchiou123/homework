import { Origin, Horoscope }  from 'circular-natal-horoscope-js';  //MVC-model套件:計算行星的位置

export default class natal {
  constructor(y,m,d,h,i) {  
    this.origin = new Origin({  //出生時辰
      year: y, 
      month: m-1, // 0 = January, 11 = December!
      date: d,
      hour: h,
      minute: i,
      sec: 0,
      latitude: 23.0,  //緯度
      longitude: 120.0, //經度
    });

    this.horoscope = new Horoscope({    //占星參數: 專業領域就不解釋了
      origin: this.origin,
      houseSystem: "whole-sign",
      zodiac: "tropical",  //"sidereal",  
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ["major", "minor"],
      language: 'en'
    });

    this.date=new Date(y,m-1,d,h,i,0)
    this.starArray={}
  }

  calc(){   
    //取得行星位置
    let temp={}
    this.horoscope.CelestialBodies.all.forEach(function(obj){
      temp[obj.label]= {name: obj.label, value: obj.ChartPosition.Ecliptic.DecimalDegrees}
    });    

    //取得出生時刻的 上升點
    temp[this.horoscope.Ascendant.label]= {name: this.horoscope.Ascendant.label, 
        value: this.horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees}

    this.starArray=temp
    this.starArray["Sun"].name='日'
    this.starArray["Moon"].name='月'
    this.starArray["Venus"].name='金'
    this.starArray["Jupiter"].name='木'
    this.starArray["Mercury"].name='水'
    this.starArray["Mars"].name='火'
    this.starArray["Saturn"].name='土'
    this.starArray["Ascendant"].name='升'
    return this.starArray 
  }
}
