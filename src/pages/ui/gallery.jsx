import React, { Component } from 'react'
import { Card, Row, Col, Modal } from 'antd'
import './ui.less'

export default class Gallery extends Component {

	state = {
		visible: false
	}

	openGallery = (imgSrc) => {
		this.setState({
			visible: true,
			currentImg: `resource/gallery/${imgSrc}`
		})
	}

	onCancel = () => {
		this.setState({
			visible: false
		})
	}

	render() {
		const imgs = [
			['1.png', '2.png', '3.png', '4.png', '5.png'],
			['6.png', '7.png', '8.png', '9.png', '10.png'],
			['11.png', '12.png', '13.png', '14.png', '15.png'],
			['16.png', '17.png', '18.png', '19.png', '20.png'],
			['21.png', '22.png', '23.png', '24.png', '25.png'],
		]

		const imgsList = imgs.map((list) => list.map((item) =>
			<Card
				hoverable
				style={{ width: 200, marginBottom: 10 }}
				cover={<img src={'resource/gallery/' + item} alt="example" onClick={() => this.openGallery(item)} />}
			>
				<Card.Meta
					title="Europe Street beat"
					description="www.instagram.com"
				>
				</Card.Meta>
			</Card>
		))

		return (
			<div>
				<Row gutter={10}>
					<Col md={5}>
						{imgsList[0]}
					</Col>
					<Col md={5}>
						{imgsList[1]}
					</Col>
					<Col md={5}>
						{imgsList[2]}
					</Col>
					<Col md={5}>
						{imgsList[3]}
					</Col>
					<Col md={4}>
						{imgsList[4]}
					</Col>
				</Row>

				<Modal
					width={450}
					height={500}
					title="Picture gallery"
					visible={this.state.visible}
					onCancel={this.onCancel}
					footer={null}
				>
					{<img src={this.state.currentImg} style={{width:400, height:480}} alt="图片未正确加载显示" />}
				</Modal>
			</div>
		)
	}
}