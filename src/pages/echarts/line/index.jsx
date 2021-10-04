import React, { Component } from 'react'
import { Card } from 'antd'
import * as echarts from 'echarts';
import './../../../style/common.less'

export default class Line extends Component {

	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		let myChart1 = echarts.init(document.getElementById('main1'));
		let myChart2 = echarts.init(document.getElementById("main2"));
		let myChart3 = echarts.init(document.getElementById("main3"))

		//定义图表详细选项配置
		let option1 = {
			color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
			title: {
				text: '单车用户的使用详情'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: 'Line 1',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(128, 255, 165)'
							},
							{
								offset: 1,
								color: 'rgba(1, 191, 236)'
							}
						])
					},
					emphasis: {
						focus: 'series'
					},
					data: [140, 232, 101, 264, 90, 340, 250]
				},
				{
					name: 'Line 2',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(0, 221, 255)'
							},
							{
								offset: 1,
								color: 'rgba(77, 119, 255)'
							}
						])
					},
					emphasis: {
						focus: 'series'
					},
					data: [120, 282, 111, 234, 220, 340, 310]
				},
				{
					name: 'Line 3',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(55, 162, 255)'
							},
							{
								offset: 1,
								color: 'rgba(116, 21, 219)'
							}
						])
					},
					emphasis: {
						focus: 'series'
					},
					data: [320, 132, 201, 334, 190, 130, 220]
				},
				{
					name: 'Line 4',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(255, 0, 135)'
							},
							{
								offset: 1,
								color: 'rgba(135, 0, 157)'
							}
						])
					},
					emphasis: {
						focus: 'series'
					},
					data: [220, 402, 231, 134, 190, 230, 120]
				},
				{
					name: 'Line 5',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0
					},
					showSymbol: false,
					label: {
						show: true,
						position: 'top'
					},
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(255, 191, 0)'
							},
							{
								offset: 1,
								color: 'rgba(224, 62, 76)'
							}
						])
					},
					emphasis: {
						focus: 'series'
					},
					data: [220, 302, 181, 234, 210, 290, 150]
				}
			]
		}
		let option2 = {
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
					areaStyle: {}
				}
			]
		}
		let option3 = {
			title: {
				text: 'Stacked Line'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: 'Email',
					type: 'line',
					stack: 'Total',
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: 'Union Ads',
					type: 'line',
					stack: 'Total',
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: 'Video Ads',
					type: 'line',
					stack: 'Total',
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: 'Direct',
					type: 'line',
					stack: 'Total',
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				{
					name: 'Search Engine',
					type: 'line',
					stack: 'Total',
					data: [820, 932, 901, 934, 1290, 1330, 1320]
				}
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