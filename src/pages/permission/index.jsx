import React, { Component } from 'react'
import { Card, Button, Modal, Select, Input, Form, message, Tree, Transfer } from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import menuConfig from './../../config/menuConfig'
import axios from './../../axios'
import './../../style/common.less'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option
// const TreeNode = Tree.TreeNode

export default class PermissionUser extends Component {
	formRef = React.createRef()
	state = {
		isRoleVisible: false,
		isUserVisible: false
	}

	componentDidMount() {
		axios.requestList(this, '/role/list', {})
	}

	//打开创建角色的弹框
	handleRole = () => {
		this.setState({
			isRoleVisible: true
		})
	}

	//打开设置设置权限的弹框
	handlePermission = () => {
		let item = this.state.selectedItem;
		if (item == undefined) {
			Modal.info({
				content: '请选择一个角色'
			})
			return;
		}
		this.setState({
			isPermVisible: true,
			detailInfo: item
		})
	}

	//角色提交按钮
	handleRoleSubmit = () => {
		const data = this.formRef.current
		const datas = data.formRef.current.getFieldsValue()
		axios.ajax({
			url: 'role/create',
			data: {
				params: datas
			}
		})
			.then((res) => {
				if (res.code == 200) {
					this.setState({
						isRoleVisible: false
					})
					message.success('角色创建成功');
					data.formRef.current.resetFields()
					axios.requestList(this, '/role/list', {})
				}
			})
	}

	//权限提交按钮
	handlePermSubmit = () => {
		this.setState({ isPermVisible: false })
		message.success('权限设置成功')
	}

	//用户授权按钮
	handleUserAuth = () => {
		let item = this.state.selectedItem;
		if (item == undefined) {
			Modal.info({
				content: '请选择一个角色'
			})
			return;
		}
		this.setState({
			isUserVisible: true,
			detailInfo: item
		})
		this.getRoleUserList(item.id)
	}

	//获取接口数据的角色用户列表
	getRoleUserList = (id) => {
		axios.ajax({
			url: '/role/user_list',
			data: {
				params: {
					id
				}
			}
		})
			.then((response) => {
				if (response.code == 200) {
					console.log("获取到接口数据的角色用户列表的数据是：=+++：", response.result);
					this.getAuthUserList(response.result)
				}
			})
	}

	//筛选目标用户
	getAuthUserList = (filetData) => {
		const dataSource = [];              //定义初始的数据源
		const targetKeys = [];              //显示在右侧框数据的 key 集合
		if (filetData && filetData.length > 0) {  //判断如果传入的数据（通过/role/user_list接口返回的数据）不为空，则进行下面代码的处理
			for (let i = 0; i < filetData.length; i++) {
				const data = {
					key: filetData[i].user_id,  //指定数据的id值
					title: filetData[i].user_name,   //指定数据的标题（用户名称）
					status: filetData[i].status
				}
				if (data.status == 1) {
					targetKeys.push(data.key)
				}
				dataSource.push(data)
			}
			this.setState({
				dataSource, targetKeys
			})
		}
	}

	//用户授权提交
	handleUserSubmit = () => {
		let data = {}
		data.user_ids = this.state.targetKeys
		data.role_id = this.state.selectedItem.id;
		axios.ajax({
			url: '/role/user_role_edit',
			data: {
				params: {
					...data
				}
			}
		})
		.then((response) => {
			if(response){
				this.setState({
					isUserVisible: false
				})
				axios.requestList(this, '/role/user_role_edit', {})
			}
		})
	}

	render() {
		const columns = [
			{
				title: '角色ID',
				dataIndex: 'id'
			},
			{
				title: '角色名称',
				dataIndex: 'role_name'
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				render: Utils.formDate
			},
			{
				title: '使用状态',
				dataIndex: 'status',
				render(status) {
					return status == 1 ? '启用' : '停用'
				}
			},
			{
				title: '授权时间',
				dataIndex: 'authorize_time',
				render: Utils.formDate
			},
			{
				title: '授权人',
				dataIndex: 'authorize_user_name'
			}
		]
		return (
			<div>
				<Card className="card-wrap">
					<Button type="primary" onClick={this.handleRole}>创建角色</Button>
					<Button type="primary" onClick={this.handlePermission}>设置权限</Button>
					<Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
				</Card>

				<div className="content-wrap">
					<ETable
						dataSource={this.state.list}  //数据源
						columns={columns}  //表格列的配置描述
						updateSelectedItem={Utils.updateSelectedItem.bind(this)}
						selectedRowKeys={this.state.selectedRowKeys}
					/>
				</div>

				<Modal
					title='创建角色'
					forceRender
					visible={this.state.isRoleVisible}
					onOk={this.handleRoleSubmit}
					onCancel={() => {
						//点击返回按钮后，需要对已选择的表单进行重置
						const form = this.formRef.current
						form.formRef.current.resetFields()
						this.setState({
							isRoleVisible: false
						})
					}}
				>
					<RoleForm ref={this.formRef}></RoleForm>
				</Modal>

				<Modal
					title="设置权限"
					visible={this.state.isPermVisible}
					width={600}
					onOk={this.handlePermSubmit}
					onCancel={() => {
						this.setState({
							isPermVisible: false
						})
					}}
				>
					<PermEditForm detailInfo={this.state.detailInfo}></PermEditForm>
				</Modal>

				<Modal
					title="用户授权"
					visible={this.state.isUserVisible}
					width={800}
					onOk={this.handleUserSubmit}
					onCancel={() => {
						this.setState({
							isUserVisible: false
						})
					}}
				>
					<RoleAuthForm
						ref={this.formRef}
						detailInfo={this.state.detailInfo}
						dataSource={this.state.dataSource}
						targetKeys={this.state.targetKeys}
						patchUserInfo={(targetKeys) => {
							this.setState({ targetKeys })
						}}
					/>
				</Modal>
			</div>
		)
	}
}

