// import { Button, Input,} from "antd";
// import { useReducer } from "react";

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

// import {
//   Button,
//   Input,
//   List,
//   Space,
//   Card,
//   Progress,
//   Spin,
//   Typography,
// } from "antd";
// import { useEffect, useReducer, useState } from "react";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   BgColorsOutlined,
//   ReloadOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const antIcon = <SyncOutlined style={{ fontSize: 25, color: "black" }} spin />;

// interface Todo {
//   id: number;
//   text: string;
// }

// interface State {
//   count: number;
//   value1: string;
//   color: boolean;
//   todos: Todo[];
//   progress: number;
//   loading: boolean;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// const initialState: State = {
//   count: 0,
//   value1: "",
//   color: false,
//   todos: [],
//   progress: 0,
//   loading: true,
// };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "incremnet":
//       return { ...state, count: state.count + 1 };
//     case "decremnet":
//       return { ...state, count: state.count - 1 };
//     case "toggleColor":
//       return { ...state, color: !state.color };
//     case "inputValue":
//       return { ...state, value1: action.payload };
//     case "add":
//       return {
//         ...state,
//         todos: [...state.todos, { id: Date.now(), text: action.payload }],
//       };
//     case "delete":
//       return {
//         ...state,
//         todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
//       };
//     case "update":
//       return {
//         ...state,
//         todos: state.todos.map((todo: Todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, text: action.payload.text }
//             : todo
//         ),
//       };
//     case "progress":
//       const newProgress = state.progress + 1;
//       return {
//         ...state,
//         progress: newProgress >= 100 ? 100 : newProgress,
//         loading: newProgress < 100,
//       };
//     case "resetProgress":
//       return { ...state, progress: 0, loading: true };
//     default:
//       return state;
//   }
// }

// const Reducer = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [todoInput, setTodoInput] = useState("");
//   const [editongId, setEditingId] = useState<number | null>(null);

//   const handleAddUpdate = () => {
//     if (editongId !== null) {
//       dispatch({
//         type: "update",
//         payload: { id: editongId, text: todoInput },
//       });
//       setEditingId(null);
//     } else {
//       if (todoInput.trim() !== "") {
//         dispatch({ type: "add", payload: todoInput });
//       }
//     }
//     setTodoInput("");
//   };

//   const handleEdit = (todo: Todo) => {
//     setTodoInput(todo.text);
//     setEditingId(todo.id);
//   };

//   useEffect(() => {
//     if (!state.loading) return;

//     const interval = setInterval(() => {
//       dispatch({ type: "progress" });
//     }, 800);
//     return () => clearInterval(interval);
//   }, [state.loading]);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           padding: "20px",
//         }}
//       >
//         <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
//           <div className="w-full mb-4">
//             <Text strong className="text-gray-700">
//               Progress
//             </Text>
//             <Progress
//               percent={state.progress}
//               status={state.progress === 100 ? "success" : "active"}
//               strokeColor={{
//                 "0%": "red",
//                 "50%": "blue",
//                 "100%": "red",
//               }}
//               trailColor="#e8ecef"
//               showInfo={true}
//               className="mt-2"
//             />
//           </div>

//           {/* Loading or Restart Button */}
//           {state.loading ? (
//             <div className="flex items-center gap-2">
//               <Spin indicator={antIcon} />
//               <Text className="text-black-500"> ...loading...</Text>
//             </div>
//           ) : (
//             <Button
//               type="primary"
//               danger
//               icon={<ReloadOutlined />}
//               onClick={() => dispatch({ type: "resetProgress" })}
//               className="rounded-lg"
//             >
//               Restart
//             </Button>
//           )}
//         </div>
//         <br />

//         {/* Counter Section */}
//         <Card
//           style={{
//             marginBottom: "24px",
//             borderRadius: "16px",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//             border: "none",
//             background: "rgba(255,255,255,0.95)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <div style={{ textAlign: "center" }}>
//             <Title
//               level={2}
//               style={{
//                 color: state.color ? "#0000" : "#f5222d",
//                 marginBottom: "20px",
//                 fontSize: "2.5rem",
//                 fontWeight: "bold",
//                 transition: "color 0.3s ease",
//               }}
//             >
//               🔢 Count: {state.count}
//             </Title>

