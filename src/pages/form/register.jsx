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
				<Card title="????????????" className="card-wrap">
					<Form>
						<Item name="name" label="?????????" {...formItemLayout} rules={[
							{ required: true, message: '*??????????????????' }
						]}>
							<Input placeholder="??????????????????" />
						</Item>

						<Item name="pwd" label="??????" {...formItemLayout} rules={[
							{ required: true, message: '*??????????????????' }
						]}>
							<Input placeholder="???????????????" />
						</Item>

						<Item label="??????" {...formItemLayout} rules={[
							{ required: true, message: "*??????????????????" }
						]}>
							<Radio.Group {...formItemLayout} defaultValue="1">
								<Radio value="1">???</Radio>
								<Radio value="2">???</Radio>
							</Radio.Group>
						</Item>

						<Item label="??????" {...formItemLayout} >
							<InputNumber defaultValue={18} style={{ width: 120 }} />
						</Item>

						<Item label="????????????" {...formItemLayout}>
							<Select {...formItemLayout} defaultValue="1">
								<Option value="0">????????????</Option>
								<Option value="1">????????????</Option>
								<Option value="2">????????????</Option>
								<Option value="3">?????????</Option>
							</Select>
						</Item>

						<Item label="??????01" {...formItemLayout}>
							<Select {...formItemLayout} defaultValue={['1', '0', '5', '7']} mode="multiple">
								<Option value="0">??????</Option>
								<Option value="1">?????????</Option>
								<Option value="2">??????</Option>
								<Option value="3">??????</Option>
								<Option value="4">??????</Option>
								<Option value="5">??????</Option>
								<Option value="6">??????</Option>
								<Option value="7">??????</Option>
								<Option value="8">???K</Option>
								<Option value="9">??????</Option>
							</Select>
						</Item>

						<Item label="??????02" {...formItemLayout}>
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

						<Item label="????????????" {...formItemLayout}>
							<Switch defaultChecked onChange={onChange} />
						</Item>

						<Item label="??????" {...formItemLayout}>
							<DatePicker />
						</Item>

						<Item label="????????????" {...formItemLayout}>
							<TextArea autoSize={RowObject} defaultValue="????????????????????????????????????" />
						</Item>

						<Item label="????????????" {...formItemLayout}>
							<TimePicker
								showTime
								format="YYYY-MM-DD hh:mm:ss A" />
						</Item>

						<Item label="??????" {...formItemLayout}>
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
							<Checkbox>???????????????<a href="javascript:;">?????????????????????</a></Checkbox>
						</Item>

						<Item {...offsetLayout}>
							<Button type="primary">
								??????
							</Button>
						</Item>

					</Form>
				</Card>
			</div>
		)
	}
}