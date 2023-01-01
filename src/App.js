import { useEffect, useState } from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import './App.css';
import Field from './Field';

function App() {
  const [schema, setSchema] = useState([])
  const [title, setTitle] = useState("Random Title")
  const [output, setOutput] = useState({})
  const [advFields, setAdvFields] = useState([])
  const [showingAdv, setShowingAdv] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    console.log(output)
  }

  const handleMouseEnter = (id) => {
    document.getElementById("desc-hover-"+id).classList.add("visible")
    document.getElementById("desc-hover-"+id).classList.remove("invisible")
  }
  const handleMouseExit = (id) => {
    document.getElementById("desc-hover-"+id).classList.remove("visible")
    document.getElementById("desc-hover-"+id).classList.add("invisible")
  }

  const checkJSON = (e) => {
    try {
      const o = JSON.parse(e.currentTarget.value);
      if (o && typeof o === "object") {
        setSchema(JSON.parse(e.currentTarget.value).fields);
        setTitle(JSON.parse(e.currentTarget.value).title);
        setAdvFields(JSON.parse(e.currentTarget.value).fields.filter(field => field.validate && !field.validate.required))
      }
      else setSchema([])
    } catch {
      setSchema([])
      return false;
    }
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 h-screen">
      <textarea placeholder='Enter JSON UI Schema Here' onInput={e => checkJSON(e)} style={{resize: "none"}} className='md:h-full h-[50vh]' />
      <div className='bg-violet-900 flex md:h-full h-[50vh] overflow-scroll'>
        {schema && schema.length ?
        <form onSubmit={e => handleSubmit(e)} className="w-full h-min form bg-white rounded-lg m-12 p-4">
          <h1 className='font-bold pb-2 border-slate-300 border-b'>{title}</h1>
          <div className="flex flex-col gap-4 mt-6">
            {schema.sort((a,b) => parseInt(a.sort) - parseInt(b.sort)).map((field, index) => {
              return (
                <Field field={field} index={index} handleMouseEnter={handleMouseEnter} handleMouseExit={handleMouseExit} output={output} setOutput={setOutput} />
              )
            })}
          </div>
          {showingAdv ?
          <div className="flex flex-col gap-4 mt-6">
            {advFields.sort((a,b) => parseInt(a.sort) - parseInt(b.sort)).map((field, index) => {
              return (
                <Field field={field} advancedField index={index} handleMouseEnter={handleMouseEnter} handleMouseExit={handleMouseExit} output={output} setOutput={setOutput} />
              )
            })}
          </div>
          : null}
          <div className="pt-4 mt-4 border-slate-300 border-t flex flex-row flex-wrap justify-between items-center">
            {advFields.length ?
            <span className='flex gap-3'>
              <label htmlFor='adv-fields' className='font-bold'>Show advanced fields</label>
              <Toggle
                className='toggle-bg'
                id='adv-fields'
                checked={showingAdv}
                onChange={() => setShowingAdv(!showingAdv)} />
            </span>
            : null}
            <div className="flex flex-row gap-2">
              <button type='button' className='px-2 py-1 h-min border text-violet-500 rounded-md border-violet-500'>Cancel</button>
              <button className='p-2 py-1 border h-min text-white rounded-md border-violet-500 bg-violet-500'>Submit</button>
            </div>
          </div>
        </form>
        : <p className='text-white m-auto'>Enter valid JSON.</p>
        }
      </div>
    </div>
  );
}

export default App;