//             <Space size="large" wrap>
//               <Button
//                 size="large"
//                 type="primary"
//                 onClick={() => dispatch({ type: "incremnet" })}
//                 style={{
//                   borderRadius: "25px",
//                   minWidth: "60px",
//                   height: "50px",
//                   fontSize: "24px",
//                   fontWeight: "bold",
//                   background: "linear-gradient(45deg, #52c41a, #73d13d)",
//                   border: "none",
//                   boxShadow: "0 4px 15px rgba(82, 196, 26, 0.4)",
//                 }}
//               >
//                 +
//               </Button>
//               <Button
//                 size="large"
//                 type="primary"
//                 danger
//                 onClick={() => dispatch({ type: "decremnet" })}
//                 style={{
//                   borderRadius: "25px",
//                   minWidth: "60px",
//                   height: "50px",
//                   fontSize: "24px",
//                   fontWeight: "bold",
//                   boxShadow: "0 4px 15px rgba(245, 34, 45, 0.4)",
//                 }}
//               >
//                 -
//               </Button>
//               <Button
//                 size="large"
//                 icon={<BgColorsOutlined />}
//                 onClick={() => dispatch({ type: "toggleColor" })}
//                 style={{
//                   borderRadius: "25px",
//                   height: "50px",
//                   background: "linear-gradient(45deg, #722ed1, #b37feb)",
//                   color: "white",
//                   border: "none",
//                   boxShadow: "0 4px 15px rgba(114, 46, 209, 0.4)",
//                 }}
//               >
//                 Change color
//               </Button>
//             </Space>
//           </div>
//         </Card>

//         {/* Name Input Section */}
//         <Card
//           style={{
//             marginBottom: "24px",
//             borderRadius: "16px",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//             border: "none",
//             background: "rgba(255,255,255,0.95)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <Space direction="vertical" style={{ width: "100%" }} size="large">
//             <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
//               👤 Name Input
//             </Title>
//             <Input
//               placeholder="Enter your name..."
//               value={state.value1}
//               onChange={(e) =>
//                 dispatch({ type: "inputValue", payload: e.target.value })
//               }
//               size="large"
//               style={{
//                 borderRadius: "12px",
//                 fontSize: "16px",
//                 padding: "12px 16px",
//               }}
//             />
//             {state.value1 && (
//               <div
//                 style={{
//                   padding: "16px",
//                   background: "linear-gradient(45deg, #ff9a9e, #fecfef)",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: "20px",
//                     fontWeight: "bold",
//                     color: "#722ed1",
//                   }}
//                 >
//                   Hello, {state.value1}! 👋
//                 </Text>
//               </div>
//             )}
//           </Space>
//         </Card>

//         {/* Todo Section */}
//         <Card
//           style={{
//             borderRadius: "16px",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//             border: "none",
//             background: "rgba(255,255,255,0.95)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <Title level={3} style={{ marginBottom: "20px", color: "#1890ff" }}>
//             📝 Todo Manager
//           </Title>

//           <Space direction="vertical" style={{ width: "100%" }} size="large">
//             <Space.Compact style={{ width: "100%" }}>
//               <Input
//                 placeholder="Enter your todo..."
//                 value={todoInput}
//                 onChange={(e) => setTodoInput(e.target.value)}
//                 size="large"
//                 style={{
//                   borderRadius: "12px 0 0 12px",
//                   fontSize: "16px",
//                 }}
//                 onPressEnter={handleAddUpdate}
//               />
//               <Button
//                 type="primary"
//                 onClick={handleAddUpdate}
//                 size="large"
//                 icon={editongId !== null ? <EditOutlined /> : <PlusOutlined />}
//                 style={{
//                   borderRadius: "0 12px 12px 0",
//                   background:
//                     editongId !== null
//                       ? "linear-gradient(45deg, #fa8c16, #ffc53d)"
//                       : "linear-gradient(45deg, #1890ff, #40a9ff)",
//                   border: "none",
//                   minWidth: "120px",
//                 }}
//               >
//                 {editongId !== null ? "Update" : "Add"}
//               </Button>
//             </Space.Compact>

