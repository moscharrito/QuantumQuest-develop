import React, { useState } from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function BoardPage() {
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', title: 'Design Login Flow', assignee: 'Kennedy' },
        { id: '2', title: 'Set up DB schema', assignee: 'Saheel' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [
        { id: '3', title: 'Frontend Landing Page', assignee: 'Moshood' },
      ],
    },
    review: {
      name: 'Review',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
  });

  function onDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      const destItems = [...destCol.items];
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  }

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      assignee: newTaskAssignee || 'Unassigned',
    };
    setColumns((prev) => {
      const updatedTodo = { ...prev.todo };
      updatedTodo.items = [...updatedTodo.items, newTask];
      return { ...prev, todo: updatedTodo };
    });
    setNewTaskTitle('');
    setNewTaskAssignee('');
    setShowNewTask(false);
  };

  return (
    <TaskLayout title="Kanban Board">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <button
          onClick={() => setShowNewTask(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Create Task
        </button>
      </div>
      {showNewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-sm">
            <h4 className="text-xl font-bold mb-4">New Task</h4>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Assignee"
              className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
            />
            <div className="text-right">
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setShowNewTask(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(columns).map(([colId, col]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided, snapshot) => (
                <div
                  className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow min-h-[500px] ${
                    snapshot.isDraggingOver ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">
                    {col.name}
                  </h2>
                  {col.items.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={`bg-white dark:bg-gray-700 p-3 mb-2 rounded shadow cursor-move ${
                            snapshot.isDragging ? 'opacity-80' : ''
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            Assignee: {task.assignee}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </TaskLayout>
  );
}