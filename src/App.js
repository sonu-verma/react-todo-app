import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from './components/About';

function App() {
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    const getTask = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer)
    }
    getTask()
  },[]);

  const fetchTasks = async () => {
    const result = await fetch("http://localhost:5000/tasks");
    const data = await result.json()
    return data;
  }

  // Delete task from array
  const onDelete =async (id) => {
    // await fetch(`https://localhost:5000/tasks/${id}`,{
    //   method: 'DELETE'
    // })
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    });
  
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  // on double click set value
  const toggleReminder = async (id) => {
    const fetchToToggle = await toggleTasks(id);
      
      const updateTask =  {...fetchToToggle,reminder: !fetchToToggle.reminder};
      
      const response = await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(updateTask)
      })

      const data = await response.json();

      setTasks(
          tasks.map(
              (task) => 
                task.id === id ? 
                {...task,reminder: 
                  data.reminder } : task 
          )
      )
  }

  const toggleTasks = async (id) => {
    const result = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await result.json()
    return data;
  }
  // save form data
  const addTask = async (task) => {
        const response = await fetch('http://localhost:5000/tasks',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task),
      })
      const data = await response.json();
      setTasks([...tasks, data])

      // const id = Math.floor(Math.random() * 10000)+1;
      // const newTask = {id, ...task}
      // setTasks([...tasks,newTask])
      
    
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask) } showAddTask = {showAddTask}/>
        
          <Route path="/" exact render={
            (props) => (
              <>
              { showAddTask ? <AddTask addTask = {addTask} /> : '' }
            {tasks.length > 0 ? 
              <Tasks tasks={tasks} onDelete = {onDelete} onToggle={toggleReminder} /> : "No Task Found." 
            }
              </>
            )
          }>
            
          </Route>
          <Route path="/about" component= {About} />
          <Footer />
      </div>
    </Router>
 
  );
}

export default App;
