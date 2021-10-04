import React, { Component } from 'react'
import {
	Card,
	Spin,
	Alert,
	Switch
} from 'antd'
import { SyncOutlined, LoadingOutlined } from '@ant-design/icons'
import './ui.less'

export default class Loadings extends Component {

	state = {
		loading1: false,
		loading2: false
	}

	toggle1 = value => {
		this.setState({ loading1: value });
	};

	toggle2 = value => {
		this.setState({ loading2: value })
	}

	render() {
		return (
			<div>
				<Card title="Spin用法" className="card-wrap">
					<Spin size="small" style={{ marginRight: 50 }} />
					<Spin style={{ marginRight: 50 }} />
					<Spin size="large" style={{ marginRight: 50 }} />
					<SyncOutlined spin style={{ marginRight: 50 }} />
					<LoadingOutlined style={{ marginRight: 50 }} />
				</Card>

				<Card title="遮罩层，卡片加载中">
					<Spin spinning={this.state.loading1}>
						<Alert
							message="Alert message title"
							description="Further details about the context of this alert."
							type="info"
						/>
					</Spin>

					<div style={{ marginTop: 16 }}>
						Loading state：
						<Switch checked={this.state.loading} onChange={this.toggle1} />
					</div>
				</Card>

				<Card title="遮罩层，卡片延迟加载中">
					<Spin spinning={this.state.loading2} delay={1000}>
						<Alert
							message="Alert message title"
							description="Further details about the context of this alert."
							type="info"
						/>
					</Spin>

					<div style={{ marginTop: 16 }}>
						Loading state：
						<Switch checked={this.state.loading} onChange={this.toggle2} />
					</div>
				</Card>
			</div>
		)
	}
}