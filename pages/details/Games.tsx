import React, { Component } from 'react'
import Info from '../components/Info';

export default function Games(): JSX.Element {
	const titles = ["最喜欢的", "最惊艳的", "最想安利的", "最影响我的", "最快乐的", "最喜欢的剧情", "最喜欢的配乐", "最喜欢的画面", "最喜欢的角色", "最喜欢的结局", "最爽快的", "最痛苦的", "最温馨的", "最被高估的", "最被低估的","第一款玩的","我咋会喜欢这个","总有一天能打完","爷青回","小众但我喜欢的"];
    return (
        <div>
            <Info cardTitles={titles} title="游戏生涯个人喜好表"></Info>
        </div>
    )
}