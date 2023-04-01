import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import EditableText from './Title';

const Card: React.FC<{ title: string, imgURL: string, row: number, cardHeight: number, cardWidth: number, clickHandle: (args0: number) => void }> = ({ title, imgURL, row, cardHeight, cardWidth, clickHandle }) => {

  const [imgData, setImgData] = useState('/cover1.png');

  const selectImg = () => {
    clickHandle(row);
  }

  const imgStyle = {
    "width": cardWidth,
    "height": cardHeight + 30
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
      <div className='card column' style={imgStyle}>
        {imgURL.length > 0 &&
          <Image priority className='cardCover' src={imgURL} alt="what ever" width={cardWidth} height={cardHeight} onClick={selectImg} />
        }
        {/* <input id='upimg' aria-label='input' type='file' className='inputs' accept='image/png' onChange={upChange} /> */}
        <div className='line'></div>
        <EditableText initialText={title} name='card-title'></EditableText>
      </div>
  );
};

export default Card;




{/* <div>
<Text>点击下面的按钮弹出蒙层</Text>
<Button onClick={handlePopupOpen}>弹出</Button>
<Popup isOpen={isPopupOpen} />
</div> */}

