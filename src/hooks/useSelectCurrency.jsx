import { Fragment, useState } from 'react';
import styled from '@emotion/styled';


const useSelectCurrency = ( dataCurrency, options ) => {

  const { name, identifier } = dataCurrency;

  const [ state, setState ] = useState('');
  
  const Label = styled.label`
    display: block;
    color: #ffffff;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
  `;

  const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
  `;

  const SelectCurrency = () => {
    return (
      <Fragment>
        <Label htmlFor={identifier}>{ name }</Label>
        <Select 
          id={identifier}
          value={state}
          onChange={ (event) => setState(event.target.value) }
        >
          <option value=''>Seleccione</option>
          { options.map( option => (
            <option 
              key={option.id}
              value={option.id}
            >{ option.name }</option>
          ))}
        </Select>
      </Fragment>
    )
  }

  return [ state, SelectCurrency ];
}
 
export default useSelectCurrency;