import React, { Component } from 'react'
import { Button, Card, message, Space } from 'antd'
import './ui.less'

export default class Message extends Component {

	info = () => {
		message.info('This is a normal message');
	};

	mes = (type) => {
		message[type]('This is a success message');
	};

	render() {
		let { info, mes } = this
		return (
			<div>
				<Card title="全局提示Messages" className="card-wrap">
					<Button type="primary" onClick={info}>
						Display normal message
					</Button>
				</Card>
				<Card title="其他提示信息">
					<Space>
						<Button onClick={() => mes("success")} type="primary">Success</Button>
						<Button danger onClick={() => mes("error")} type="primary">Error</Button>
						<Button onClick={() => mes("warning")} type="primary">Warning</Button>
					</Space>
				</Card>

			</div>
		)
	}
}
