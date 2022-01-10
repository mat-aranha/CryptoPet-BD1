import React, { useRef, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import './style.css';
const API_URL = 'http://localhost:4000';

let x = 0;
let y = 0;

const ITEMS = [
  {
    id: 1,
    frequency: x,
    price: ethers.utils.parseEther(y.toString())
  }, 
  {
    id: 2,
    frequency: x, 
    price: ethers.utils.parseEther(y.toString())
  },
  {
    id: 3,
    frequency: x, 
    price: ethers.utils.parseEther(y.toString())
  }

];

function Store({ paymentProcessor, dai }) {
  const buy = async item => {
    const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);

    const tx1 = await dai.approve(paymentProcessor.address, item.price);  
    await tx1.wait();

    const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId);
    const receipt = await tx2.wait();

    await new Promise(resolve => setTimeout(resolve, 5000)); 
    const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`);
    console.log(response2);
  };


  const frequencyInputRef = useRef();
  let [y, yafter] = useState(0);

  function submitHandler(event) {
    event.preventDefault();
    const enteredFrequency = frequencyInputRef.current.value;
    x = enteredFrequency;
    let z = 0;

    if(x < 5) {
      z = 10 * x;
    } else if(x < 15) {
      z = 7 * x;
    } else {
      z = 5 * x;
    };

    yafter(z);

    for (let i = 0; i < 3; i++) {
      ITEMS[i].price = ethers.utils.parseEther(z.toString());
      ITEMS[i].frequency = x;
    }

  }


  return (

    <> 
    <div>
      {y}
    </div>
    
    <form onSubmit={submitHandler}>
        <label for="frequencia">Selecione a frequência: </label>
        <input type="number" id='frequencia' ref={frequencyInputRef}/>
        <input style={{backgroundColor:'darkcyan', border: 'solid cyan', color:'black'}} type="submit" value="Confirmar"/>
      </form>
      
    <hr/>
    <ul className="list-group" style={{
      backgroundColor: 'black'
    }}>
      <li className="list-group-item" style={{fontSize:'200%', color: 'dodgerblue', backgroundColor: 'black'}}>
        Adestrador de Cães - <span className='font-weight-bold'>{y} DAI</span>
        <button 
          onClick={() => buy(ITEMS[0])}
        >
          Contratar
        </button>
      </li>
      <li className="list-group-item" style={{fontSize:'200%', color: 'dodgerblue', backgroundColor: 'black' }}>
        Pet Hotel - <span className='font-weight-bold'>{y} DAI</span>
        <button 
          onClick={() => buy(ITEMS[1])}
        >
          Contratar
        </button>
      </li>
      <li className="list-group-item" style={{ fontSize:'200%', color: 'dodgerblue', backgroundColor: 'black' }}>
        Passeador de Cães - <span className='font-weight-bold'>{y} DAI         </span>
        <button
          onClick={() => buy(ITEMS[2])}
        >
          Contratar
        </button>
      </li>
    </ul></>
  );
}

export default Store;