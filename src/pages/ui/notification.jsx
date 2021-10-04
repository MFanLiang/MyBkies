import React, { Component } from 'react'
import { Button, Card, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import './ui.less'

export default class Notification extends Component {

	openNotification = (value) => {
		notification.open({
			placement: value,
			message: 'Notification Title',
			description:
				'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	};

	openNotification02 = (value) => {
		notification.open({
			placement: value,
			message: "Notification Title",
			duration: 0,
			description:
				'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
			onClick: () => {
				console.log('Notification Clicked!');
			},
			icon: <SmileOutlined style={{ color: '#108ee9' }} />
		})
	}

	render() {
		let { openNotification, openNotification02 } = this
		return (
			<div>
				<Card title="通知提醒框" className="card-wrap">
					<Button type="primary" onClick={() => openNotification("topLeft")}>
						左上角弹出提醒框
					</Button>
					<Button type="primary" onClick={() => openNotification("topRight")}>
						右上角弹出提醒框
					</Button>
					<Button type="primary" onClick={() => openNotification("bottomLeft")}>
						左下角弹出提醒框
					</Button>
					<Button type="primary" onClick={() => openNotification("bottomRight")}>
						右小角弹出提醒框
					</Button>
				</Card>
				<Card title="通知自动关闭的延时">
					<Button type="primary" onClick={() => openNotification02("topLeft")}>
						左上角弹出提醒框
					</Button>
				</Card>
			</div>
		)
	}
}