import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Fragment } from 'react';
import Spinner from './Spinner';

const Container = styled.div`
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;  

const Text = styled.p`
  font-size: 18px;
  margin-bottom: .5rem;

  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 24px;
  margin-bottom: .5rem;

  span {
    font-weight: 700;
  }
`;

const Image = styled.img`
  display: block;
  width: 120px;
`;

const Result = ({ quotation, loading, setLoading }) => {

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = quotation;

  return (  
    <Fragment>
      { loading && <Spinner /> }
      { Object.keys(quotation).length !== 0 && 
        <Container style={{ 'display': loading === true ? 'none' : 'grid' }}>
          <Image 
            src={`https://cryptocompare.com/${IMAGEURL}`} 
            alt="cryptocurrency" 
            onLoad={ () => setLoading(false) }
          />
          <div>
            <Price>El precio es de: <span>{ PRICE }</span></Price>
            <Text>Precio más alto del día: <span>{ HIGHDAY }</span></Text>
            <Text>Precio más bajo del día: <span>{ LOWDAY }</span></Text>
            <Text>Variación últimas 24 horas: <span>{ CHANGEPCT24HOUR }</span></Text>
            <Text>Última actualizacion: <span>{ LASTUPDATE }</span></Text>
          </div> 
        </Container>
      }
    </Fragment>
  );
}

Result.propTypes = {
  quotation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func
}
 
export default Result;