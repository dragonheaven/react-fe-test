import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { isLoading } = useSelector((state) => state.reportsState);

  return (
    <div className="w-screen fixed top-0 h-16 bg-primary z-10">
      <div className="w-full h-full flex justify-left items-center p-4">
        <span className="text-3xl text-white">Reports</span>
        <div className="flex-1" />
      </div>
      <div className="relative w-full bg-second">
        <div className={isLoading ? 'w-full h-1.5 shim' : 'vw-full h-1.5'} />
      </div>
    </div>
  );
};

export default Header;