//             {state.todos.length > 0 && (
//               <List
//                 bordered={false}
//                 dataSource={state.todos}
//                 style={{
//                   background: "rgba(240, 242, 245, 0.5)",
//                   borderRadius: "12px",
//                   padding: "8px",
//                 }}
//                 renderItem={(todo: Todo) => (
//                   <List.Item
//                     style={{
//                       background: "white",
//                       margin: "8px 0",
//                       borderRadius: "8px",
//                       border: "none",
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//                       padding: "16px",
//                     }}
//                     actions={[
//                       <Button
//                         type="text"
//                         icon={<EditOutlined />}
//                         onClick={() => handleEdit(todo)}
//                         style={{
//                           color: "#1890ff",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         Edit
//                       </Button>,
//                       <Button
//                         type="text"
//                         danger
//                         icon={<DeleteOutlined />}
//                         onClick={() =>
//                           dispatch({ type: "delete", payload: todo.id })
//                         }
//                         style={{
//                           borderRadius: "6px",
//                         }}
//                       >
//                         O'chirish
//                       </Button>,
//                     ]}
//                   >
//                     <Text style={{ fontSize: "16px" }}>{todo.text}</Text>
//                   </List.Item>
//                 )}
//               />
//             )}

//             {state.todos.length === 0 && (
//               <div
//                 style={{
//                   textAlign: "center",
//                   padding: "40px",
//                   color: "#8c8c8c",
//                 }}
//               >
//                 <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
//                 <Text style={{ fontSize: "16px" }}>
//                   No todos yet. Add your first task!
//                 </Text>
//               </div>
//             )}
//           </Space>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Reducer;



import {
  Button,
  Input,
  List,
  Space,
  Card,
  Progress,
  Spin,
  Typography,
} from "antd";
import { useEffect, useReducer, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BgColorsOutlined,
  ReloadOutlined,
  SyncOutlined,
  PauseOutlined, // Added for stop button icon
} from "@ant-design/icons";

const { Title, Text } = Typography;

const antIcon = <SyncOutlined style={{ fontSize: 25, color: "black" }} spin />;

interface Todo {
  id: number;
  text: string;
}

interface State {
  count: number;
  value1: string;
  color: boolean;
  todos: Todo[];
  progress: number;
  loading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  count: 0,
  value1: "",
  color: false,
  todos: [],
  progress: 0,
  loading: true,
};

