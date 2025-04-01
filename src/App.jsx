import React from 'react';
import Background from './Components/Background';
import Foreground from './Components/Foreground';

const App = () => {

  return (
    <>
     <div className="w-full h-screen bg-zinc-600 ">
     <div className="w-full py-2 flex items-center text-gray-50 font-semibold text-lg bg-gray-400/20 z-20 absolute top-2.5 mb-0.5 px-auto">
     <nav className="w-full py-3 px-6 flex items-center justify-between bg-gray-800 text-gray-100 fixed top-0 left-0 z-50 shadow-md">
      
      <div className="text-2xl font-bold text-purple-400"><img src='./icon.png' className='h-12 w-12 rounded-2xl'/>
      {/* <Link></Link> */}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-xl transition duration-200">
          Save Now
        </button>
        
      </div>
    </nav>

       </div> 
        <Background />
        <Foreground />
      </div>
    </>
  );
};

export default App;