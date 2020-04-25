import React, {Fragment} from 'react';
import Pizza from './Pizza/Pizza';
import Footer from './Footer/Footer';

const Pizzas = () => {
  
  return(
    <Fragment>
      <div style={{marginTop: "100px"}}>
        <Pizza 
          src="/assets/images/pizza1.jpg"
          pizzaType="Pizza Type 1" price={5}/>

        <Pizza 
          src="/assets/images/pizza2.png"
          pizzaType="Pizza Type 2" price={3.5}/>

        <Pizza 
          src="/assets/images/pizza3.png"
          pizzaType="Pizza Type 3" price={10}/>

        <Pizza 
          src="/assets/images/pizza4.png"
          pizzaType="Pizza Type 4" price={4}/>

        <Pizza 
          src="/assets/images/pizza5.png"
          pizzaType="Pizza Type 5" price={7.5}/>

        <Pizza 
          src="/assets/images/pizza6.png"
          pizzaType="Pizza Type 6" price={6}/>

        <Pizza 
          src="/assets/images/pizza3.png"
          pizzaType="Pizza Type 7" price={9}/>

        <Pizza 
          src="/assets/images/pizza2.png"
          pizzaType="Pizza Type 8" price={8}/>
      </div>
      
      <Footer />
    </Fragment>
  );
};

export default Pizzas;