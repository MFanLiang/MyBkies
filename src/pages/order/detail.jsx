import React, { Component } from 'react'
// import { Form, Select } from 'antd'
import axios from '../../axios'
// import Utils from '../../utils/utils'
import './detail.less'

// const FormItem = Form.Item
// const Option = Select

export default class Order extends Component {

	state = {
		orderInfo: ""
	}

	//接口调用数据
	getDetailInfo = (orderId) => {
		axios.ajax({
			url: 'order/detail',
			data: {
				params: {
					orderId: orderId
				}
			}
		})
			.then(res => {
				if (res.code == 200) {
					this.setState({
						orderInfo: res.result
					})
					this.renderMap(res.result)
				}
			})
	}

	componentDidMount() {
		//获取url地址栏的动态的orderId值
		let orderId = this.props.match.params.orderId;
		if (orderId) {
			this.getDetailInfo()
		}
	}

	//使用百度地图的开发平台创建地图功能
	renderMap = (result) => {
		let { BMapGL } = window
		//创建地图实例
		this.map = new BMapGL.Map('orderDetailMap');
		this.map.centerAndZoom("北京", 11);
		// 调用路线图绘制方法
		this.drawBikeRoute(result.position_list);
		this.addMapControl()
		// 调用服务区绘制方法
		this.drawServiceArea(result.area);
	}

	//添加地图控件
	addMapControl = () => {
		let { BMapGL } = window
		let map = this.map
		map.addControl(new BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }))    //添加比例尺控件
		map.addControl(new BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))  // 添加缩放控件
		map.addControl(new BMapGL.CityListControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT })) // 添加城市列表控件
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
		map.addControl(navi3DCtrl);
	}

	//绘制用户的行驶路线图
	drawBikeRoute = (positionList) => {
		let { BMapGL } = window
		let map = this.map
		let startPoint = ""  //定义起始点
		let endPoint = ""    //定义终止点
		if (positionList.length > 0) {
			let first = positionList[0];
			let last = positionList[positionList.length - 1];
			startPoint = new BMapGL.Point(first.lon, first.lat);
			let startIcon = new BMapGL.Icon('/resource/assets/start_point.png', new BMapGL.Size(36, 42), {
				imageSize: new BMapGL.Size(36, 42),
				anchor: new BMapGL.Size(18, 42)
			})

			let startMarker = new BMapGL.Marker(startPoint, { icon: startIcon });
			map.addOverlay(startMarker);

			endPoint = new BMapGL.Point(last.lon, last.lat);
			let endIcon = new BMapGL.Icon('/resource/assets/end_point.png', new BMapGL.Size(36, 42), {
				imageSize: new BMapGL.Size(36, 42),
				anchor: new BMapGL.Size(18, 42)
			})
			let endMarker = new BMapGL.Marker(endPoint, { icon: endIcon });
			map.addOverlay(endMarker);

			//生成链接行程路线图
			let trackPoint = [];
			for (let i = 0; i < positionList.length; i++) {
				let point = positionList[i]
				trackPoint.push(new BMapGL.Point(point.lon, point.lat));
			}

			//根据点线画出折线
			let polyline = new BMapGL.Polyline(trackPoint, {
				strokeColor: '#1869AD',   //指定折线颜色
				strokeWeight: 3,   //折线的宽度，像素为单位
				strokeOpacity: 1   //折线的透明度，取值范围是0 - 1
			})
			this.map.addOverlay(polyline);
			this.map.centerAndZoom(endPoint, 11);
		}
	}

	// 绘制服务区
	drawServiceArea = (positionList) => {
		let { BMapGL } = window
		// 连接路线图
		let trackPoint = [];
		for (let i = 0; i < positionList.length; i++) {
			let point = positionList[i];
			trackPoint.push(new BMapGL.Point(point.lon, point.lat));
		}
		// 绘制服务区
		let polygon = new BMapGL.Polygon(trackPoint, {
			strokeColor: '#CE0000',
			strokeWeight: 4,
			strokeOpacity: 1,
			fillColor: '#ff8605',
			fillOpacity: 0.4
		})
		this.map.addOverlay(polygon);
	}

	render() {
		const info = this.state.orderInfo || {}
		return (
			<div>
				<div id="orderDetailMap" className="order-map"></div>
				<div className="detail-items">
					<div className="item-title">基础信息</div>
					<ul className="detail-form">
						<li>
							<div className="detail-form-left">用车模式</div>
							<div className="detail-form-content">{info.mode == 1 ? "服务区" : "停车点"}</div>
						</li>
						<li>
							<div className="detail-form-left">订单编号</div>
							<div className="detail-form-content">{info.order_sn}</div>
						</li>
						<li>
							<div className="detail-form-left">车辆编号</div>
							<div className="detail-form-content">{info.bike_sn}</div>
						</li>
						<li>
							<div className="detail-form-left">用户姓名</div>
							<div className="detail-form-content">{info.user_name}</div>
						</li>
						<li>
							<div className="detail-form-left">手机号码</div>
							<div className="detail-form-content">{info.mobile}</div>
						</li>
					</ul>

					<hr />

					<div className="item-title">行驶轨迹</div>
					<ul className="detail-form">
						<li>
							<div className="detail-form-left">行程起点</div>
							<div className="detail-form-content">{info.start_location}</div>
						</li>
						<li>
							<div className="detail-form-left">行程终点</div>
							<div className="detail-form-content">{info.end_location}</div>
						</li>
						<li>
							<div className="detail-form-left">行驶里程</div>
							<div className="detail-form-content">{info.distance / 1000}公里</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}