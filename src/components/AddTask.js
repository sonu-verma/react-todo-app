import { useState } from 'react'

const AddTask = ({addTask}) => {
    const [text,setText]  = useState('');
    const [day,setDay]  = useState('');
    const [reminder,setReminder]  = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text){
            alert('Please enter task name');
            return false;
        }

        addTask({ text, day, reminder});

        setText('');
        setDay('');
        setReminder(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}> 
            <div className="form-control">
                <label htmlFor="task_name">Task Name</label>
                <input id="task_name" type="text" placeholder="add Task"  value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div className="form-control">
                <label htmlFor="task_day">Task Day</label>
                <input id="task_day" type="text" placeholder="add Day"  value={day} onChange={(e) => setDay(e.target.value)} />
            </div>

            <div className="form-control form-control-check">
                <label >Remind Me</label>
                <input 
                    style={ {marginLeft: "-500px"}} 
                    type="checkbox" 
                    placeholder="Remind Me"  
                    value={reminder} 
                    checked = {reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} 
                />
            </div>
             
            <input type="submit" value="Save" className="btn btn-block" />  
            
        </form>
    )
}

export default AddTask