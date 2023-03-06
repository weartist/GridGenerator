import { useState, useRef } from 'react'
import React, { Component } from 'react'

import Card from '../components/card'
import styles from '@/styles/Home.module.css'
import Menu from '../components/Menu'
// import '@/styles/music.css'

import DomToImage from 'dom-to-image'
import html2canvas from 'html2canvas'

interface Item {
	title: string;
	picURL: string;
}

function toast(title: string) {
	console.log(title);
}

function Miss() {

    const defaultImgUrl = '/cover1.png';
	let titles = ["最喜欢的", "最惊艳的", "最想安利的","最影响我的","听过最多的","最治愈的","听过最早的","爷青回", "它好小众我好爱","最喜欢的", "最惊艳的", "最想安利的","最影响我的","听过最多的","最治愈的","听过最早的","爷青回", "它好小众我好爱","最喜欢的", "最惊艳的", "最想安利的","最影响我的","听过最多的","最治愈的","听过最早的","爷青回", "它好小众我好爱"];
	let replaceTitles: Item[] = titles.map((title) => {
		return {title: title, picURL: defaultImgUrl}
	})

	const elementRef = useRef(null);


  function slices(arr: Item[], row: number) {
    var result: Item[][] = [];
    for (let index = 0; index < arr.length; index += row) {
      result.push(arr.slice(index, index + row));
    }
    return result
  }



  const saveScreenshot = () => {



}

	const [count, setCount] = useState(0);
	const [current ,setCurrent] = useState(0);
	const [banner, setBanner] = useState("默认文案");

	const [items, setItems] = useState<Item[]>(replaceTitles)



	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [urls, setUrls] = useState("默认提示");
	
	const handlePopupOpen = (index: number) => {
		console.log(index);
		setCurrent(index);
	  	setIsPopupOpen(true);
	};
  
	const handleImageSelected = (urls: string) => {
		setIsPopupOpen(false);
		console.log("选择的url是" + urls);
		let newliast = items.map((item, index) => {
			if (index == current) {
				return {title: item.title, picURL: urls};
			} else {
				return item;
			}
		})
	
		setItems(newliast);
	}

    const cleanImageSelected = () => {
		setIsPopupOpen(false);
		console.log("选择的url是" + urls);
		let newliast = items.map((item, index) => {
			if (index == current) {
				return {title: item.title, picURL: defaultImgUrl};
			} else {
				return item;
			}
		})
	
		setItems(newliast);
	}

	const handlePopupClose = (urls: string) => {
		
	  setIsPopupOpen(false);
		console.log("url is " + urls);
	};
	

	const nums = 3;
	const list = slices(items, nums).map((titles, key) => (
		<div className='lis' key={key}>
		{titles.map((item, index) => (
		  <Card title={item.title} imgURL={item.picURL} key={index} clickHandle={handlePopupOpen} row={key * nums + index}></Card>
		))}
		</div>
	  ))


	return (
		
		<div className={styles.main} id={styles.main}>
		<Menu isOpen={isPopupOpen} closeHandle={handlePopupClose} updateHandle={handleImageSelected} cleanHandle={cleanImageSelected}  />
			{/* <Canvas id='canvass'> */}
		<button className='saveBtn' onClick={saveScreenshot}>保存到本地</button>

		{/* <MovableArea id='screen' style='height: 100%; width: 100%; background: yellow;' scaleArea>
			<MovableView style='height: 100%; width: 100%; background: blue;' disabled scale onScale={scaleHandle} scaleMax={1} scaleMin={0.4}>
				{/* <ScrollView className='scrollview' scrollX scrollY  bounces={false} enhanced enableFlex> */}
          <div className='titles'>
          <span >音乐生涯个人喜好表:{banner}</span>

				{list}
			{/* </MovableView>
		</MovableArea> */}
				{/* </Canvas> */}
				</div>
		</div>
	)
}



export default class Musics extends Component {
  render() {
    return (
      <div>
      <Miss></Miss>
      </div>
    )
  }
}


