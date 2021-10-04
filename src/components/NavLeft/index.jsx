import React, { Component } from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import menuList from './../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu

class NavLeft extends Component {
	state = {
		currentKey: ''
	}

	handleClick = ({ item, key }) => {
		const { dispatch } = this.props
		dispatch(switchMenu(item.props.title))
		this.setState({
			currentKey: key
		})
	}

	componentWillMount() {
		const menuTreeNode = this.renderMenu(menuList)
		let currentKey = window.location.hash.replace("/#|\?.*$/g", "")
		this.setState({ menuTreeNode, currentKey })
	}

	//定义递归调用函数，实现左侧菜单的渲染
	renderMenu = (data) => {
		return data.map((items) => {
			if (items.children) {
				return (
					<SubMenu title={items.title} key={items.key}>
						{this.renderMenu(items.children)}
					</SubMenu>
				)
			}
			return <Menu.Item title={items.title} key={items.key}>
				<NavLink to={items.key}>{items.title}</NavLink>
			</Menu.Item>
		})
	}

	render() {
		return (
			<div>
				<div className="logo">
					<img src="resource/assets/logo-ant.svg" alt="" />
					<h1>OFO单车</h1>
				</div>
				<Menu theme="dark"
					onClick={this.handleClick}
					selectedKeys={this.state.currentKey}
				>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	}
}


export default connect()(NavLeft)