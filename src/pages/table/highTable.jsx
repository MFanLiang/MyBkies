import React, { Component } from 'react'
import { Button, Card, Table, Badge, Modal, message } from 'antd'
import axios from './../../axios/index'
import './base.less'

export default class HighTable extends Component {

	state = {

	}

	params = {
		page: 1
	}

	componentDidMount() {
		this.request()
	}

	//动态获取mock数据
	request = () => {
		axios.ajax({
			url: '/table/high/list',
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
						dataSource: res.result.list,
					})
				}
			})
	}

	handleChange = (pagination, filters, sorter) => {
		// console.log(sorter);
		this.setState({
			sortOrder: sorter.order
		})
	}

	handleDelete = (item) => {
		let id = item.id
		Modal.confirm({
			title: '确认',
			content: '您确认要删除此条数据嘛？',
			onOk: () => {
				message.success("删除成功")
				this.request()
			}
		})
	}

	render() {
		//定义第一个表格列的配置信息描述
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
				render(sex) {
					return sex == 1 ? '男' : '女'
				}
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

		//定义第二个表格列的配置信息描述
		const columns2 = [
			{
				title: 'id',
				dataIndex: 'id',
				fixed: 'left',
				width: 60
			},
			{
				title: '用户名',
				dataIndex: 'userName',
				fixed: 'left',
				width: 90
			},
			{
				title: '性别',
				dataIndex: 'sex',
				render(sex) {
					return sex == 1 ? '男' : '女'
				}
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
				width: 240,
				dataIndex: 'birthday',
			},
			{
				title: '生日',
				width: 240,
				dataIndex: 'birthday',
			},
			{
				title: '生日',
				width: 240,
				dataIndex: 'birthday',
			},
			{
				title: '生日',
				width: 240,
				dataIndex: 'birthday',
			},
			{
				title: '生日',
				width: 240,
				dataIndex: 'birthday',
			},
			{
				title: '生日',
				width: 240,
				dataIndex: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'time',
				fixed: 'right'
			}
		]

		//定义第三个表格列的配置信息描述
		const columns3 = [
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
				render(sex) {
					return sex == 1 ? '男' : '女'
				}
			},
			{
				title: '年龄',
				dataIndex: 'age',
				sorter: (a, b) => {
					return a.age - b.age
				},
				sortOrder: this.state.sortOrder,
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

		//定义第四个表格列的配置信息描述
		const columns4 = [
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
				render(sex) {
					return sex == 1 ? '男' : '女'
				}
			},
			{
				title: '年龄',
				dataIndex: 'age',
			},
			{
				title: '状态',
				dataIndex: 'state',
			},
			{
				title: '爱好',
				dataIndex: 'interest',
				render(interest) {
					let config = {
						'1': <Badge status="success" text="游泳" />,
						'2': <Badge status="warning" text="跑步" />,
						'3': <Badge status="error" text="登山" />,
						'4': <Badge status="processing" text="周游五湖四海" />,
					}
					return config[interest]
				},
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
				title: '操作',
				render: () => {
					return <Button size="small" onClick={(item) => {this.handleDelete(item)}}>删除</Button>
				}
			}
		]

		return (
			<div>
				<Card title="头部固定" className="card-wrap">
					<Table
						bordered
						columns={columns}
						dataSource={this.state.dataSource}
						pagination={false}
						scroll={{ y: 230 }}
					/>
				</Card>

				<Card title="左侧固定" style={{ margin: '10px 0' }} className="card-wrap">
					<Table
						bordered
						dataSource={this.state.dataSource}
						columns={columns2}
						pagination={false}
						scroll={{ x: 2800 }}
					/>
				</Card>

				<Card title="表格排序" style={{ margin: '10px 0' }} className="card-wrap">
					<Table
						bordered
						dataSource={this.state.dataSource}
						columns={columns3}
						pagination={false}
						onChange={this.handleChange}
					/>
				</Card>

				<Card title="操作按钮" style={{ margin: '10px 0' }} className="card-wrap">
					<Table
						bordered
						columns={columns4}
						dataSource={this.state.dataSource}
						pagination={false}
					/>
				</Card>
			</div>
		)
	}
}