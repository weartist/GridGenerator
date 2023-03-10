


import React, { Component } from 'react'
import Info from '../components/Info';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Route } from 'next/dist/server/router';

// interface galleryProps {
//     imgURL: string,
//     width: number,
//     height: number
// }

import { withRouter, NextRouter } from 'next/router'

interface WithRouterProps {
    router: NextRouter
  }

  interface MyComponentProps extends WithRouterProps {}

  interface ImgProps {
    imageURL: string
  }

  function Gallery(props: ImgProps): JSX.Element {
    const imgCount = props.imageURL && props.imageURL.length > 1 ? props.imageURL.length : 0;
    return (
        <div className={`imgGallery${imgCount > 1 ? "-active" : ""}`}>
            <span>{'and' + '1' + props.imageURL}</span>
            <Image className='pics' id="cover" src={props.imageURL} alt="what ever" width={500} height={500}/>
        </div>
    );
};



// <view class="on-court-poster" id="onCourtPoster">
//     <!-- 页面布局仅供参考 -->
//     <view>页面需要生成图片的内容</view>
//     <!-- 用来保存生成图片 -->
//     <image :src="prurl" alt="分享海报" id="posterIimg" class="poster-img" v-show="!hidden"/>
// </view>

export default Gallery;