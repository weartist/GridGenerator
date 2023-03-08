
import { useState, useRef } from 'react'
import React, { Component } from 'react'

import Card from './card'
import styles from '@/styles/Home.module.css'
import Menu from './Menu'
// import '@/styles/music.css'

import DomToImage from 'dom-to-image'
import html2canvas from 'html2canvas'
import EditableText from './Title'
import NumberDropdown from './SelectCount'
import Config from '../api/config'
import GitHubRepoLink from './Repo'


interface InfoProps {
	title: string;
	cardTitles: string[];
}
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

export default function Info(props: InfoProps): JSX.Element {

	const defaultImgUrl = '/cover1.png';

	let replaceTitles: Item[] = props.cardTitles.map((title) => {
		return { title: title, picURL: defaultImgUrl }
	})




	const gridList = React.createRef<HTMLDivElement>();

	function slices(arr: Item[], row: number) {
		var result: Item[][] = [];
		for (let index = 0; index < arr.length; index += row) {
			result.push(arr.slice(index, index + row));
		}
		return result
	}

	const [rows, setRows] = useState(Config.cardCountForLine);
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


		var node = document.getElementById('columnView')!;
		var clone: HTMLElement = node.cloneNode(true) as HTMLElement;
		clone.style.position = 'absolute';
		clone.style.top = '0px';
		clone.style.zIndex = '-1000';
		clone.style.width = width.toString();
		document.body.append(clone);



		html2canvas(clone, { height: node.scrollHeight, width:node.offsetWidth , x: 0 }).then(function (canvas) {
			var link = document.createElement('a');
			let dataUrl = canvas.toDataURL();
			link.download = 'my-image-name.jpeg';
			link.href = dataUrl;
			link.click();
			document.body.removeChild(clone);

		});
	}


	const pageStyle = {
		width: (rows * (Config.cardWidth + 15)).toString() + 'px'
	};

	const ListStyle: ListStyle = {
		width: (rows * Config.cardWidth).toString() + 'px',
		height: Config.cardHeight.toString() + 'px'
	};

	console.log(rows, pageStyle.width, Config.cardWidth);

	const [current, setCurrent] = useState(0);
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
				return { title: item.title, picURL: urls };
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
				return { title: item.title, picURL: defaultImgUrl };
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
				<Card title={item.title} imgURL={item.picURL} key={index} clickHandle={handlePopupOpen} row={key * rows + index}></Card>
			))}
		</div>
	))


	return (

		<div className={styles.main} id={styles.main}>
			<Menu isOpen={isPopupOpen} closeHandle={handlePopupClose} updateHandle={handleImageSelected} cleanHandle={handleCleanImage} />
			<div className='option'>
				<span className='defaultSpan'>点击标题或者卡片文字可以进行自定义编辑</span>
				<button className='saveBtn' onClick={saveScreenshot}>保存到本地</button>
				<button className='saveBtn' onClick={addCard}>增加一个</button>
				<button className='saveBtn' onClick={deleteLast}>删除最后一个</button>

				<NumberDropdown initialCount={rows} onSelect={onCountSelected} name='saveBtn' />
			</div>
			<div className='columnView' id='columnView'>
				<div className='gridList' id='gridList' ref={gridList} style={pageStyle}>
					{/* <div className='titles'>		<span >音乐生涯个人喜好表</span>		</div> */}
					<EditableText initialText={props.title} name='titles' />
					{list}
				</div>
				<GitHubRepoLink />
			</div>
			{/* </MovableView>
		</MovableArea> */}
			{/* </Canvas> */}
		</div>
	)
}

