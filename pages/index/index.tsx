import React, { Component } from 'react'
import Card from '../components/card'


export default class Index extends Component {
  state = {
    msg: 'Hello Hans12',
  }


  handleMusicClick = () => {

  }

  handleBookClick = () => {




    // console.log("hans jump");
    // Taro.navigateTo({ url: '/pages/details/music' })
  }

  handleGameClick = () => {
  }



  componentDidShow() {}

  componentDidHide() {}


  render() {
    return (
      <div className='index'>
        {/* <Card></Card> */}
        <button onClick={this.handleMusicClick}>音乐生涯喜好表</button>
        <button onClick={this.handleGameClick}>游戏生涯喜好表</button>
        <button id='screen' onClick={this.handleBookClick}>书籍生涯喜好表</button>


        <div className="share__canvas share__canvas1">
            <div className="share__canvas1-text draw_canvas" 
                data-type="text" data-text="这是一段无边距文字">
                这是一段无边距文字
            </div>
        </div>
      </div>
    )
  }
}
