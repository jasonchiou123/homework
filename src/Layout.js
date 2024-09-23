import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>  {/* 導覽列 */}
        <table border="1" bgcolor="lightblue" align="center" >
          <tr>
            <td>
              <Link to="/">CRA首頁</Link>
            </td>
            <td>
              <Link to="/Chat">聊天室(要開主機)</Link>
            </td>
            <td>
              <Link to="/Air">空氣品質</Link>
            </td>
            <td>
              <Link to="/Charts">占星圖</Link>
            </td> 
            <td>
              <Link to="/Three">展示3D</Link>
            </td>    
            <td>
              <Link to="/ML5">圖片識別AI</Link>
            </td>                      
          </tr>
        </table>
      </nav>

      <Outlet />  {/* 在這裡顯示上述的 路由頁面內容 */}
    </>
  )
};

