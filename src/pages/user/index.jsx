import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd'
import {
	DeleteOutlined,
	PlusOutlined,
	AlignLeftOutlined,
	FormOutlined,
} from '@ant-design/icons';
import axios from './../../axios'
import moment from 'moment'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm/'
import ETable from './../../components/ETable'
const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group
const Option = Select.Option

export default class User extends Component {
	formRef = React.createRef()

	state = {
		isVisible: false
	}

	params = {
		page: 1
	}

	//定义一个全局对象formList数组来储存表单类型、label、id等需要用到的信息组成的对象，每一组信息组成一个对象
	formList = [
		{
			type: 'INPUT',
			label: '用户名',
			field: 'user_name',
			placeholder: '请输入用户名称',
			// width: 80,
		},
		{
			type: 'INPUT',
			label: '用户手机号',
			field: 'user_mobile',
			placeholder: '请输入用户手机号',
			width: 80,
		},
		{
			type: 'DATE',
			label: '请选择入职日期',
			field: 'user_date',
			placeholder: '请输入日期',
			// width: 80,
		}
	]

	componentDidMount() {
		this.requestList()
	}

	handleFilter = (params) => {
		this.params = params;
		this.requestList();
	}

	requestList = () => {
		axios.requestList(this, '/user/list', this.params)
	}

	//功能区操作
	handleOperate = (type) => {
		let item = this.state.selectedItem //获取当前选中的列表项为item
		if (type == 'create') {
			console.log('你已经触发了创建员工的功能按钮啦');
			this.setState({
				type,
				isVisible: true,
				title: '创建员工'
			})
		} else if (type == 'edit') {
			if (!item) {
				Modal.info({
					title: '提示',
					content: '请选择一个用户'
				})
				return;
			}
			this.setState({
				type,
				isVisible: true,
				title: '编辑员工',
				userInfo: item
			})
		} else if (type == 'detail') {
			this.setState({
				type,
				isVisible: true,
				title: '员工详情'
			})
		} else {
			if (!item) {
				Modal.info({
					title: "提示",
					content: '请选择一个用户'
				})
				return
			}
			let _this = this
			Modal.confirm({
				title: '确认删除',
				content: '是否要删除当前选中的员工信息',
				onOk() {
					axios.ajax({
						url: '/user/delete',
						data: {
							params: {
								id: item.id
							}
						}
					})
						.then((res) => {
							if(res.code == 200) {
								_this.setState({
									isVisible: false
								})
								_this.requestList();
							}
						})
				}
			})
		}
	}

	//创建员工弹窗的提交按钮
	handleSubmit = () => {
		const form = this.formRef.current
		const type = this.state.type
		console.log("form的方法有：", form);
		const data = form.formRef.current.getFieldsValue()
		console.log("表单选择后的获取的字段值：@：", data);
		axios.ajax({
			url: type == "create" ? '/user/add' : '/user/edit',
			data: {
				params: data
			}
		})
			.then((res) => {
				if (res.code == 200) {
					this.setState({
						isVisible: false
					})
					this.requestList();
				}
			})
	}

	render() {
		const columns = [
			{
				title: 'id',
				dataIndex: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'username',
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
				title: '联系地址',
				dataIndex: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'time',
			}
		]

		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>

				<Card className="card-wrap">
					<Button type="primary" icon={<PlusOutlined />} onClick={() => this.handleOperate("create")}>创建员工</Button>
					<Button type="primary" icon={<FormOutlined />} onClick={() => this.handleOperate("edit")}>编辑员工</Button>
					<Button type="primary" icon={<AlignLeftOutlined />} onClick={() => this.handleOperate("detail")}>员工详情</Button>
					<Button type="primary" icon={<DeleteOutlined />} onClick={() => this.handleOperate("delete")}>删除员工</Button>
				</Card>

				{/* 定义表格 */}
				<div className="content-wrap">
					<ETable
						updateSelectedItem={Utils.updateSelectedItem.bind(this)}
						columns={columns}
						dataSource={this.state.list}
						// selectedIds={this.state.selectedIds}
						selectedItem={this.state.selectedItem}
						selectedRowKes={this.state.selectedRowKeys}
						pagination={false}
					/>
				</div>

				<Modal
					title={this.state.title}
					visible={this.state.isVisible}
					onOk={this.handleSubmit}
					onCancel={() => {
						this.setState({
							isVisible: false
						})
					}}
				>
					<UserForm type={this.state.type} userInfo={this.state.userInfo} ref={this.formRef}></UserForm>
				</Modal>

			</div >
		)
	}
}

//定义模态框中的表单布局
class UserForm extends Component {
	formRef = React.createRef()
	render() {
		let type = this.props.type
		let userInfo = this.props.userInfo


		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		}

		return (
			<Form label="horizontal" ref={this.formRef}>
				<FormItem
					name="name"
					label="用户名"
					{...formItemLayout}
				>
					<Input type="text" placeholder="请输入用户名" />
				</FormItem>

				<FormItem name="sex" label="性别" {...formItemLayout} >
					<RadioGroup>
						<Radio value="1">男</Radio>
						<Radio value="2">女</Radio>
					</RadioGroup>
				</FormItem>

				<FormItem name="state" label="状态" {...formItemLayout} >
					<Select>
						<Option value={1}>咸鱼一条</Option>
						<Option value={2}>风华浪子</Option>
						<Option value={3}>安踏运动</Option>
						<Option value={4}>百度网盘</Option>
						<Option value={5}>就业者</Option>
					</Select>
				</FormItem>

				<FormItem name="date"
					label="日期"
					{...formItemLayout}
				>
					<DatePicker />
				</FormItem>

				<FormItem name="address" label="联系地址" {...formItemLayout} >
					<TextArea rows={3} placeholder="请输入联系地址" />
				</FormItem>
			</Form>
		)
	}
}