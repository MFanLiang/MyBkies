import React, { Component } from 'react'
import { Card } from 'antd'
import * as echarts from 'echarts';
import './../../../style/common.less'

export default class Pie extends Component {

	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		let myChart1 = echarts.init(document.getElementById('main1'));
		let myChart2 = echarts.init(document.getElementById("main2"));
		let myChart3 = echarts.init(document.getElementById("main3"))

		//定义图表详细选项配置
		let option1 = {
			title: {
				text: '用户骑行订单',
				subtext: '用户骑行小单车的使用状态',
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a}<br />{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 'left'
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: '50%',
					data: [
						{ value: 1048, name: '周一' },
						{ value: 735, name: '周二' },
						{ value: 580, name: '周三' },
						{ value: 484, name: '周四' },
						{ value: 300, name: '周五' },
						{ value: 200, name: '周六' },
						{ value: 140, name: '周日' }
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		}
		let option2 = {
			title: {
				text: '用户骑行订单',
				subtext: '用户骑行小单车的使用状态',
				left: 'center'
			},
			legend: {
				top: 'bottom'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a}<br />{b}: {c} ({d}%)'
			},
			toolbox: {
				show: true,
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			series: [
				{
					name: 'Nightingale Chart',
					type: 'pie',
					radius: [50, 250],
					center: ['50%', '50%'],
					roseType: 'area',
					itemStyle: {
						borderRadius: 8
					},
					data: [
						{ value: 40, name: 'rose 1' },
						{ value: 38, name: 'rose 2' },
						{ value: 32, name: 'rose 3' },
						{ value: 30, name: 'rose 4' },
						{ value: 28, name: 'rose 5' },
						{ value: 26, name: 'rose 6' },
						{ value: 22, name: 'rose 7' },
						{ value: 18, name: 'rose 8' }
					]
				}
			]
		}
		let option3 = {
			title: {
				text: '用户骑行订单',
				subtext: '用户骑行小单车的使用状态',
				left: 'left'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				top: '5%',
				left: 'center'
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '40',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: [
						{ value: 1048, name: 'Search Engine' },
						{ value: 735, name: 'Direct' },
						{ value: 580, name: 'Email' },
						{ value: 484, name: 'Union Ads' },
						{ value: 300, name: 'Video Ads' }
					]
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