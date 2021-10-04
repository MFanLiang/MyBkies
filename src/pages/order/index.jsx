import React, { Component } from 'react'
import { Card, Button, Table, Form, Modal, message } from 'antd'
import axios from '../../axios'
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'
import './index.less'
import Utils from '../../utils/utils'

export default class Order extends Component {
	//初始化状态
	state = {
		orderConfirmVisible: false,
		orderInfo: {}
	}

	params = {
		page: 1
	}

	//定义一个全局对象formList数组来储存表单类型、label、id等需要用到的信息组成的对象，每一组信息组成一个对象
	formList = [
		{
			type: 'SELECT',
			label: '城市',
			field: 'city',
			placeholder: '全部',
			initialValue: '1',
			width: 100,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
		},
		{
			type: '时间查询',
			field: 'start_time',
			field1: 'end_time',
		},
		{
			type: 'SELECT',
			label: '订单状态',
			field: 'order_status',
			placeholder: '全部',
			initialValue: '1',
			width: 100,
			list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
		},
	]

	componentDidMount() {
		this.requestList()
	}

	handleFilter = (params) => {
		this.params = params;
		this.requestList();
	}

	//默认请求接口数据
	requestList = () => {
		// let _this = this
		axios.requestList(this, '/order/list', this.params, true)
	}

	//结束订单事件函数
	handleConfirm = () => {
		let item = this.state.selectedItem;
		if (!item) {
			Modal.info({
				title: '信息',
				content: '请选择一条订单，结束操作'
			})
			return;
		}
		axios.ajax({
			url: 'order/ebike_info',
			data: {
				params: {
					orderInfo: item.id
				}
			}
		}).then((res) => {
			if (res.code === '200') {
				this.setState({
					orderInfo: res.result,
					orderConfirmVisible: true
				})
			}
		})
	}

	//结束订单确认按钮的回调函数
	handleFinishOrder = () => {
		let item = this.state.selectedItem;
		axios.ajax({
			url: 'order/finish_order',
			data: {
				params: {
					orderInfo: item.id
				}
			}
		}).then((res) => {
			if (res.code === '200') {
				message.success('订单处理成功')
				this.setState({
					orderConfirmVisible: false
				})
				this.requestList()  //刷新列表
			}
		})
	}

	//订单详情按钮的回调函数
	openOrderDetail = () => {
		let item = this.state.selectedItem;
		if (!item) {
			Modal.info({
				title: '信息',
				content: '请先选择一条订单'
			})
			return;
		}
		window.open(`/#/common/order/detail/${item.id}`, '_blank')
	}

	render() {
		//定义表格中表头的信息部分
		const columns = [
			{
				title: '订单编号',
				dataIndex: 'order_sn',
			},
			{
				title: '车辆编号',
				dataIndex: 'bike_sn',
			},
			{
				title: '用户名',
				dataIndex: 'user_name',
			},
			{
				title: '手机号码',
				dataIndex: 'mobile',
			},
			{
				title: '里程',
				dataIndex: 'distance',
				render(distance) {
					return distance / 1000 + 'Km'
				}
			},
			{
				title: '行程时长',
				dataIndex: 'total_time',
			},
			{
				title: '状态',
				dataIndex: 'status',
			},
			{
				title: '开始时间',
				dataIndex: 'start_time',
			},
			{
				title: '结束时间',
				dataIndex: 'end_time',
			},
			{
				title: '订单金额',
				dataIndex: 'total_fee',
			},
			{
				title: '实付金额',
				dataIndex: 'user_pay',
			}
		]

		//定义栅格布局
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		}

		return (
			<div>
				<Card className="card-wrap">
					<BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>

				<Card className="card-wrap">
					<Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
					<Button type="primary" onClick={this.handleConfirm}>结束订单</Button>
				</Card>

				{/* 定义表格 */}
				<div className="content-wrap">
					<ETable
						updateSelectedItem={Utils.updateSelectedItem.bind(this)}
						columns={columns}
						dataSource={this.state.list}
						selectedIds={this.state.selectedIds}
						selectedItem={this.state.selectedItem}
						selectedRowKes={this.state.selectedRowKeys}
						pagination={this.state.pagination}
					/>
				</div>

				<Modal
					title="结束订单"
					visible={this.state.orderConfirmVisible}
					onCancel={() => {
						this.setState({ orderConfirmVisible: false })
					}}
					onOk={this.handleFinishOrder}
					width={650}
				>
					<Form layout="horizontal" label="结束订单">
						<Form.Item label="车辆编号" {...formItemLayout}>
							{this.state.orderInfo.bike_sn}
						</Form.Item>
						<Form.Item label="剩余电量" {...formItemLayout}>
							{this.state.orderInfo.battery}
						</Form.Item>
						<Form.Item label="行程开始时间" {...formItemLayout}>
							{this.state.orderInfo.start_time}
						</Form.Item>
						<Form.Item label="当前位置" {...formItemLayout}>
							{this.state.orderInfo.location}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}