function reducer(state: State, action: Action): State {
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
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };
    case "update":
      return {
        ...state,
        todos: state.todos.map((todo: Todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case "progress":
      const newProgress = state.progress + 1;
      return {
        ...state,
        progress: newProgress >= 100 ? 100 : newProgress,
        loading: newProgress < 100,
      };
    case "resetProgress":
      return { ...state, progress: 0, loading: true };
    case "stopProgress": // Added new action for stopping progress
      return { ...state, loading: false };
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

  const handleEdit = (todo: Todo) => {
    setTodoInput(todo.text);
    setEditingId(todo.id);
  };

  useEffect(() => {
    if (!state.loading) return;

    const interval = setInterval(() => {
      dispatch({ type: "progress" });
    }, 800);
    return () => clearInterval(interval);
  }, [state.loading]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          gap: "30px"
        }}
      >
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto ">
          <div className="w-full mb-4">
            <Text strong className="text-gray-700 flex flex-col items-center justify-center">
              Progress
            </Text>
            <Progress
              percent={state.progress}
              status={state.progress === 100 ? "success" : "active"}
              strokeColor={{
                "0%": "red",
                "50%": "blue",
                "100%": "red",
              }}
              trailColor="#e8ecef"
              showInfo={true}
              className="mt-2"
            />
          </div>

          {/* Loading, Stop, or Restart Button */}
          {state.loading ? (
            <div
            style={{ display: "flex", alignItems: "center", gap: "10px" }} 
            >
              <Spin indicator={antIcon} />
              {/* <Text className="text-black-500">loading...</Text> */}
              <Button
                type="primary"
                icon={<PauseOutlined />}
                onClick={() => dispatch({ type: "stopProgress" })}
                className="rounded-lg"
                style={{
                  background: "linear-gradient(45deg, #fa8c16, #ffc53d)",
                  border: "none",
                }}
              >
                Stop
              </Button>
            </div>
          ) : (
            <Button
              type="primary"
              danger
              icon={<ReloadOutlined />}
              onClick={() => dispatch({ type: "resetProgress" })}
              className="rounded-lg"
            >
              Restart
            </Button>
          )}
        </div>
        <br />

        {/* Counter Section */}
        <Card
          style={{
            marginBottom: "24px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "none",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Title
              level={2}
              style={{
                color: state.color ? "#0000" : "#f5222d",
                marginBottom: "20px",
                fontSize: "2.5rem",
                fontWeight: "bold",
                transition: "color 0.3s ease",
              }}
            >
              🔢 Count: {state.count}
            </Title>

            <Space size="large" wrap>
              <Button
                size="large"
                type="primary"
                onClick={() => dispatch({ type: "incremnet" })}
                style={{
                  borderRadius: "25px",
                  minWidth: "60px",
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #52c41a, #73d13d)",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(82, 196, 26, 0.4)",
                }}
              >
                +
              </Button>
              <Button
                size="large"
                type="primary"
                danger
                onClick={() => dispatch({ type: "decremnet" })}
                style={{
                  borderRadius: "25px",
                  minWidth: "60px",
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(245, 34, 45, 0.4)",
                }}
              >
                -
              </Button>
              <Button
                size="large"
                icon={<BgColorsOutlined />}
                onClick={() => dispatch({ type: "toggleColor" })}
                style={{
                  borderRadius: "25px",
                  height: "50px",
                  background: "linear-gradient(45deg, #722ed1, #b37feb)",
                  color: "white",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(114, 46, 209, 0.4)",
                }}
              >
                Change color
              </Button>
            </Space>
          </div>
        </Card>

        {/* Name Input Section */}
        <Card
          style={{
            marginBottom: "24px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "none",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
              👤 Name Input
            </Title>
            <Input
              placeholder="Enter your name..."
              value={state.value1}
              onChange={(e) =>
                dispatch({ type: "inputValue", payload: e.target.value })
              }
              size="large"
              style={{
                borderRadius: "12px",
                fontSize: "16px",
                padding: "12px 16px",
              }}
            />
            {state.value1 && (
              <div
                style={{
                  padding: "16px",
                  background: "linear-gradient(45deg, #ff9a9e, #fecfef)",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#722ed1",
                  }}
                >
                  Hello, {state.value1}! 👋
                </Text>
              </div>
            )}
          </Space>
        </Card>

        {/* Todo Section */}
        <Card
          style={{
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "none",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Title level={3} style={{ marginBottom: "20px", color: "#1890ff" }}>
            📝 Todo Manager
          </Title>

          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="Enter your todo..."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                size="large"
                style={{
                  borderRadius: "12px 0 0 12px",
                  fontSize: "16px",
                }}
                onPressEnter={handleAddUpdate}
              />
              <Button
                type="primary"
                onClick={handleAddUpdate}
                size="large"
                icon={editongId !== null ? <EditOutlined /> : <PlusOutlined />}
                style={{
                  borderRadius: "0 12px 12px 0",
                  background:
                    editongId !== null
                      ? "linear-gradient(45deg, #fa8c16, #ffc53d)"
                      : "linear-gradient(45deg, #1890ff, #40a9ff)",
                  border: "none",
                  minWidth: "120px",
                }}
              >
                {editongId !== null ? "Update" : "Add"}
              </Button>
            </Space.Compact>

            {state.todos.length > 0 && (
              <List
                bordered={false}
                dataSource={state.todos}
                style={{
                  background: "rgba(240, 242, 245, 0.5)",
                  borderRadius: "12px",
                  padding: "8px",
                }}
                renderItem={(todo: Todo) => (
                  <List.Item
                    style={{
                      background: "white",
                      margin: "8px 0",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      padding: "16px",
                    }}
                    actions={[
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(todo)}
                        style={{
                          color: "#1890ff",
                          borderRadius: "6px",
                        }}
                      >
                        Edit
                      </Button>,
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          dispatch({ type: "delete", payload: todo.id })
                        }
                        style={{
                          borderRadius: "6px",
                        }}
                      >
                        O'chirish
                      </Button>,
                    ]}
                  >
                    <Text style={{ fontSize: "16px" }}>{todo.text}</Text>
                  </List.Item>
                )}
              />
            )}

            {state.todos.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#8c8c8c",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
                <Text style={{ fontSize: "16px" }}>
                  No todos yet. Add your first task!
                </Text>
              </div>
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Reducer;