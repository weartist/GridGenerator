
import React, { Component } from 'react'
import Info from '../components/Info';


export default class Movies extends Component {
	titles = ["最喜欢的", "最佳剧情", "最感动的", "最有趣的","最无聊的", "最恐怖的", "最想推荐的", "看过最多的", "最喜欢的导演", "最喜欢的男演员", "最喜欢的女演员", "最爱的主角", "最爱的配角", "最爱的反派","最讨厌的角色", "最喜欢的原声", "评价好但我讨厌", "评价差但我喜欢","第一部看的","最近一部看的"];
	render() {
		return (
			<div>
				<Info cardTitles={this.titles} title="观影生涯个人喜好表"></Info>
			</div>
		)
	}
}