import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

export default {
	formDate(time) {
		if (!time) return '';  //判断如果没有时间，则直接返回空
		let date = new Date(time)
		let Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours() //判断当前小时是否小于10，如果小于10，则为数据前添加0
		let Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() //判断当前分钟是否小于10，如果小于10，则为数据前添加0
		let Seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds() //判断当前秒数是否小于10，如果小于10，则为数据前添加0
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + Hours + ':' + Minutes + ':' + Seconds //按照一定的日期时间格式返回当前日期和时间
	},

	//定义分页的公共机制
	pagination(data, callback) {
		return {
			onChange: (current) => {
				callback(current)
			},
			current: data.result.page,          //接收当前页码
			pageSize: data.result.page_size,  //接收每页展示的条数
			total: data.result.total,        //接收总的数据条数
			showTotal: () => {              //用于显示数据总量和当前数据顺序
				return `共${data.result.total_count}条`
			},
			showQuickJumper: true	       //是否可以快速跳转至某页
		}
	},

	//
	getOptionList(data) {
		if (!data) {
			return [];
		}
		let options = []
		data.map((item) => {
			options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
		})
		return options;
	},

	updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
		if (selectedIds) {
			this.setState({
				selectedRowKeys,
				selectedItem,
				selectedIds
			})
		}
		this.setState({
			selectedRowKeys,
			selectedItem
		})
	}
}