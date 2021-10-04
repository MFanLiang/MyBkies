import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Util from '../../utils/utils'
import { connect } from 'react-redux'
import './index.less'
import axios from 'axios'

class Header extends Component {

	//初始化状态state
	state = {
		sysTime: "",  //初始系统时间
		dayPictureUrl: "", //指定天气图标
		text: "",     //显示的天气文本
		windDir: "",  //保存风向风速
		temp: ""      //保存气温温度
	}

	componentWillMount() {
		this.setState({
			userName: '河畔一角'
		})
		//获取当前时间
		setInterval(() => {
			let sysTime = Util.formDate(new Date().getTime())
			this.setState({ sysTime })
		}, 1000)

		//获取实时天气
		this.getWeatherAPIData()
	}

	//获取天气API的函数
	getWeatherAPIData = () => {
		axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=3682bb72753d44a1bb8d65a2f12afc4d")
			.then((response) => {
				let data = response.data.now;
				if (response.status === 200) {
					this.setState({
						dayPictureUrl: "resource/assets/weathers/" + data.icon + ".png",
						text: data.text,
						windDir: data.windDir,
						temp: data.temp
					})
				}
			})
	}

	render() {
		const { userName, sysTime, text, dayPictureUrl, windDir, temp } = this.state
		const { menuType } = this.props
		return (
			<div className="header">
				<Row className="header-top">
					{
						menuType ?
							<Col span={6} className="logo">
								<img src="/resource/assets/logo-ant.svg" alt="" />
								<span>小黄单车通用管理系统</span>
							</Col> : ''
					}

					<Col span={menuType ? 18 : 24}>
						<span>欢迎，{userName}</span>
						<a href="#">退出</a>
					</Col>
				</Row>
				{
					menuType ? "" :
						<Row className="breadcrumb">
							<Col span={4} className="breadcrumb-title">
								{this.props.menuName}
							</Col>
							<Col span={20} className="weather">
								<span className="date">{sysTime}</span>
								<span className="weather-detail">
									<img className="weather-icon" src={dayPictureUrl} alt="" />
									{text}-{windDir}-{temp}</span>
							</Col>
						</Row>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		menuName: state.menuName
	}
}

export default connect(mapStateToProps)(Header)