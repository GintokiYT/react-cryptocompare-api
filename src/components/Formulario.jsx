import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { currency } from '../data/currency';
import styled from '@emotion/styled';
import useSelectCurrency from '../hooks/useSelectCurrency';
import Error from './Error';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;

  &:hover {
    background-color: #7a7dfe;
  }
`;

const dataCurrency = {
  name: 'Elige tu moneda',
  identifier: 'currency'
};

const dataCryptoCurrency = {
  name: 'Elige tu criptomoneda',
  identifier: 'cryptocurrency'
};

const Formulario = ({ setCurrencys }) => {

  const [ cryptos, setCryptos ] = useState([]);
  const [ error, setError ] = useState(false);

  const [ stateCurrency, SelectCurrency ] = useSelectCurrency(dataCurrency, currency);
  const [ stateCryptoCurrency, SelectCryptoCurrency ] = useSelectCurrency(dataCryptoCurrency, cryptos);

  const handleSubmit = (event) => {
    event.preventDefault();

    if([stateCurrency, stateCryptoCurrency].includes('')) {
      return setError(true);
    }

    setError(false);
    setCurrencys({  
      currency: stateCurrency,
      cryptocurrency: stateCryptoCurrency
    })

  }

  useEffect(() => {
    const queryAPI = async () => {
      const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=usd';
      const response = await fetch(URL);
      const data = await response.json();
      const arrayCryptos = data.Data.map( ({ CoinInfo }) => {
        const { Name, FullName } = CoinInfo;
        return { id: Name, name: FullName }
      });
      setCryptos(arrayCryptos);
    }
    queryAPI();
  }, []);

  return (  
    <Fragment>
      { error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCryptoCurrency />
        <InputSubmit type='submit' value='cotizar' />
      </form>
    </Fragment>
  );
}

Formulario.propTypes = {
  setCurrencys: PropTypes.func
}
 
export default Formulario;