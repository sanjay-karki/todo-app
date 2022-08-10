import React from 'react'

function Notify({notify, removeNotify, allTodos}) {
  const {notif, type} = notify
  React.useEffect(()=> {
    const timeout = setTimeout(() => {
      removeNotify();
    }, 3000)
    return () => clearTimeout(timeout)
  }, [allTodos])

  return (
    <div className='notif-container'>
    <p className={"notif notif-"+type} >{notif}</p>
    </div>
    
  )
}

export default Notify