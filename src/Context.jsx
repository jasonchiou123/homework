import  React,{ useState } from 'react'

export const myContext= React.createContext();  //定義全域變數

export default function Context(props) {
  const [str, setStr] = useState('abc');
  const [state, setState] = useState(0);
    return (
     <div>
    <myContext.Provider value={{str ,state,setState}}>  {/* 全域變數往下傳播 */}
    {props.children}  {/* 所有的子元件 */}
    </myContext.Provider>
     </div>
   )
}
