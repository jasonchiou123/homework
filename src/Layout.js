import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
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
          </tr>
        </table>
      </nav>

      <Outlet />
    </>
  )
};

