import React from 'react'

export default function Field({field, index, handleMouseExit, handleMouseEnter,output, setOutput, level, keySoFar}) {
  const handleInputChange = (e, output, field, keySoFar) => {
    if (keySoFar)
    setOutput(
      {
        ...output,
        [keySoFar]: {
          ...[keySoFar],
          [field.jsonKey]: e.currentTarget.value
        }
      }
    )
    else
    setOutput(
      {
        ...output,
        [field.jsonKey]: e.currentTarget.value
      }
    )
  }
    if (field.validate && field.validate.required) {
      if (field.uiType === "Input" || field.uiType === "Number") {
        return (
          <div key={`reqfield${index}`} className="rounded-md bg-violet-50 p-4 grid grid-cols-2 border border-violet-200">
            <label htmlFor={field.jsonKey} className='my-auto font-bold flex items-center'>{field.label}<p className='text-red-400'>*</p>{field.description && field.description.length ? (
              <>
                <span onMouseLeave={() => handleMouseExit(index)} onMouseEnter={() => handleMouseEnter(index)} className='ml-3 text-sm h-min px-2 bg-violet-200 relative rounded-full cursor-help'>
                  i
                  <div id={`desc-hover-${index}`} className={`px-2 bottom-0 w-max h-fit top-0 xl:max-w-[20rem] lg:max-w-[16rem] max-w-[12rem] my-auto left-0 absolute ml-9 invisible rounded-md bg-white border-violet-200 border flex flex-col justify-center font-light text-sm`}>
                    <p className='font-bold'>{field.label}</p>
                    <p className='mt-1'>{field.description}</p>
                  </div>
                </span>
              </>
            ) : null}</label>
            <input type={field.uiType === "Input" ? "text" : field.uiType === "Number" ? "number" : ""} id={field.jsonKey} onInput={e => handleInputChange(e, output, field, keySoFar)} readOnly={field.immutable} placeholder={field.placeholder} required={field.validate ? field.validate.required : null} className='rounded-md border-violet-400 border bg-violet-200 p-2' name={field.jsonKey}></input>
          </div>
        )
      }
      else if (field.uiType === "Radio") {
        return (
          <div key={`reqfield${index}`} className="rounded-md bg-violet-50 p-4 border border-violet-200">
            <div className={`radio-group gap-3 grid grid-cols-${field.validate.options.length}`}>
              {field.validate.options.map((option, optindex) => {
                return (
                  <div key={optindex}>
                    <input type="radio" id={`${field.label}radio${optindex}`} name="radios" value={option.value} checked={output[keySoFar] ? output[keySoFar][field.jsonKey]===option.value : output[field.jsonKey]===option.value} onChange={e => handleInputChange(e, output, field, keySoFar)} />
                    <label className='rounded-md text-center p-4' htmlFor={`${field.label}radio${optindex}`}>{option.label}</label>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
      else if (field.uiType === "Group") {
        return (
          <div key={`reqfield${index}`} className="rounded-md bg-violet-50 p-4 border border-violet-200">
            <h2 className='my-auto font-bold flex items-center font-bold pb-2 border-slate-300 border-b'>{field.label}{field.description.length ? (
              <>
                <span onMouseLeave={() => handleMouseExit(index)} onMouseEnter={() => handleMouseEnter(index)} className='ml-3 text-sm h-min px-2 bg-violet-200 relative rounded-full cursor-help'>
                  i
                  <div id={`desc-hover-${index}`} className={`px-2 bottom-0 w-max h-fit top-0 xl:max-w-[20rem] lg:max-w-[16rem] max-w-[12rem] my-auto left-0 absolute ml-9 invisible rounded-md bg-white border-violet-200 border flex flex-col justify-center font-light text-sm`}>
                    <p className='font-bold'>{field.label}</p>
                    <p className='mt-1'>{field.description}</p>
                  </div>
                </span>
              </>
            ) : null}</h2>
            <div className="mt-3 flex flex-col gap-4">
              {field.subParameters.sort((a,b) => parseInt(a.sort) - parseInt(b.sort)).map((subParam, index) => {
                return (
                  <Field field={subParam} index={index} handleMouseEnter={handleMouseEnter} handleMouseExit={handleMouseExit} output={output} setOutput={setOutput} level={subParam.level} keySoFar={keySoFar ? keySoFar+"."+field.jsonKey : field.jsonKey} />
                )
              })}
            </div>
          </div>
        )
      }
    } else return null;
}
