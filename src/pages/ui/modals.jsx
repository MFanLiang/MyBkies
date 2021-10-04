import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends Component {

	state = {
		isModalVisible1: false,
		isModalVisible2: false,
		isModalVisible3: false,
		isModalVisible4: false
	}

	handleOpen = (type) => {
		this.setState({ [type]: true })
	}

	handleOK = (type) => {
		this.setState({ [type]: false })
	}

	handleCancel = (type) => {
		this.setState({ [type]: false })
	}

	handConfirm = (type) => {
			Modal[type]({
				title: "确认？",
				content: "你确定要退出嘛？",
				onOk() {
					console.log("OK");
				},
				onCancel() {
					console.log("onCancel");
				}
			})
	}

	render() {
		let { handleOpen, handleOK, handleCancel, handConfirm } = this
		let { isModalVisible1, isModalVisible2, isModalVisible3, isModalVisible4 } = this.state
		return (
			<div>

				{/* 基础模态框区域 */}
				<Card title="基础模态框" className="card-wrap">
					<Button type="primary" onClick={() => { handleOpen("isModalVisible1") }}>Open</Button>
					<Button type="primary" onClick={() => { handleOpen("isModalVisible2") }}>自定义页脚</Button>
					<Button type="primary" onClick={() => { handleOpen("isModalVisible3") }}>顶部20px弹框</Button>
					<Button type="primary" onClick={() => { handleOpen("isModalVisible4") }}>水平垂直居中</Button>

					<Modal title="Basic Modal 01"
						visible={isModalVisible1}
						onOk={() => handleOK("isModalVisible1")}
						onCancel={() => handleCancel("isModalVisible1")}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
					<Modal title="Basic Modal 02"
						visible={isModalVisible2}
						onOk={() => handleOK("isModalVisible2")}
						onCancel={() => handleCancel("isModalVisible2")}
						cancelText="好的"
						okText="算了吧"
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
					<Modal title="Basic Modal 03"
						style={{ top: 20 }}
						visible={isModalVisible3}
						onOk={() => handleOK("isModalVisible3")}
						onCancel={() => handleCancel("isModalVisible3")}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
					<Modal title="Basic Modal 03"
						wrapClassName="vertical-center-modal"
						visible={isModalVisible4}
						onOk={() => handleOK("isModalVisible4")}
						onCancel={() => handleCancel("isModalVisible4")}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
				</Card>

				{/* 信息确认框区域 */}
				<Card title="信息确认框区域" className="card-wrap">
					<Button type="primary" onClick={() => handConfirm("info")}>info</Button>
					<Button type="primary" onClick={() => handConfirm("success")}>Success</Button>
					<Button type="primary" onClick={() => handConfirm("error")}>Error</Button>
					<Button type="primary" onClick={() => handConfirm("warning")}>Warning</Button>
				</Card>
			</div>
		)
	}
}