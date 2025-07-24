import { Button, Input } from "antd";
import { useReducer } from "react";

const initialState = { count: 0, value1: "", color: false };
function reducer(state: any, action: any) {
  switch (action.type) {
    case "incremnet":
      return { ...state, count: state.count + 1 };
    case "decremnet":
      return { ...state, count: state.count - 1 };
    case "toggleColor":
      return { ...state, color: !state.color };
    case "inputValue":
      return { ...state, value1: action.payload };
    default:
      return state;
  }
}

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1 style={{ color: state.color ? "#fff" : "red", width:4 }}>
        Count:{state.count}
      </h1>
      <Input type="text" value={state.value1} onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}/>
      <Button onClick={()=> dispatch({type:"incremnet"})}>+</Button>
      <Button onClick={()=> dispatch({type:"decremnet"})}>-</Button>
      <Button onClick={()=> dispatch({type:"toggleColor"})}>rangggggg</Button>
      <h1 style={{color:"red"}}>{state.value1}</h1>

    </>
  );
};

export default Reducer;
