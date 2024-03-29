
import { useState, useRef, useEffect, useCallback } from 'react'
import React, { Component } from 'react'
import { toPng } from 'html-to-image';

import Card from './card'
import styles from '@/styles/Home.module.css'
import Menu from './Menu'
import ImagePreview from './ImagePreview'

import DomToImage from 'dom-to-image'
import EditableText from './Title'
import NumberDropdown from './SelectCount'
import { CardRadioSelect, CardRadio } from './SelectRadio';
import Config from '../api/config'
import GitHubRepoLink from './Repo'
import Router, { useRouter } from "next/router";
import Gallery from '../details/Gallery'
import Image from 'next/image'
import * as htmlToImage from 'html-to-image';

import { isMobile } from 'react-device-detect';

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

function updateLastSeen(): string {
	const lastSeen = window.localStorage.getItem('last-seen') ?? new Date().toString();
	window.localStorage.setItem('last-seen', new Date().toString());
	return lastSeen;
}

function useLastSeen() {
	const [lastSeen, setLastSeen] = useState<string>('');
	const retrieved = useRef(false); //To get around strict mode running the hook twice
	useEffect(() => {
		if (retrieved.current) return;
		retrieved.current = true;
		setLastSeen(updateLastSeen());
	}, []);

	return lastSeen;
}


export default function Info(props: InfoProps): JSX.Element {

	const defaultImgUrl = '';
	const lastSeen = useLastSeen();
	const ref = useRef<HTMLDivElement>(null)

	const defaultTitles = Array(Config.cardCountForLine).fill('默认文案')
	const titles = props.cardTitles ? props.cardTitles : defaultTitles
	let replaceTitles: Item[] = titles.map((title) => {
		return { title: title, picURL: defaultImgUrl }
	})



	const gridList = React.createRef<HTMLDivElement>();

	useEffect(() => {
		const optionDiv = document.getElementById("option") as HTMLDivElement;
		if (optionDiv && gridList) {
			console.log('offset height is ' + optionDiv.offsetHeight);
			gridList.current!.style.padding = (optionDiv.offsetHeight * 3).toString();
		}
	});

	function slices(arr: Item[], row: number) {
		var result: Item[][] = [];
		for (let index = 0; index < arr.length; index += row) {
			result.push(arr.slice(index, index + row));
		}
		return result
	}

	function cardWidth(): number {
		return 270;
	}

	function cardHeight(): number {
		if (cardRadio == '16:9') {
			return 480;
		}
		return 270;
		
	}

	const [cardRadio, setCardRadio] = useState<CardRadio>('16:9');

	const [rows, setRows] = useState(Config.cardCountForLine);
	const [width, setWidth] = useState(rows * cardWidth());
	const [height, setHeight] = useState(100)

	const setItemCountForLines = () => {

	}

	function handleResize() {
		setWidth(window.innerWidth);
	}

	const deleteLast = () => {
		if (isPreview()) {
			return
		}
		if (items.length < 1) {
			return
		}

		setItems(items.slice(0, items.length - 1));
	}

	const addCard = () => {
		if (isPreview()) {
			return
		}
		const defaultCard: Item = {
			title: "默认文案",
			picURL: defaultImgUrl
		}
		setItems([...items, defaultCard]);
	}

	const reEdit = () => {
		setGalleryURL('');
	}

	function isPreview() {
		return galleryURL !== '';
	}

	const generateImagePreview = useCallback(() => {
		if (ref.current === null || isPreview()) {
			return
		}

		toPng(ref.current, { cacheBust: true, })
			.then((dataUrl) => {
				var node = document.getElementById('columnView')!;
				setWidth(node.offsetWidth)
				setHeight(node.scrollHeight)
				setGalleryURL(dataUrl)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [ref])



	const pageStyle = {
		width: (rows * (cardWidth() + 15)).toString() + 'px'
	};

	const ListStyle: ListStyle = {
		width: (rows * cardWidth()).toString() + 'px',
		height: (cardHeight() + 30).toString() + 'px'
	};

	console.log(rows, pageStyle.width, cardWidth());

	const [current, setCurrent] = useState(0);
	const [items, setItems] = useState<Item[]>(replaceTitles)
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const [galleryURL, setGalleryURL] = useState('');

	const handlePreviewClose = () => {
		setGalleryURL("")
	};

	const handlePopupOpen = (index: number) => {
		console.log(index);
		setCurrent(index);
		setIsPopupOpen(true);
	};


	const handleImageSelected = (urls: string) => {
		setIsPopupOpen(false);
		console.log("选择的url是" + urls);
		let newItems = items.map((item, index) => {
			if (index == current) {
				return { title: item.title, picURL: urls };
			} else {
				return item;
			}
		})

		setItems(newItems);
	}

	const onRadioSelected = (radio: CardRadio) => {
		setCardRadio(radio)
	}

	const onCountSelected = (count: number) => {
		setRows(count);
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

	const className = 'option option' + (isMobile == true ? "-mobile" : "-web");

	const list = slices(items, rows).map((titles, key) => (
		<div className='lis' key={key} style={ListStyle}>
			{titles.map((item, index) => (
				<Card title={item.title} imgURL={item.picURL} key={index} clickHandle={handlePopupOpen} row={key * rows + index} cardWidth={cardWidth()} cardHeight={cardHeight()}></Card>
			))}
		</div>
	))

	const prompt = galleryURL.length == 0 ? '点击标题，卡片上的文字可进行编辑' : '长按图片保存';

	var scale = 1
	if (typeof window !== 'undefined') {
		const previewWidthScale = window.screen.width / width;
		const previewHeightScale = window.screen.height / height;
		scale = previewWidthScale < previewHeightScale ? previewWidthScale : previewHeightScale;
	}

	return (

		<div className={styles.main} id={styles.main}>
			<ImagePreview isOpen={galleryURL.length > 0} imageSrc={galleryURL} height={height * scale * 0.8} width={width * scale * 0.8} closeHandle={handlePreviewClose} />
			<Menu isOpen={isPopupOpen} closeHandle={handlePopupClose} updateHandle={handleImageSelected} cleanHandle={handleCleanImage} />
			{
				galleryURL.length == 0 &&
				<div className={className} id='option'>
					<span className='customSpan'>{prompt}</span>
					<button className={`customBtn${galleryURL.length == 0 ? "-hide" : ""}`} onClick={reEdit}>继续编辑</button>
					<button className='customBtn' onClick={generateImagePreview}>生成预览</button>
					<button className='customBtn' onClick={addCard}>增加一个</button>
					<button className='customBtn' onClick={deleteLast}>删除最后一个</button>
					<button className='customBtn' onClick={deleteLast}>删除最后一个</button>
					<CardRadioSelect onSelect={onRadioSelected} initialRadio={cardRadio} name='customBtn'></CardRadioSelect>
					<NumberDropdown initialCount={rows} onSelect={onCountSelected} name='customBtn' />
				</div>
			}
			<div className={`columnView${galleryURL.length == 0 ? "-active" : ""}`} id='columnView' ref={ref}>
				<div className='gridList' id='gridList' ref={gridList} style={pageStyle}>
					{/* <div className='titles'>		<span >音乐生涯个人喜好表</span>		</div> */}
					<EditableText initialText={props.title} name='titles' />
					{list}
				</div>
			</div>
			<GitHubRepoLink />
			{/* </MovableView>
		</MovableArea> */}
			{/* </Canvas> */}
		</div>
	)
}

