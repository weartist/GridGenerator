import React, { Component } from 'react'
import Info from '../components/Info';


export default class Books extends Component {
	titles = ["最喜欢的", "最惊艳的", "最想安利的", "最影响我的", "读过最多遍的", "最喜欢的剧情","最喜欢的角色", "最喜欢的设定", "最喜欢的文笔","最喜欢的结局", "最爽快的", "最感动", "最无聊", "最被低估的", "最被高估的", "记忆里的第一本", "总有一天会读完","我为啥会读这个","小众但我喜欢","评价好但我不喜欢"];
	render() {
		return (
			<div>
				<Info cardTitles={this.titles} title="阅读生涯个人喜好表"></Info>
			</div>
		)
	}
}