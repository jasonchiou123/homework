import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import {myContext} from './Context.jsx';

export default function Home() {
  const {str, state, setState } = useContext(myContext); 
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <hr /> 
        可受翻譯的字詞: 
        {t('title')} , {t('switch')} {/* 可受翻譯檔案影響的字詞 */}
        <hr /> 
        全域變數: 
        1={str } ,2={ state}  {/* 透過Context取得全域資料 */}
        <button onClick={() => setState(1)}> 修改全域變數 </button>
        <hr />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
