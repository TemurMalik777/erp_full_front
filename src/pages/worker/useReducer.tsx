import { Button, Input, List, Space } from "antd";
import { useReducer, useState } from "react";

// const initialState = { count: 0, value1: "", color: false };
// function reducer(state: any, action: any) {
//   switch (action.type) {
//     case "incremnet":
//       return { ...state, count: state.count + 1 };
//     case "decremnet":
//       return { ...state, count: state.count - 1 };
//     case "toggleColor":
//       return { ...state, color: !state.color };
//     case "inputValue":
//       return { ...state, value1: action.payload };
//     default:
//       return state;
//   }
// }

// const Reducer = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       <h1 style={{ color: state.color ? "#fff" : "red", width:4 }}>
//         Count:{state.count}
//       </h1>
//       <Input type="text" value={state.value1} onChange={(e) => dispatch({ type: "inputValue", payload: e.target.value })}/>
//       <Button onClick={()=> dispatch({type:"incremnet"})}>+</Button>
//       <Button onClick={()=> dispatch({type:"decremnet"})}>-</Button>
//       <Button onClick={()=> dispatch({type:"toggleColor"})}>rangggggg</Button>
//       <h1 style={{color:"red"}}>{state.value1}</h1>

//     </>
//   );
// };

// export default Reducer;

const initialState = {
  count: 0,
  value1: "",
  color: false,
  todos: [],
};

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
    case "add":
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };
    case "delete":
      return {
        ...state,
        todos: state.todos.filter((todo: any) => todo.id !== action.payload),
      };
    case "update":
      return {
        ...state,
        todos: state.todos.map((todo: any) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    default:
      return state;
  }
}

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todoInput, setTodoInput] = useState("");
  const [editongId, setEditingId] = useState<number | null>(null);

  const handleAddUpdate = () => {
    if (editongId !== null) {
      dispatch({
        type: "update",
        payload: { id: editongId, text: todoInput },
      });
      setEditingId(null);
    } else {
      if (todoInput.trim() !== "") {
        dispatch({ type: "add", payload: todoInput });
      }
    }
    setTodoInput("");
  };

  const handleEdit = (todo: any) => {
    setTodoInput(todo.text);
    setEditingId(todo.id);
  };
  return (
    <div>
      <h1 style={{ color: state.color ? "#fff" : "red" }}>
        Count: {state.count}
      </h1>
      <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>
        <Input
          placeholder="Entr your name..."
          value={state.value1}
          onChange={(e) =>
            dispatch({ type: "inputValue", payload: e.target.value })
          }
        />
        <Button onClick={() => dispatch({ type: "toggleColor" })}>
          Rangni o‘zgartir
        </Button>
        <Button onClick={() => dispatch({ type: "increment" })}>+</Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>-</Button>
        <h2 style={{ color: "red" }}>{state.value1}</h2>
      </Space>

      <hr />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Todo type..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button type="primary" onClick={handleAddUpdate}>
          {editongId !== null ? "Update" : "Add"}
        </Button>

        <List
          bordered
          dataSource={state.todos}
          renderItem={(todo: any) => (
            <List.Item
              actions={[
                <Button
                  danger
                  onClick={() => dispatch({ type: "delete", payload: todo.id })}
                >
                  O'chirish
                </Button>,
                <Button onClick={() => handleEdit(todo)}>Edit</Button>,
              ]}
            >
              {todo.text}
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
};

export default Reducer;
