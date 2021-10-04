import React, { Component } from 'react'
import { Card, Tabs, message } from 'antd'
import {
	AppleOutlined,
	AndroidOutlined,
	BgColorsOutlined,
	HighlightOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import './ui.less'

const { TabPane } = Tabs;

//tab菜单初始化
const initialPanes = [
	{ title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
	{ title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
	{
		title: 'Tab 3',
		content: 'Content of Tab 3',
		key: '3',
		closable: false,
	},
];

export default class Tags extends Component {

	callback(key) {
		console.log(key);
	}

	handleCallBack = (key) => {
		message.info("Hi, 您选择了页签" + key)
	}

	newTabIndex = 0;

	state = {
		activeKey: initialPanes[0].key,
		panes: initialPanes,
	};

	onChange = activeKey => {
		this.setState({ activeKey });
	};

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};

	add = () => {
		const { panes } = this.state;
		const activeKey = `newTab${this.newTabIndex++}`;
		const newPanes = [...panes];
		newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
		this.setState({
			panes: newPanes,
			activeKey,
		});
	};

	remove = targetKey => {
		const { panes, activeKey } = this.state;
		let newActiveKey = activeKey;
		let lastIndex;
		panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		})
		const newPanes = panes.filter(pane => pane.key !== targetKey);
		if (newPanes.length && newActiveKey === targetKey) {
			if (lastIndex >= 0) {
				newActiveKey = newPanes[lastIndex].key;
			} else {
				newActiveKey = newPanes[0].key;
			}
		}
		this.setState({
			panes: newPanes,
			activeKey: newActiveKey,
		});
	};

	render() {
		let { callback } = this
		const { panes, activeKey } = this.state;
		return (
			<div>
				<Card title="Tab页签" className="card-wrap">
					<Tabs defaultActiveKey="1" onChange={callback}>
						<TabPane tab="Tab 1" key="1">
							Content of Tab Pane 1
						</TabPane>
						<TabPane tab="Tab 2" key="2">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="Tab 3" key="3">
							Content of Tab Pane 3
						</TabPane>
					</Tabs>
				</Card>

				<Card title="Tab页签居中" className="card-wrap">
					<Tabs defaultActiveKey="1" onChange={callback} centered>
						<TabPane tab="Tab 1" key="1">
							Content of Tab Pane 1
						</TabPane>
						<TabPane tab="Tab 2" key="2" disabled>
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="Tab 3" key="3">
							Content of Tab Pane 3
						</TabPane>
					</Tabs>
				</Card>

				<Card title="带有图标的Tab页签" className="card-wrap">
					<Tabs defaultActiveKey="2" onChange={this.handleCallBack}>
						<TabPane
							tab={
								<span>
									<AppleOutlined />
									Tab 1
								</span>
							}
							key="1"
						>
							Tab 1
						</TabPane>
						<TabPane
							tab={
								<span>
									<AndroidOutlined />
									Tab 2
								</span>
							}
							key="2"
						>
							Tab 2
						</TabPane>
						<TabPane
							tab={
								<span>
									<BgColorsOutlined />
									Tab 3
								</span>
							}
							key="3"
						>
							Tab 3
						</TabPane>
						<TabPane
							tab={
								<span>
									<HighlightOutlined />
									Tab 4
								</span>
							}
							key="4"
						>
							Tab 4
						</TabPane>
						<TabPane
							tab={
								<span>
									<DeleteOutlined />
									Tab 5
								</span>
							}
							key="5"
						>
							Tab 5
						</TabPane>
					</Tabs>
				</Card>

				<Card title="新增和关闭页签" className="card-wrap">
					<Tabs
						type="editable-card"
						onChange={this.onChange}
						activeKey={activeKey}
						onEdit={this.onEdit}
					>
						{panes.map(pane => (
							<TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
								{pane.content}
							</TabPane>
						))}
					</Tabs>
				</Card>
			</div>
		)
	}
}


