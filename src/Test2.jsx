import React from 'react'
import { useState, useEffect } from 'react'
import data from "../data.json"

const Test2 = () => {

  console.log(data)
  const [value, setValue] = useState(false);
  const [prdoucts, setProducts] = useState([]);

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }

  useEffect(() => {
    console.log("Componente montado");
    getProducts().then((data) => {
      setProducts(data)
    })
  }, []);

  return (
    <div>
      {
        prdoucts.map((item) => {
          return (
            <div>
              <p>{item.first_name}</p>
              <p>{item.last_name}</p>
              <p>{item.email}</p>
              <img src={item.image} alt='item.image' />
            </div>
          )
        })
      }

    </div>
  )
}

export default Test2
