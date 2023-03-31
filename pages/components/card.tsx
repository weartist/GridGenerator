import React from 'react'
import { useState } from 'react';

// import Popup from './Popup';

import Image from 'next/image';
import { read } from 'fs';
// import '@/styles/card.css'

import EditableText from './Title';
import Config from '../api/config';


interface Props {
  title: string;
  clickHand: (index: number) => void;
  row: number;
  cow: number;
}




// const Popup: React.FC<{ isOpen: boolean, closeHandle: (string) => void }> = ({ isOpen, closeHandle}) => {

const Card: React.FC<{ title: string, imgURL: string, clickHandle: (args0: number) => void, row: number }> = ({ title, imgURL, clickHandle, row }) => {

  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handlePopupOpen = () => {
    // setIsPopupOpen(true);
    console.log("hanssss");
  };

  // src="/thirteen.svg"
  const [imgData, setImgData] = useState('/cover1.png');

  const selectImg = () => {
    // let upimgs = document.getElementById("upimg")!
    // upimgs.click();
    clickHandle(row);
  }

  const imgStyle = {
    "width": Config.cardWidth,
    "height": Config.cardHeight
  }

  function previewFile() {
    let preview = document.getElementById("cover") as HTMLImageElement;
    const files = document.querySelector('input[type=file]') as HTMLInputElement;
    const file = files.files![0];
    const reader = new FileReader();

    reader.onloadend = function () {
      setImgData(reader.result!.toString());
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }

  const upChange = () => {
    previewFile();
  }
  

  return (
    <div>
      <div className='card column' style={imgStyle}>
        {imgURL.length > 0 &&
          <Image priority className='pics' id="cover" src={imgURL} alt="what ever" width={Config.cardWidth} height={Config.cardHeight - 100} onClick={selectImg} />
        }
        <input id='upimg' aria-label='input' type='file' className='inputs' accept='image/png' onChange={upChange} />
        <div className='line'></div>
        <EditableText initialText={title} name='card-title'></EditableText>
      </div>
    </div>
  );
};

export default Card;




{/* <div>
<Text>点击下面的按钮弹出蒙层</Text>
<Button onClick={handlePopupOpen}>弹出</Button>
<Popup isOpen={isPopupOpen} />
</div> */}

