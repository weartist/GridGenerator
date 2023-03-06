import { useState } from 'react';


import "./Popup.css";


// interface PopupProps {
//     clickedChild: typeof Button;
// }


interface response {
    filePath: string
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number
    /** 临时文件路径。没传入 filePath 指定文件存储路径时会返回，下载后的文件会存储到一个临时文件 */
    tempFilePath: string
    /** 调用结果 */
    errMsg: string
}

function showToast(title: string, duration = 2000) {

}

const Popup: React.FC<{ isOpen: boolean, closeHandle: (handle: string) => void }> = ({ isOpen, closeHandle}) => {

    const [imageURL, setImageURL] = useState<string>("");
    
    function handleClick() {
        closeHandle("");
    }



    function handleAlbum () {

    }

    function handleImageUrl() {
        if (!imageURL || imageURL.length == 0) {
            showToast("图片链接不能为空");
        } else {

        }


    }
    return (
      <div className={`popup ${isOpen ? "active" : ""}`}>
        <div className="popup-bg">
        <div className="popup-content">
          {/* <Text className="margin-items">请上传图片，或复制图片链接进行导入</Text> */}
          {/* <Text className="margin-items">建议在豆瓣搜索相应条目保存封面图片</Text> */}
          

          {/* <Button className="margin-items subView" onClick={handleClick}>
            上传图片
          </Button> */}

            {/* <div className="submitURL subView">
                <Input className="submit-title" id="imageURLInput" placeholder="粘贴图片地址" onBlur={finishInput} onInput={handleOnInput}/>
                <Button className="submit-button" onClick={handleImageUrl}>提交</Button>
            </div> */}

            {/* <Button className="margin-items subView" onClick={handleAlbum}>选择相册图片</Button>
            
          <Button className="margin-items subView" onClick={handleClick}>
            清除当前选择内容
          </Button>

          <Button className="margin-items subView" onClick={() => closeHandle("hhhh")}>
            关闭
          </Button> */}
          </div>
        </div>
      </div>
    );
  };
  

  export default Popup;
