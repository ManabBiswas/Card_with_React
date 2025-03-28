import React from 'react';
import Background from './Components/Background';
import Foreground from './Components/Foreground';

const App = () => {

  return (
    <>
     <div className="w-full h-screen bg-zinc-600 ">
     {/* <div className="w-full py-2 flex items-center text-gray-50 font-semibold text-lg bg-gray-400/20 z-20 absolute top-2.5 m-0.5 px-auto">
         This is My Navbar
       </div> */}
        <Background />
        <Foreground />
      </div>
    </>
  );
};

export default App;