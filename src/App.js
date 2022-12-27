import { useState } from 'react';
import './App.css';

function App() {
  const [schema, setSchema] = useState([])
  const [title, setTitle] = useState("Random Title")
  const [output, setOutput] = useState({})

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

  return (
    <div className="grid grid-cols-2 h-screen">
      <textarea placeholder='Enter JSON UI Schema Here' onInput={e => {setSchema(JSON.parse(e.currentTarget.value))}} style={{resize: "none"}} className='h-full' />
      <div className='bg-violet-900'>
        <form onSubmit={e => handleSubmit(e)} className="form bg-white rounded-lg m-12 p-4">
          <h1 className='font-bold pb-2 border-slate-300 border-b'>{title}</h1>
          <div className="flex flex-col gap-4 mt-6">
            {schema.sort((a,b) => parseInt(a.sort) - parseInt(b.sort)).map((field, index) => {
              if (field.validate.required) {
                if (field.uiType === "Input") {
                  return (
                    <div key={`reqfield${index}`} className="rounded-md bg-violet-50 p-4 grid grid-cols-2 border border-violet-200">
                      <label htmlFor={field.jsonKey} className='my-auto font-bold flex items-center'>{field.label}<p className='text-red-400'>*</p>{field.description && field.description.length ? (
                        <>
                          <span onMouseLeave={() => handleMouseExit(index)} onMouseEnter={() => handleMouseEnter(index)} className='ml-3 text-sm h-min px-2 bg-violet-200 relative rounded-full'>
                            i
                            <div id={`desc-hover-${index}`} className={`px-2 bottom-0 w-max h-fit top-0 xl:max-w-[20rem] lg:max-w-[16rem] max-w-[12rem] my-auto left-0 absolute ml-9 invisible rounded-md bg-white border-violet-200 border flex flex-col justify-center font-light text-sm`}>
                              <p className='font-bold'>{field.label}</p>
                              <p className='mt-1'>{field.description} lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit</p>
                            </div>
                          </span>
                        </>
                      ) : null}</label>
                      <input id={field.jsonKey} onInput={e => setOutput({...output, [field.jsonKey]: e.currentTarget.value})} readOnly={field.immutable} placeholder={field.placeholder} required={field.validate ? field.validate.required : null} className='rounded-md border-violet-400 border bg-violet-200 p-2' name={field.jsonKey}></input>
                    </div>
                  )
                }
              } else return null;
            })}
          </div>
          <div className="pt-4 mt-4 border-slate-300 border-t flex flex-row flex-wrap justify-between items-center">
            <p className='font-bold'>Show advanced fields</p>
            <div className="flex flex-row gap-2">
              <button type='button' className='px-2 py-1 h-min border text-violet-500 rounded-md border-violet-500'>Cancel</button>
              <button className='p-2 py-1 border h-min text-white rounded-md border-violet-500 bg-violet-500'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
