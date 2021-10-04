import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

export default class Carousels extends Component {

	render() {
		const contentStyle = {
			height: '160px',
			color: '#fff',
			lineHeight: '160px',
			textAlign: 'center',
			background: '#364d79',
		};
		const imgStyle = {
			width: '100%',
			height: '460px'
		}
		const div_Style = {
			textAlign: 'center'
		}
		const imgStyle02 = {
			width: '500px',
			height: '700px'
		}
		return (
			<div>
				<Card title="轮播效果"  className="card-wrap">
				<Carousel autoplay>
					<div>
						<h3 style={contentStyle}>1</h3>
					</div>
					<div>
						<h3 style={contentStyle}>2</h3>
					</div>
					<div>
						<h3 style={contentStyle}>3</h3>
					</div>
					<div>
						<h3 style={contentStyle}>4</h3>
					</div>
				</Carousel>
				</Card>
				<Card title="图片轮播效果"  className="card-wrap">
				<Carousel autoplay>
					<div>
						<img src="/resource/carousel-img/carousel-1.jpg" alt="" style={imgStyle} />
					</div>
					<div>
					<img src="/resource/carousel-img/carousel-2.jpg" alt="" style={imgStyle} />
					</div>
					<div>
					<img src="/resource/carousel-img/carousel-3.jpg" alt="" style={imgStyle} />
					</div>
				</Carousel>
				</Card>
				<Card title="图片轮播效果02"  className="card-wrap">
				<Carousel autoplay>
					<div style={div_Style}>
						<img src="/resource/own-imgs/image1.jpg" alt="" style={imgStyle02} />
					</div>
					<div style={div_Style}>
					<img src="/resource/own-imgs/image2.jpg" alt="" style={imgStyle02} />
					</div>
					<div style={div_Style}>
					<img src="/resource/own-imgs/image3.jpg" alt="" style={imgStyle02} />
					</div >
					<div style={div_Style}>
					<img src="/resource/own-imgs/image4.jpg" alt="" style={imgStyle02} />
					</div>
					<div style={div_Style}>
					<img src="/resource/own-imgs/image5.jpg" alt="" style={imgStyle02} />
					</div>
				</Carousel>
				</Card>
			</div>
		)
	}
}