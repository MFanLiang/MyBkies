import React, { Component } from 'react'
import {
	Card,
	Form,
	Input,
	Button,
	Select,
	Radio,
	Switch,
	DatePicker,
	TimePicker,
	Upload,
	message,
	Checkbox,
	InputNumber
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './login.less'

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

export default class FormRegister extends Component {

	state = {
		loading: false,
	};

	ImgHandleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			);
		}
	};

	render() {
		const { Item } = Form
		const { Option } = Select;
		const { TextArea } = Input
		const formItemLayout = {
			labelCol: {
				xs: 24,
				sm: 4
			},
			wrapperCol: {
				xs: 24,
				sm: 12
			}
		}
		const offsetLayout = {
			wrapperCol: {
				xs: 24,
				sm: {
					span: 12,
					offset: 4
				}
			}
		}

		const children = [];
		for (let i = 10; i < 36; i++) {
			children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
		}

		const handleChange = (value) => {
			console.log(`selected${value}`);
		}

		const onChange = (checked) => {
			console.log(`switch to ${checked}`);
		}

		const RowObject = {
			minRows: 4, maxRows: 6
		}

		const { loading, imageUrl } = this.state;

		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		)

		return (
			<div>
				<Card title="注册表单" className="card-wrap">
					<Form>
						<Item name="name" label="用户名" {...formItemLayout} rules={[
							{ required: true, message: '*请输入姓名！' }
						]}>
							<Input placeholder="请输入用户名" />
						</Item>

						<Item name="pwd" label="密码" {...formItemLayout} rules={[
							{ required: true, message: '*请输入姓名！' }
						]}>
							<Input placeholder="请输入密码" />
						</Item>

						<Item label="性别" {...formItemLayout} rules={[
							{ required: true, message: "*请选择性别！" }
						]}>
							<Radio.Group {...formItemLayout} defaultValue="1">
								<Radio value="1">男</Radio>
								<Radio value="2">女</Radio>
							</Radio.Group>
						</Item>

						<Item label="年龄" {...formItemLayout} >
							<InputNumber defaultValue={18} style={{ width: 120 }} />
						</Item>

						<Item label="当前状态" {...formItemLayout}>
							<Select {...formItemLayout} defaultValue="1">
								<Option value="0">咸鱼一条</Option>
								<Option value="1">风华浪子</Option>
								<Option value="2">北大才子</Option>
								<Option value="3">云计算</Option>
							</Select>
						</Item>

						<Item label="多选01" {...formItemLayout}>
							<Select {...formItemLayout} defaultValue={['1', '0', '5', '7']} mode="multiple">
								<Option value="0">游泳</Option>
								<Option value="1">打篮球</Option>
								<Option value="2">跑步</Option>
								<Option value="3">爬山</Option>
								<Option value="4">冒险</Option>
								<Option value="5">钓鱼</Option>
								<Option value="6">滑雪</Option>
								<Option value="7">骑行</Option>
								<Option value="8">唱K</Option>
								<Option value="9">周围</Option>
							</Select>
						</Item>

						<Item label="多选02" {...formItemLayout}>
							<Select
								mode="multiple"
								allowClear
								style={{ width: '100%' }}
								placeholder="Please select"
								defaultValue={['a10', 'c12']}
								onChange={handleChange}
							>
								{children}
							</Select>
						</Item>

						<Item label="是否已婚" {...formItemLayout}>
							<Switch defaultChecked onChange={onChange} />
						</Item>

						<Item label="生日" {...formItemLayout}>
							<DatePicker />
						</Item>

						<Item label="联系地址" {...formItemLayout}>
							<TextArea autoSize={RowObject} defaultValue="北京市海淀区奥林匹克公园" />
						</Item>

						<Item label="早起时间" {...formItemLayout}>
							<TimePicker
								showTime
								format="YYYY-MM-DD hh:mm:ss A" />
						</Item>

						<Item label="头像" {...formItemLayout}>
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								beforeUpload={beforeUpload}
								onChange={this.ImgHandleChange}
							>
								{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
							</Upload>
						</Item>

						<Item {...offsetLayout}>
							<Checkbox>我已经阅读<a href="javascript:;">中国联合国宪法</a></Checkbox>
						</Item>

						<Item {...offsetLayout}>
							<Button type="primary">
								注册
							</Button>
						</Item>

					</Form>
				</Card>
			</div>
		)
	}
}