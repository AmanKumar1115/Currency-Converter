import {InputBox} from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { useState } from 'react';



function App() {

  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () =>{
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  } 

  const convert =()=>{
    setConvertedAmount(amount*currencyInfo[to]);
  }
 

  return (
        <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(' https://render.fineartamerica.com/images/rendered/wall-view/medium/room002/framed-print/images/artworkimages/medium/1/3-water-drops-blink-images.jpg?printWidth=10&printHeight=6.5&frameId=CRQ13&mat1Id=PM918&mat2Id=&matWidthTop=2&matWidthBottom=2&matWidthLeft=2&matWidthRight=2&matOffset=0.5&frameWidth=0.875')`,
        }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          convert(); 
                        }}
                    >
                        <div className="w-full mb-1" >
                            <InputBox
                                label="From"
                                amount={amount}
                                currentOptions={options}
                                // eslint-disable-next-line no-unused-vars
                                onCurrencyChange={(currency)=> setAmount(amount)}
                                selectCurrency={from}
                                onAmountChange={(amount)=> setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4" >
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currentOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
