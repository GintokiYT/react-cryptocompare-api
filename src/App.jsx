import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Result from './components/Result';
import ImagenCripto from './assets/imagen-criptos.png'; 

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto;
  }
`;

const Contenedor = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;

  @media (width >= 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  display: block;
  width: 80%;
  max-width: 400px;
  margin: 100px auto 0 auto;
`;

const App = () => {

  const [ currencys, setCurrencys ] = useState({});
  const [ quotation, setQuotation ] = useState({});
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if(Object.keys(currencys).length !== 0) {
      const { currency, cryptocurrency } = currencys;

      const quoteCrypto = async () => {
        setLoading(true);
        setQuotation({});
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;

        await fetch(url)
        .then( res => res.json() )
        .then( data => {
          setQuotation(data.DISPLAY[cryptocurrency][currency]);
        })
        .catch( error => console.log(error));
      }
      quoteCrypto();
    }
  }, [currencys]);

  return (  
    <Contenedor>
      <Imagen 
        src={ImagenCripto} 
        alt='Imagen cripto'
      />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario 
          setCurrencys={setCurrencys}
        />
        
        <Result 
          quotation={quotation} 
          loading={loading} 
          setLoading={setLoading}
        /> 
      </div>
    </Contenedor>
  );
}
 
export default App;