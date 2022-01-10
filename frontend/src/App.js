import React, { useState, useEffect } from 'react';
import Store from './Store.js';
import getBlockchain from './ethereum.js';
import daiPhoto from './dai.jpg';
import './style.css';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
  const [dai, setDai] = useState(undefined); 

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  }, []);

  if(typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-1'>
          <h1>ERC20 Tokens Ecommerce App</h1>
          <p>You need to install the latest version of Metamask to use this app. MEtamask is an Ethereum wallet, available as a Google chrome extension.</p>
          <ul>
            <li>Go to the <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Metamask page</a> on the chrome webstore and install it</li>  
            <li>If you already have it installed, uninstall and re-install it</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <><header>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >Página de pagamento</h1>
      
    </header>

    <body style={{backgroundColor: 'black'}}>
      
      <div>
        <img src = {daiPhoto} style = {{width: '100%'}}/>
      </div>
      <hr/>
      
      <Store paymentProcessor={paymentProcessor} dai={dai} /> 

      <hr/>
      <h1 style={{color:'cyan'}}>*Após a confirmacão da transacão, basta enviar o comprovante a um de nossos contatos (localizados na página inicial) e agendar os servicos contratados!*</h1>
    </body>
    
    </>
    
  );
}

export default App;