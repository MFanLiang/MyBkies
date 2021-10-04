import React, { Component } from 'react'
import { Card } from 'antd'
import BaseForm from './../../components/BaseForm'
import axios from './../../axios'

export default class BikeMap extends Component {

	state = {
		total_count: 0
	}

	//声明map地图对象
	map = '';

	formList = [
		{
			field: 'city'
		},
		{
			type: '时间查询',
		},
		{
			type: 'SELECT',
			label: '订单状态',
			field_map: 'order_status',
			placeholder: '全部',
			initialValue: '0',
			list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
		}
	]

	componentWillMount() {
		this.requestList()
	}

	//默认请求接口数据
	requestList = () => {
		let _this = this
		axios.ajax({
			url: '/map/bike_list',
			data: {
				params: this.params
			}
		})
			.then((res) => {
				console.log("通过/map/bike_list虚拟接口返回的数据是：", res);

				if (res.code == 200) {
					_this.setState({
						total_count: res.result.total_count
					})
					_this.renderMap(res)
				}
			})
	}

	//渲染地图数据
	renderMap = (res) => {
		let list = res.result.route_list //获取地图数据列表
		this.map = new window.BMapGL.Map('container');
		let gps1 = list[0].split(',');  //获取起点
		let startPoint = new window.BMapGL.Point(gps1[0], gps1[1])
		let gps2 = list[list.length - 1].split(','); //获取终点
		let endPoint = new window.BMapGL.Point(gps2[0], gps2[1])
		this.map.centerAndZoom(endPoint, 11);
		this.addMapControl()
		// this.drawServiceArea()

		//定义车辆的起点
		let startPointIcon = new window.BMapGL.Icon('/resource/assets/start_point.png', new window.BMapGL.Size(36, 42), {
			imageSize: new window.BMapGL.Size(36, 42),
			anchor: new window.BMapGL.Size(18, 42)
		})

		//定义车辆的起终点
		let endPointIcon = new window.BMapGL.Icon('/resource/assets/end_point.png', new window.BMapGL.Size(36, 42), {
			imageSize: new window.BMapGL.Size(36, 42),
			anchor: new window.BMapGL.Size(18, 42)
		})

		let bikeMarkerStart = new window.BMapGL.Marker(startPoint, { icon: startPointIcon });
		let bikeMarkerEnd = new window.BMapGL.Marker(endPoint, { icon: endPointIcon })
		this.map.addOverlay(bikeMarkerStart)
		this.map.addOverlay(bikeMarkerEnd)

		//绘制车辆行驶路线
		let routeList = []
		list.forEach((item) => {
			let p = item.split(',')
			routeList.push(new window.BMapGL.Point(p[0], p[1]))
		})

		//根据坐标点连线
		let polyLine = new window.BMapGL.Polyline(routeList, {
			strokeColor: '#ef4136',   //指定折线颜色
			strokeWeight: 3,   //折线的宽度，像素为单位
			strokeOpacity: 1   //折线的透明度，取值范围是0 - 1
		})
		this.map.addOverlay(polyLine);
		this.map.centerAndZoom(endPoint, 11);

		//绘制服务区
		let servicePintList = [];
		let serviceList = res.result.service_list;
		serviceList.forEach((item) => {
			servicePintList.push(new window.BMapGL.Point(item.lon, item.lat))
		})
		let polyServiceLine = new window.BMapGL.Polyline(servicePintList, {
			strokeColor: '#ef4136',   //指定折线颜色
			strokeWeight: 3,   //折线的宽度，像素为单位
			strokeOpacity: 1   //折线的透明度，取值范围是0 - 1
		})
		this.map.addOverlay(polyServiceLine);
		// 为服务区添加背景颜色
		let polygon = new window.BMapGL.Polygon(servicePintList, {
			strokeColor: '#CE0000',
			strokeWeight: 4,
			strokeOpacity: 1,
			fillColor: '#ff8605',
			fillOpacity: 0.4
		})
		this.map.addOverlay(polygon);

		//添加地图中的自行车图标
		let bikeList = res.result.bike_list;
		let bikeIcon = new window.BMapGL.Icon('/resource/assets/bike.jpg', new window.BMapGL.Size(36, 42), {
			imageSize: new window.BMapGL.Size(36, 42),
			anchor: new window.BMapGL.Size(18, 42)
		})
		bikeList.forEach((item) => {
			let p = item.split(',');
			let point = new window.BMapGL.Point(p[0], p[1])
			let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon })
			this.map.addOverlay(bikeMarker);
		})
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

	//查询表单
	handleFilterSubmit = (filterParams) => {
		this.params = filterParams
		this.requestList();
	}

	render() {
		return (
			<div>
				{/* 查询服务区域 */}
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
				</Card>

				{/* 地图服务区域 */}
				<Card style={{ marginTop: 20 }}>
					<div>共{this.state.total_count}辆车</div>
					<div id="container" style={{ height: 500 }}></div>
				</Card>
			</div>
		)
	}
}