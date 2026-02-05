import "./App.css";
import { useState } from "react";

function App() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      icon: "ri-todo-line text-xl text-white",
      items: [
        { id: "1", content: "Market research" },
        { id: "2", content: "Write Projects" },
      ],
    },

    inProgress: {
      name: "In Progress",
      icon: "ri-time-line text-xl text-white",
      items: [{ id: "3", content: "Desing UI mockups" }],
    },

    done: {
      name: "Done",
      icon: "ri-checkbox-circle-line text-xl text-white",
      items: [{ id: "4", content: "Set up repository" }],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumns, setActiveColumns] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = () => {
    if (newTask.trim() === "") return;

    const updatedColumns = { ...columns };

    updatedColumns[activeColumns].items.push({
      id: Date.now().toString(),
      content: newTask,
    });

    setColumns(updatedColumns);
    setNewTask("");
  };

  const removeTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };

    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (item) => item.id !== taskId,
    );

    setColumns(updatedColumns);
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { columnId: sourceColumnId, item } = draggedItem;

    if (sourceColumnId === columnId) return;

    const updatedColumns = { ...columns };

    updatedColumns[sourceColumnId].items = updatedColumns[
      sourceColumnId
    ].items.filter((i) => i.id != item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <section className="py-8 px-4">
          <form className="max-w-2xl mx-auto">
            <h1 className="mb-10 text-center text-5xl md:text-6xl font-extrabold tracking-wide text-white">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Kenban App
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="text"
                placeholder="Enter task..."
                className="flex-1 w-full sm:w-auto px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm placeholder-gray-500"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNewTask()}
              />

              <select
                className="w-full sm:w-auto px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm cursor-pointer"
                value={activeColumns}
                onChange={(e) => setActiveColumns(e.target.value)}
              >
                {Object.keys(columns).map((columnId) => (
                  <option value={columnId} key={columnId}>
                    {columns[columnId].name}
                  </option>
                ))}

              </select>

              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={addNewTask}
              >
                <i className="ri-add-line text-lg"></i>
                Add Task
              </button>
            </div>
          </form>
        </section>

        <div className="px-4 py-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(columns).map(([columnId, column]) => (
              <section
                key={columnId}
                className="min-w-[300px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, columnId)}
              >
                <div className="bg-gray-800/50 rounded-xl p-6 h-full border border-gray-700">

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600">
                        <i className={column.icon}></i>
                      </div>
                      <h2 className="text-xl font-semibold text-white">
                        {column.name}
                      </h2>
                    </div>

                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      {column.items.length}
                    </span>
                  </div>

                  
                  <div className="min-h-[400px] space-y-3">
                    {column.items.length === 0 ? (
                      <p className="text-center text-gray-500 italic text-sm">
                        Drop tasks here
                      </p>
                    ) : (
                      column.items.map((item) => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(columnId, item)}
                          className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="flex-1 text-white text-sm">
                              {item.content}
                            </span>

                            <div className="flex gap-2">
                              <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-teal-400 rounded">
                                <i className="ri-edit-line"></i>
                              </button>
                              <button
                                onClick={() => removeTask(columnId, item.id)}
                                className="w-8 h-8 bg-gray-700 hover:bg-red-600 text-red-400 hover:text-white rounded"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
