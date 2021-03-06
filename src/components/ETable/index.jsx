import React, { Component } from 'react'
// import Utils from './../../utils/utils'
import { Table } from 'antd'

export default class ETable extends Component {

	onRowClick = (record, index) => {
		let rowSelection = this.props.rowSelection
		if (rowSelection == 'checkbox') {
			let selectedRowKeys = this.props.selectedRowKeys;
			let selectedItem = this.props.selectedItem;
			let selectedIds = this.props.selectedIds;
			if (selectedIds) {
				const i = selectedIds.indexOf(record.id);
				if (i == -1) {
					selectedIds.push(record.id);
					selectedRowKeys.push(index);
					selectedItem.push(record);
				} else {
					selectedIds.splice(i, 1);
					selectedRowKeys.splice(i, 1);
					selectedItem.splice(i, 1);
				}
			} else {
				selectedIds = [record.id];
				selectedRowKeys = [index];
				selectedItem = [record];
			}
			this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
		} else {
			let selectedRowKeys = [index]; //获取选中表单的索引号
			let selectedItem = record  //获取选中表单的所有信息
			this.props.updateSelectedItem(selectedRowKeys, selectedItem)
		}
	}

	//定义初始化表格的方法
	tableInit = () => {
		let selectedRowKeys = this.props.selectedRowKeys
		let row_selection = this.props.rowSelection
		const rowSelection = {
			type: 'radio',
			selectedRowKeys,
			onChange: this.onSelectChange
		}
		if (row_selection === false || row_selection === null) {
			row_selection = false
		} else if (row_selection == 'checkbox') {
			rowSelection.type = 'checkbox'
		} else {
			row_selection = 'radio'
		}

		return <Table
			bordered
			{...this.props}
			rowSelection={row_selection ? rowSelection : null}
			onRow={(record, index) => {
				return {
					onChange: () => {
						if (!row_selection) return false;
						this.onRowClick(record, index)
					}
				}
			}}
		/>
	}

	render() {
		return (
			<div>
				{this.tableInit()}
			</div>
		)
	}
}