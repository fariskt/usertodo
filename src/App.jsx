import "./App.css";
import TodoList from "./Components/TodoList";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <TodoList />
      </Provider>
    </>
  );
}

export default App;
