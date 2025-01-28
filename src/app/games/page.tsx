"use client"
import React, { useState, useEffect } from 'react';
import SlotMachineList from '../../components/ui/SmallDiplomalist';
import SmallGameslist from '../../components/ui/SmallGameslist';

const Yourcertificates = () => {




  return (
    <>
      <div className="p-9 bg-black h-screen flex flex-col justify-center items-center">

          <>
            <SlotMachineList />
            <SmallGameslist />
            <div className="h-40"></div>
          </>

      </div>
    </>
  );
};

export default Yourcertificates;
