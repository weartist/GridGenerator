import React, { Component } from 'react'
import Info from '../components/Info';
import Config from '../api/config';

export default function Games(): JSX.Element {
    
	const titles = Array(Config.cardCountForLine).fill('默认文案')
    return (
        <div>
            <Info cardTitles={titles} title="默认文案"></Info>
        </div>
    )
}