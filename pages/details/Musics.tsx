import React, { Component } from 'react'
import Info from '../components/Info';


export default function Musics(): JSX.Element {
	const titles = ["最喜欢的", "最惊艳的", "最想安利的", "最影响我的", "听过最多的", "最治愈的", "最伤感的", "听过最早的", "爷青回", "它好小众我好爱", "最喜欢的男歌手", "最喜欢的女歌手", "最喜欢的专辑", "最近在听的", "感觉被过誉的"];
    return (
        <div>
            <Info cardTitles={titles} title="音乐生涯个人喜好表"></Info>
        </div>
    )
}





