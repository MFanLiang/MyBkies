import React, { Component } from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd'
import Utils from '../../utils/utils'

const FormItem = Form.Item
// const Option = Select.Option

export default class FilterForm extends Component {
	formRef = React.createRef()

	//绑定查询按钮的事件处理函数
	handleFilterSubmit = () => {
		//获取用户选择表单中的数据值
		const form = this.formRef.current
		const values = form.getFieldsValue()

		// console.log("表单获取到的字段值是：", values);

		this.props.filterSubmit(values)
	}

	// 创建一个initFormList方法，用来创建表单项FormItem以及其中的数据。
	initFormList = () => {
		const formList = this.props.formList;
		const formItemList = [];
		if (formList && formList.length > 0) {
			formList.forEach((item) => {
				let label = item.label;
				let field = item.field;
				let field1 = item.field1;
				let field_map = item.field_map
				let placeholder = item.placeholder;
				let width = item.width;

				if (item.type == '城市') {
					const city = <FormItem label="城市" key={field_map}>
						<Select style={{ width: 90 }} placeholder={placeholder} key={field_map}>
							{Utils.getOptionList([{ id: '', name: '全部' }, { id: '0', name: '北京' }, { id: '1', name: '上海' }, { id: '2', name: '天津' }, { id: '3', name: '杭州' }])}
						</Select>
					</FormItem>
					formItemList.push(city)
				} else if (item.type == '时间查询') {
					const begin_time = <FormItem key={field} label="订单时间" name={field}>
						<DatePicker showTime={true} placeholder="选择开始时间" format="YYYY-MM-DD HH:mm:ss" />
					</FormItem>
					formItemList.push(begin_time)
					const end_time = <FormItem label="~" colon={false} key={field1} name={field1}>
						<DatePicker showTime={true} placeholder="选择结束时间" format="YYYY-MM-DD HH:mm:ss" />
					</FormItem>
					formItemList.push(end_time)
				} else if (item.type == 'INPUT') {
					const INPUT = <FormItem label={label} key={field} name={field}>
						<Input type="text" placeholder={placeholder} />
					</FormItem>
					formItemList.push(INPUT)
				} else if (item.type == 'SELECT') {
					const SELECT = <FormItem label={label} key={field} name={field}>
						<Select
							style={{ width }}
							placeholder={placeholder}
						>
							{Utils.getOptionList(item.list)}
						</Select>
					</FormItem>
					formItemList.push(SELECT)
				} else if (item.type == 'CHECKBOX') {
					const CHECKBOX = <FormItem label={label} key={field} name={field}>
						<Checkbox>
							{label}
						</Checkbox>
					</FormItem>
					formItemList.push(CHECKBOX)
				}
				else if (item.type == 'DATE') {
					const Date = <FormItem label={label} key={field} name={field}>
						<DatePicker showTime={true} />
					</FormItem>
					formItemList.push(Date)
				}
			})
		}
		return formItemList
	}

	render() {
		return (
			<Form
				layout="inline"
				ref={this.formRef}
			// initialValues={{ city: [''], start_time: [''], end_time: [''], status: [''] }}
			>
				{this.initFormList()}
				<FormItem>
					<Button type="primary" style={{ margin: "0px 20px" }} onClick={this.handleFilterSubmit}>查询</Button>
					<Button onClick={this.reset}>重置</Button>
				</FormItem>
			</Form>
		)
	}
}