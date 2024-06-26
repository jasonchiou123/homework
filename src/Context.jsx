import  React,{ useState } from 'react'

export const myContext= React.createContext();

export default function Context(props) {
  const [str, setStr] = useState('abc');
  const [state, setState] = useState(0);
    return (
     <div>
    <myContext.Provider value={{str ,state,setState}}>
    {props.children}
    </myContext.Provider>
     </div>
   )
}
