import Image from "next/image";


const ImagePreview: React.FC<{ isOpen: boolean, imageSrc: string, height: number, width: number, closeHandle: () => void,}> = ({ isOpen, imageSrc, height, width, closeHandle}) => {

    function handleClick() {
        closeHandle();
    }


    return (
      <div className={`preview${isOpen ? "-active" : ""}`}>
        <div className="preview-bg">
            <div className="preview-content">
                <Image className="preview-image" src={imageSrc} alt="what ever" width={width} height={height}/>
            </div>
        </div>
    </div>

    )

}

export default ImagePreview;