import { BrowserRouter, Routes, Route } from "react-router-dom";  //換頁功能
import I18nRoot from './I18nRoot';   //翻譯
import Chat  from './client';  //之前用 javascript 開發的線上即時聊天室
import Home from './Home';  //首頁
import Air from './Air';  //之前用 javascript 開發的每日空污指數表
import Layout from './Layout';  //導覽列 佈局檔案
import NoPage from './NoPage';  //沒有找到頁面路由 path 時,顯示的頁面
import Context from './Context.jsx';  //全域變數定義檔案

//create react app 主程式起點App()
export default function App() {
  return (
    <Context>
    <I18nRoot>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  {/* index=首頁  */}
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Air" element={<Air />} />
          <Route path="*" element={<NoPage />} />  {/* path星號=找不到的頁面  */}
        </Route>
      </Routes>
    </BrowserRouter>
    </I18nRoot>
    </Context>
  );
}
