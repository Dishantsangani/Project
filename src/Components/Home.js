import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function Home() {
  const [todo, setTodo] = useState("");

  //  Stored in LocalStorage
  let todosFromlocalstoragev = localStorage.getItem("todos");
  const [todos, setTodos] = useState(
    todosFromlocalstoragev ? JSON.parse(todosFromlocalstoragev) : []
  );

  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const [showfinished, setsetshowfinished] = useState(true);

  //Toggle Button
  const togglefnished = () => {
    setsetshowfinished(!showfinished);
  };

  // Edit Button
  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
  };

  // Delete Button
  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  // Add Button
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Checkbox Button's
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  useEffect(() => {
    saveTols();
  }, [todos]);

  return (
    <>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-3xl ">
          iTask-Manage Your Todos At One Place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 mx-2 p-4 py-2 text-sm font-bold  text-white rounded-full "
            >
              Save
            </button>
          </div>
        </div>
        <input
          onChange={togglefnished}
          type="checkbox"
          checked={showfinished}
          className="my-4"
          id="show"
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos To Display</div>}
          {todos.map((item) => {
            return (
              (showfinished || item.isCompleted) && (
                <div key={item.id} className="todo flex  my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      name={item.id}
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-2"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold  text-white rounded-md mx-2"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