//定义模态框中的表单布局
//角色弹框的列表
class RoleForm extends Component {
	formRef = React.createRef()
	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		}

		return (
			<Form label="horizontal" ref={this.formRef}>
				<FormItem
					name="role_name"
					label="角色名称"
					{...formItemLayout}
				>
					<Input type="text" placeholder="请输入角色名称" />
				</FormItem>

				<FormItem name="state" label="状态" {...formItemLayout} >
					<Select>
						<Option value={1}>开启</Option>
						<Option value={0}>关闭</Option>
					</Select>
				</FormItem>
			</Form>
		)
	}
}

//设置权限的列表
class PermEditForm extends Component {
	//使用递归函数将menuConfig的数据渲染到页面
	// renderTreeNodes = (data) => {
	// 	return data.map((item) => {
	// 		if (item.children) {
	// 			return <TreeNode title={item.title} key={item.key}>
	// 				{this.renderTreeNodes(item.children)}
	// 			</TreeNode>
	// 		} else {
	// 			return <TreeNode title={item.title} key={item.key}></TreeNode>
	// 		}
	// 	})
	// }

	formRef = React.createRef()
	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		}
		const detail_Info = this.props.detailInfo

		const treeData = [
			{
				title: '平台权限',
				key: '0-0',
				children: [
					{
						title: '平台',
						key: '0-0-0',
					},
					{
						title: 'UI',
						key: '0-0-1',
					},
					{
						title: '表单',
						key: '0-0-2',
					},
					{
						title: '表格',
						key: '0-0-3',
						children: [
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										基础表格
									</span>
								),
								key: '0-0-0-1',
							},
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										高级表格
									</span>
								),
								key: '0-0-0-2',
							}
						]
					},
					{
						title: '富文本',
						key: '0-0-4',
					},
					{
						title: '城市管理',
						key: '0-0-5',
					},
					{
						title: '订单',
						key: '0-0-6',
						children: [
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										订单详情
									</span>
								),
								key: '0-0-0-3',
							},
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										结束订单
									</span>
								),
								key: '0-0-0-4',
							}
						]
					},
					{
						title: '员工管理',
						key: '0-0-7'
					},
					{
						title: '车辆地图',
						key: '0-0-8'
					},
					{
						title: '图标',
						key: '0-0-9',
						children: [
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										柱形图
									</span>
								),
								key: '0-0-0-5',
							},
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										饼图
									</span>
								),
								key: '0-0-0-6',
							},
							{
								title: (
									<span
										style={{
											color: '#1890ff',
										}}
									>
										折线图
									</span>
								),
								key: '0-0-0-7',
							}
						]
					},
					{
						title: '权限设置',
						key: '0-1-0'
					}
				],
			},
		];

		const onSelect = (selectedKeys, info) => {
			console.log('selected', selectedKeys, info);
		};

		const onCheck = (checkedKeys, info) => {
			console.log('onCheck', checkedKeys, info);
		};

		return (
			<Form label="horizontal" ref={this.formRef}>
				<FormItem
					name="role_name"
					label="角色名称"
					{...formItemLayout}
				>
					<Input disabled placeholder={detail_Info.role_name} />
				</FormItem>

				<FormItem name="state" label="状态" {...formItemLayout} >
					<Select>
						<Option value={1}>启用</Option>
						<Option value={0}>停用</Option>
					</Select>
				</FormItem>

				<Tree
					checkable
					defaultExpandedKeys={['0-0-0', '0-0-1']}  //默认展开指定的树节点
					defaultSelectedKeys={['0-0-0', '0-0-1']}  //默认选中的树节点
					defaultCheckedKeys={['0-0-0', '0-0-1']}  //默认选中复选框的树节点
					onSelect={onSelect}  //点击树节点触发的回调函数
					onCheck={onCheck}  //点击复选框触发的回调函数
					showLine={true} //是否展开连接线
					// treeData={this.renderTreeNodes(menuConfig)}
					treeData={treeData}
				>

				</Tree>
			</Form >
		)
	}
}

//设置权限的列表
class RoleAuthForm extends Component {
	formRef = React.createRef()
	filterOption = (inputValue, option) => {
		return option.title.indexOf(inputValue) > -1;
	}

	handleChange = (targetKeys) => {
		this.props.patchUserInfo(targetKeys)
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		}
		const detail_Info = this.props.detailInfo

		return (
			<Form label="horizontal" ref={this.formRef}>
				<FormItem
					name="role_name"
					label="角色名称"
					{...formItemLayout}
				>
					<Input disabled placeholder={detail_Info.role_name} />
				</FormItem>
				<FormItem label="选择用户" {...formItemLayout}>
					<Transfer
						dataSource={this.props.dataSource}
						titles={['待选用户', '已选用户']}
						showSearch
						searchPlaceholder="输入用户名"
						filterOption={this.filterOption}
						targetKeys={this.props.targetKeys}
						onChange={this.handleChange}
						render={item => item.title}
					/>
				</FormItem>
			</Form>
		)
	}
}