import { useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'

function App() {
  const [items, setItems] = useState([
    {id:nanoid(), name:'Hat',quantity:2},
    {id:nanoid(), name:'Tie',quantity:2},
    {id:nanoid(), name:'Belt',quantity:1}

  ])
  let itemCount = 0;
  for (const item of items) {
    if (item && item.quantity){
      itemCount += item.quantity
    }
  }

  function onNameChange(evt, item){
    const newItems = [...items];
    const index = items.indexOf(item);
    newItems[index].name = evt.target.value;
    setItems(newItems)
  }

  function onAddQuantity(evt, item){
    const newItems = [...items];
    const index = items.indexOf(item);
    newItems[index].quantity++;
    setItems(newItems)
  }

  function onRemoveQuantity(evt,item){
    const newQuantity = item.quantity - 1
    if (newQuantity > 0) {
      const newItems = [...items];
      const index = items.indexOf(item);
      newItems[index].quantity--;
      setItems(newItems)
    } else {
      setItems(items.filter(i => i.id !== item.id))
    }
  }

  return (
    <div className='p-3 container'>
      <div className='flex'>
        <h1 className='text-8xl font-bold mr-9'>Shopping Cart</h1>
        <p className='text-8xl bg-blue-500 z-40 p-3 border rounded-full border-white'>{itemCount > 0 ? itemCount : "Add Items to Cart"}</p>
      </div>
      <button type="button" className='mb-7 scale-150 px-3 py-2 cursor-pointer transition delay-75 shadow-md ease-in-out bg-blue-500 shadow-cyan-500/50 rounded-3xl hover:-translate-y-1 ml-10' onClick={() => setItems([...items, {id:nanoid(), name:'', quantity:1}])}>Add Item</button>

      {items.map(item => 
        <div className='flex row border-t-3 py-4' key={item.id}>
          <div className='col-4'>
            <input type='text' className={item.name.length > 0 ? 'form-control border-2 mr-2 is-valid': 'is-invalid border-2 mr-2'} value={item.name} onChange={(evt) => onNameChange(evt,item)} />
          </div>
          <div className='col-1'>
            <span>{item.quantity}</span>
          </div>
          <div className='col-4'>
            <button className='mx-2 px-2 py-.5 cursor-pointer transition delay-75 shadow-md ease-in-out bg-red-500 shadow-cyan-500/50 rounded-3xl hover:-translate-y-1' disabled={item.quantity <= 0 ? true : false} onClick={(evt) => onRemoveQuantity(evt,item)}>-</button>
            <button className='mx-2 px-2 py-.5 cursor-pointer transition delay-75 shadow-md ease-in-out bg-green-500 shadow-cyan-500/50 rounded-3xl hover:-translate-y-1' disabled={item.quantity >= 10 ? true : false} onClick={(evt) => onAddQuantity(evt,item)}>+</button>
          </div>
        </div>
      )}
    
    </div>
  )
}

export default App
