import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, UnlockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './login.less'

const FormItem = Form.Item

export default class FormLogin extends Component {

	//通过 Ref 来获取 Form 实例
	formRef = React.createRef()

	//通过 Form 的 Submit监听 得到字段值
	//提交表单且数据验证成功后回调事件
	onFinish = values => {
		console.log("##@@", values);
		let userName = values.name
		let userPwd = values.pwd
		message.success(`恭喜您，${userName}，您已经通过登录啦，当前登录密码为：${userPwd}`);
	}

	getValue = () => {
		//得到 Form 实例
		const form = this.formRef.current
		//使用 getFieldValue 来获取多个字段值
		const values = form.getFieldValue(['name', 'age'])
		console.log(values);
	}

	getValidateValues = async () => {
		const form = this.formRef.current
		//使用 validateFields 获取验证后字段值
		try {
			const values = await form.validateFields(['name', 'age'])
			console.log(values);
		} catch (err) {
			console.log(err);
		}
	}

	onChange(e) {
		console.log(`checked = ${e.target.checked}`);
	}

	render() {
		const { Item } = Form
		return (
			<div>
				<Card title="登录行内表单" className="card-wrap">
					<Form layout="inline">
						<FormItem>
							<Input placeholder="请输入用户名" />
						</FormItem>
						<FormItem>
							<Input placeholder="请输入密码" />
						</FormItem>
						<FormItem>
							<Button type="primary">登录</Button>
						</FormItem>
					</Form>
				</Card>

				<Card title="登录水平表单" className="card-wrap">
					<Form ref={this.formRef} onFinish={this.onFinish} style={{ width: 300 }}>
						<Item name="name" rules={[
							{ required: true, message: '*请输入姓名！' },
							{ min: 2, max: 5, message: '用户名长度不在范围内' },
							{ pattern: new RegExp('^\\w+$', 'g'), message: "用户名必须为字母或数字" }
						]}>
							<Input prefix={<UserOutlined />} />
						</Item>
						<Item name="pwd" rules={[
							{ required: true, message: '*请输入密码！' },
							{ min: 7, max: 12, message: "密码长度不在范围内！" },
						]}>
							<Input.Password prefix={<UnlockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
						</Item>
						<Item>
							<Checkbox defaultChecked={true} onChange={this.onChange}>记住密码</Checkbox>
							<a href="javascript" style={{ float: 'right' }}>忘记密码</a>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit">提交</Button>
						</Item>
					</Form>
				</Card>
			</div>
		)
	}
}