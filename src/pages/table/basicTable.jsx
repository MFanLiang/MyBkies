import React, { Component } from 'react'
import { Button, Card, message, Modal, Table } from 'antd'
import Utils from './../../utils/utils'
import axios from './../../axios/index'
import './base.less'

const { rowSelection } = Table

export default class BasicTable extends Component {

	//初始化状态
	state = {
		dataSource2: [],
		selectedRowKes: ''
	}

	params = {
		page: 1
	}

	//组件挂载到页面上时触发的生命周期钩子
	componentDidMount() {

		//定义数据数组
		const dataSource = [
			{
				id: '0',
				userName: 'tom',
				sex: '1',
				state: '1',
				interest: '1',
				birthday: '2000-01-01',
				address: '北京市海淀区奥林匹克公园',
				time: '09: 00'
			},
			{
				id: '1',
				userName: 'Apache',
				sex: '2',
				state: '车速过快',
				interest: '服务观念',
				birthday: '2021-09-17',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 20'
			},
			{
				id: '2',
				userName: 'tomcat',
				sex: '3',
				state: '针对',
				interest: '服务',
				birthday: '2021-05-29',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 45'
			},
			{
				id: '3',
				userName: '经理',
				sex: '4',
				state: '机车',
				interest: '时尚',
				birthday: '2021-02-10',
				address: '经典体育赛事，国际盛典',
				time: '03: 40'
			},
			{
				id: '4',
				userName: 'pageIndex',
				sex: '2',
				state: '车速过快',
				interest: '服务观念',
				birthday: '2021-09-17',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 20'
			},
			{
				id: '5',
				userName: 'backspace',
				sex: '2',
				state: '车速过快',
				interest: '服务观念',
				birthday: '2021-09-17',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 20'
			},
			{
				id: '6',
				userName: 'love',
				sex: '2',
				state: '车速过快',
				interest: '服务观念',
				birthday: '2021-09-17',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 20'
			},
			{
				id: '7',
				userName: 'cpu',
				sex: '2',
				state: '车速过快',
				interest: '服务观念',
				birthday: '2021-09-17',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 20'
			},
			{
				id: '8',
				userName: 'live-server',
				sex: '2',
				state: '车速过快',
				interest: '服务观念',
				birthday: '2021-09-17',
				address: '北京市海淀区奥林匹克公园',
				time: '05: 20'
			}
		]
		dataSource.map((item, index) => {
			item.key = index;
		})

		this.setState({ dataSource })
		this.request();
	}

	//动态获取mock数据
	request = () => {
		let _this = this
		axios.ajax({
			url: '/table/list',
			data: {
				params: {
					page: this.params.page
				}
			}
		})
			.then((res) => {
				if (res.code == "200") {
					res.result.list.map((item, index) => {
						item.key = index
					})
					this.setState({
						dataSource2: res.result.list,
						selectedRowKes: [],
						selectedRows: null,
						pagination: Utils.pagination(res, (current) => {
							//获取当前所在页
							_this.params.page = current;
							this.request()
						})
					})
				}
			})
	}

	onRowClick = (record, index) => {
		let selectKey = [index]
		// console.log(index);
		Modal.info({
			title: '信息',
			content: `用户名：${record.userName}, 用户爱好：${record.interest}`
		})
		this.setState({
			selectedRowKes: selectKey,
			selectedItem: record
		})
	}

	//多选执行删除动作
	handleDelete = () => {
		let rows = this.state.selectedRows;
		let ids = []
		rows.map((item) => {
			ids.push(item.id)
		})
		Modal.confirm({
			title: '删除提示',
			content: `您确定要删除这些数据嘛？${ids.join(',')}`,
			onOk: () => {
				message.success('删除成功!!')
				this.request()
			}
		})
	}

	render() {
		//定义第一个表格列的配置描述
		const columns = [
			{
				title: 'id',
				dataIndex: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'userName',
			},
			{
				title: '性别',
				dataIndex: 'sex',
			},
			{
				title: '状态',
				dataIndex: 'state',
			},
			{
				title: '爱好',
				dataIndex: 'interest',
			},
			{
				title: '生日',
				dataIndex: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'time',
			}
		]

		//定义第二个表格列的配置描述
		const columns2 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: "id"
			},
			{
				title: '用户名',
				dataIndex: 'userName',
				key: "userName"
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: "sex",
				render(sex) {
					return sex == 1 ? "男" : "女"
				}
			},
			{
				title: '状态',
				dataIndex: 'state',
				key: 'state',
				render(state) {
					let config = {
						'1': '休息',
						'2': '工作',
						'3': '运动',
						'4': '娱乐',
						'5': '五湖四海的游玩',
					}
					return config[state]
				}
			},
			{
				title: '爱好',
				dataIndex: 'interest',
				key: 'interest',
				render(interest) {
					let config = {
						'1': '羽毛球',
						'2': '跑步',
						'3': '踢毽子',
						'4': '打篮球'
					}
					return config[interest]
				}

			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday'
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address'
			},
			{
				title: '早起时间',
				dataIndex: 'time',
				key: 'time'
			}
		]

		//指定单选按钮的相关属性
		const { selectedRowKes } = this.state
		const rowSelection = {
			type: 'radio',
			selectedRowKes
		}

		//指定多选按钮的相关属性
		const rowCheckSelection = {
			type: 'checkbox',
			selectedRowKes,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys,
					selectedRows
				})
			}
		}

		return (
			<div>
				<Card title="基础表格" className="card-wrap">
					<Table
						bordered
						dataSource={this.state.dataSource}
						columns={columns}
						pagination={false}
					/>
				</Card>

				<Card title="动态数据渲染表格-Mock" style={{ margin: '10px 0' }} className="card-wrap">
					<Table
						bordered
						dataSource={this.state.dataSource2}
						columns={columns2}
						pagination={false}
					/>
				</Card>

				<Card title="Mock-单选" style={{ margin: '10px 0' }} className="card-wrap">
					<Table
						bordered
						rowSelection={rowSelection}
						onRow={(record, index) => {
							return {
								onChange: () => {
									this.onRowClick(record, index)
								}
							}
						}}
						dataSource={this.state.dataSource2}
						columns={columns2}
						pagination={false}
					/>
				</Card>

				<Card title="Mock-多选" style={{ margin: '10px 0' }} className="card-wrap">
					<div style={{ marginBottom: 10 }}>
						<Button onClick={this.handleDelete}>删除按钮</Button>
					</div>
					<Table
						bordered
						rowSelection={rowCheckSelection}
						dataSource={this.state.dataSource2}
						columns={columns2}
						pagination={false}
					/>
				</Card>

				<Card title="Mock-表格分页" style={{ margin: '10px 0' }} className="card-wrap">
					<Table
						bordered
						columns={columns2}
						dataSource={this.state.dataSource2}
						pagination={this.state.pagination}
					/>
				</Card>
			</div>
		)
	}
}