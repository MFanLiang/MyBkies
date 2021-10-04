import React, { Component } from 'react'
import { Card, Button, Menu, Dropdown, Radio } from 'antd'
import {
	DownloadOutlined,
	PlusOutlined,
	DeleteOutlined,
	FormOutlined,
	SearchOutlined,
	PoweroffOutlined,
	LeftOutlined,
	RightOutlined
} from '@ant-design/icons';
import './ui.less'

//定义下拉菜单
const menu = (
	<Menu onClick={handleMenuClick}>
		<Menu.Item key="1">1st item</Menu.Item>
		<Menu.Item key="2">2nd item</Menu.Item>
		<Menu.Item key="3">3rd item</Menu.Item>
	</Menu>
);

//定义点击下拉菜单按钮的事件，默认在控制台打印当前按钮的事件对象
function handleMenuClick(e) {
	console.log('click', e);
}

export default class Buttons extends Component {
	//初始化状态
	state = {
		size: 'large',
		loadings: [],
	};

	// 按钮加载时长控制函数
	enterLoading = index => {
		this.setState(({ loadings }) => {
			const newLoadings = [...loadings];
			newLoadings[index] = true;

			return {
				loadings: newLoadings,
			};
		});
		setTimeout(() => {
			this.setState(({ loadings }) => {
				const newLoadings = [...loadings];
				newLoadings[index] = false;

				return {
					loadings: newLoadings,
				};
			});
		}, 3000);
	};

	//修改按钮的尺寸大小
	handleSizeChange = (e) => {
		this.setState({ size: e.target.value })
	}

	render() {
		let { size, loadings } = this.state
		return (
			<div>
				<Card className="card-wrap" title="基础按钮">
					<Button type="primary">按钮01</Button>
					<Button type="dashed">按钮02</Button>
					<Button type="danger">按钮03</Button>
					<Button disabled>按钮04</Button>
				</Card>

				<Card className="card-wrap" title="图形按钮">
					<Button><PlusOutlined />创建</Button>
					<Button><FormOutlined />编辑</Button>
					<Button><DeleteOutlined />删除</Button>
					<Button type="primary" shape="circle">A</Button>
					<Button type="primary" icon={<SearchOutlined />}>Search</Button>
					<Button type="primary" shape="round" icon={<DownloadOutlined />}>Download</Button>
					<Button type="primary" icon={<DownloadOutlined />}>Download</Button>
				</Card>

				<Card className="card-wrap" title="Loading按钮">
					<Button type="primary" loading>确定</Button>
					<Button type="primary" icon={<PoweroffOutlined />} loading />
					<Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
						Click me!
					</Button>
					<Button
						type="primary"
						icon={<PoweroffOutlined />}
						loading={loadings[1]}
						onClick={() => this.enterLoading(1)}
					>
						Click me!
					</Button>
					<Button
						type="primary"
						icon={<PoweroffOutlined />}
						loading={loadings[2]}
						onClick={() => this.enterLoading(2)}
					/>
				</Card>

				<Card className="card-wrap" title="下拉框按钮展示">
					<Button type="primary">primary</Button>
					<Button>secondary</Button>
					<Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
				</Card>

				<Card title="按钮组">
					<Button.Group>
						<Button type="primary"><LeftOutlined />返回</Button>
						<Button type="primary">前进<RightOutlined /></Button>
					</Button.Group>
				</Card>

				<Card className="card-wrap" title="按钮尺寸">
					<Radio.Group value={size} onChange={this.handleSizeChange}>
						<Radio value="small">小</Radio>
						<Radio value="default">中</Radio>
						<Radio value="large">大</Radio>
					</Radio.Group>
					<Button size={size} type="primary">按钮01</Button>
					<Button size={size} type="dashed">按钮02</Button>
					<Button size={size} type="danger">按钮03</Button>
					<Button size={size} disabled>按钮04</Button>
				</Card>
			</div >
		)
	}
}
