import Logo from '@assets/RONALDOS_LOGO.png';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center ">
      <img
        src={Logo}
        alt="RONALDOS LOGO"
        className="w-48 sm:w-64 md:w-80 lg:w-96 animate-pulse"
      />
    </div>
  );
}
