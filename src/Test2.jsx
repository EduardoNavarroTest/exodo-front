import React from 'react'

const Test2 = () => {



    const [value, setValue] = useState(false);

    useEffect(() => {
        console.log("Componente montado");
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default Test2
