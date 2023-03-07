import { useState, useRef } from 'react'
import React, { Component } from 'react'

import Card from '../components/card'
import styles from '@/styles/Home.module.css'
import Menu from '../components/Menu'
// import '@/styles/music.css'

import DomToImage from 'dom-to-image'
import html2canvas from 'html2canvas'
import EditableText from '../components/Title'
import NumberDropdown from '../components/SelectCount'
import Config from '../api/config'
interface Item {
	title: string;
	picURL: string;
}

interface StyleProps {
	width: string;
}

interface ListStyle extends StyleProps {
	height: string;
}

function toast(title: string) {
	console.log(title);
}

function Mis() {

	const defaultImgUrl = '/cover1.png';
	let titles = ["最喜欢的", "最惊艳的", "最想安利的","最影响我的","听过最多的","最治愈的","听过最早的","爷青回", "它好小众我好爱","最喜欢的", "最惊艳的", "最想安利的","最影响我的","听过最多的","最治愈的","听过最早的","爷青回", "它好小众我好爱","最喜欢的", "最惊艳的", "最想安利的","最影响我的","听过最多的","最治愈的","听过最早的","爷青回", "它好小众我好爱"];
	let replaceTitles: Item[] = titles.map((title) => {
		return {title: title, picURL: defaultImgUrl}
	})



	
	const gridList = React.createRef<HTMLDivElement>();

	function slices(arr: Item[], row: number) {
		var result: Item[][] = [];
		for (let index = 0; index < arr.length; index += row) {
		result.push(arr.slice(index, index + row));
		}
		return result
	}

	const [rows, setRows] = useState(3);
	const [width, setWidth] = useState(rows * Config.cardWidth);

	// const rows = 3;

	const setItemCountForLines = () => {

	}

	function handleResize() {
		setWidth(window.innerWidth);
	  }

	const deleteLast = () => {
		if (items.length < 1) {
			return
		}

		setItems(items.slice(0, items.length - 1));
	}

	const addCard = () => {
		const defaultCard: Item = {
			title: "默认文案",
			picURL: defaultImgUrl
		}
		setItems([...items, defaultCard]);
	}
	
  	const saveScreenshot = () => {

		// const gridList = document.getElementById("gridList") as HTMLDivElement;
		// if (gridList.current) {
		// 	gridList.current!.style.width = '1500px';
		// } else {
		// 	console.log("not have anymore");
		// }


		var node = document.getElementById(styles.main)!;

		html2canvas(node, {height: node.scrollHeight}).then(function(canvas) {
			document.body.appendChild(canvas);

				var link = document.createElement('a');
				let dataUrl = canvas.toDataURL();
				link.download = 'my-image-name.jpeg';
				link.href = dataUrl;
				link.click();

		});
	}

	// const [pageStyle, setPageStyle] = useState<StyleProps>({
	// 	width: (rows * Config.cardWidth).toString() + 'px'
	//   });

	  const pageStyle = {
		width: (rows * (Config.cardWidth + 15)).toString() + 'px'
	  };

	  const ListStyle: ListStyle = {
		width: (rows * Config.cardWidth).toString() + 'px',
		height: Config.cardHeight.toString() + 'px'
	  };

	  console.log(rows, pageStyle.width, Config.cardWidth);

	const [current ,setCurrent] = useState(0);
	const [items, setItems] = useState<Item[]>(replaceTitles)
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	
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

	const onCountSelected = (count: number) => {
		setRows(count);
		// setWidth(count * Config.cardWidth);
		// setPageStyle({
		// 	width: width + 'px'
		//   });
	}

	const handlePopupClose = (urls: string) => {
		
	  setIsPopupOpen(false);
		console.log("url is " + urls);
	};

	const handleCleanImage = () => {
		let newliast = items.map((item, index) => {
			if (index == current) {
				return {title: item.title, picURL: defaultImgUrl};
			} else {
				return item;
			}
		})
		
		setItems(newliast);
		setIsPopupOpen(false);
	}
	

	const list = slices(items, rows).map((titles, key) => (
		<div className='lis' key={key} style={ListStyle}>
		{titles.map((item, index) => (
		  <Card  title={item.title} imgURL={item.picURL} key={index} clickHandle={handlePopupOpen} row={key * rows + index}></Card>
		))}
		</div>
	  ))


	return (
		
		<div className={styles.main} id={styles.main}>
		<Menu isOpen={isPopupOpen} closeHandle={handlePopupClose} updateHandle={handleImageSelected} cleanHandle={handleCleanImage}  />
			{/* <Canvas id='canvass'> */}
			<div className='option'>
		<button className='saveBtn' onClick={saveScreenshot}>保存到本地</button>
		<button className='saveBtn' onClick={addCard}>增加一个</button>
		<button className='saveBtn' onClick={deleteLast}>删除最后一个</button>

		<NumberDropdown initialCount={rows} onSelect={onCountSelected} name='saveBtn'/>
		</div>
		
		{/* <button className='saveBtn' onClick={setItemCountForLines}>设置每排数量</button> */}

		{/* <MovableArea id='screen' style='height: 100%; width: 100%; background: yellow;' scaleArea>
			<MovableView style='height: 100%; width: 100%; background: blue;' disabled scale onScale={scaleHandle} scaleMax={1} scaleMin={0.4}>
				{/* <ScrollView className='scrollview' scrollX scrollY  bounces={false} enhanced enableFlex> */}
          
			<div className='gridList' id='gridList' ref={gridList} style={pageStyle}>
				{/* <div className='titles'>		<span >音乐生涯个人喜好表</span>		</div> */}
				<EditableText initialText='音乐生涯个人喜好表' name='titles'/>
				{list}
				</div>
			{/* </MovableView>
		</MovableArea> */}
				{/* </Canvas> */}
		</div>
	)
}



export default class Music extends Component {
  render() {
    return (
		<div>
		  <Mis></Mis>
      </div>
    )
  }
}


