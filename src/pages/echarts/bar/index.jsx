import React, { Component } from 'react'
import { Card } from 'antd'
import * as echarts from 'echarts';
import './../../../style/common.less'

export default class Bar extends Component {

	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		let myChart1 = echarts.init(document.getElementById('main1'));
		let myChart2 = echarts.init(document.getElementById("main2"));
		let myChart3 = echarts.init(document.getElementById("main3"))

		//定义图表详细选项配置
		let option1 = {
			title: {
				text: "柱形图表01"
			},
			tooltip: {},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			},
			yAxis: {},
			series: [
				{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}
			]
		}
		let option2 = {
			title: {
				text: "柱形图表02"
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			tooltip: {},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: [
						{
							value: 215,
							itemStyle: {
								color: "#663333"
							}
						},
						{
							value: 50,
							itemStyle: {
								color: '#a90000'
							}
						},
						{
							value: 60,
							itemStyle: {
								color: "#FFFF33"
							}
						},
						{
							value: 156,
							itemStyle: {
								color: "#FF9900"
							}
						},
						{
							value: 69,
							itemStyle: {
								color: "#9999FF"
							}
						},
						{
							value: 110,
							itemStyle: {
								color: '#00FF00'
							}
						},
						130
					],
					type: 'bar',  //指定图表类型为柱状图表
					showBackground: true,  //开启柱条背景颜色设置
					backgroundStyle: {
						color: '#D0D0D0'
					}
				}
			]
		}
		let option3 = {
			title: {
				text: '用户骑行订单'
			},
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					['product', 'OFO', '摩拜', '小蓝'],
					['周一', 43.3, 85.8, 93.7],
					['周二', 83.1, 73.4, 55.1],
					['周三', 86.4, 65.2, 82.5],
					['周四', 72.4, 53.9, 39.1],
					['周五', 67.4, 45.6, 83.4],
					['周六', 44.4, 89.6, 67.4],
					['周日', 91.4, 67.6, 97.4]
				]
			},
			xAxis: { type: 'category' },
			yAxis: {},
			// Declare several bar series, each will be mapped
			// to a column of dataset.source by default.
			series: [
				{ type: 'bar', itemStyle: { color: '#fec123' } },
				{ type: 'bar', itemStyle: { color: '#ff601c' } },
				{ type: 'bar', itemStyle: { color: '#6498cb' } }
			]
		}

		// 绘制图表
		myChart1.setOption(option1);
		myChart2.setOption(option2);
		myChart3.setOption(option3)
	}

	render() {
		return (
			<div>
				<Card className="card-wraps" id="main1"></Card>
				<Card className="card-wraps" id="main2"></Card>
				<Card className="card-wraps" id="main3"></Card>
			</div>
		)
	}
}