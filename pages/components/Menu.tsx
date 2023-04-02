

const Menu: React.FC<{ isOpen: boolean, closeHandle: (handle: string) => void, updateHandle: (handle: string) => void, cleanHandle: () => void }> = ({ isOpen, closeHandle, updateHandle, cleanHandle}) => {

    function handleClick() {
        closeHandle("");
    }

    function click() {
        console.log({isOpen});
        let element = document.getElementById("returned")!;
        console.log(element.getAttribute('class'));
    }

    const selectImg = () => {
        let upimg = document.getElementById("upimg")!
        upimg.click();
    }

    function handleImageUrl() {
      const urls = document.querySelector('input[type=url]') as HTMLInputElement;
      const url = urls.value;
      console.log('url is ' + url);
      updateHandle(url)
    }
  
    function previewFile() {
      let preview = document.getElementById("cover") as HTMLImageElement;
      const files = document.querySelector('input[type=file]') as HTMLInputElement;
      const file = files.files![0];
      const reader = new FileReader();
    
      reader.onloadend = function () {
        // setImgData(reader.result!.toString());
        console.log("选择完成");
        updateHandle(reader.result!.toString());
      }
    
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  
    const upChange = () => {
      previewFile();
  }

    return (
      <div className={`menu${isOpen ? "-active" : ""}`}>
        <div className="menu-bg">
            <div className="menu-content">
                <h2 className="margin-items">请上传图片，或复制图片链接进行导入</h2>
                <h2 className="margin-items">建议在豆瓣搜索相应条目保存封面图片</h2>

                          {/* <button className="margin-items subView" onClick={handleClick}>
            上传图片
          </button> */}

            <div className="submit subView">
                <input className="submit-title" type='url' id="imageURLInput" placeholder="粘贴图片地址"></input>
                <button className="submitURL" onClick={handleImageUrl}>提交图片地址</button>
            </div>

            <button className="margin-items subView" onClick={selectImg}>选择相册图片</button>
            
          <button className="margin-items subView" onClick={() => cleanHandle()}>
            清除当前选择内容
          </button>

          <button className="margin-items subView" onClick={() => closeHandle("")}>
            关闭
          </button>
          <input id='upimg' aria-label='input' type='file' className='inputs' accept='image/png, image/jpeg, image/jpg' onChange={upChange} />

            </div>
        </div>
    </div>

    )

}

export default Menu;