import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import './index.less'

const Option = Select.Option;
const FormItem = Form.Item;

//定义表格 label标签布局
const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: 19,
}

export default class City extends Component {
    //初始化状态
    state = {
        list: null,
        isShowOpenCity: false,
        pagination: ''
    }

    params = {
        page: 1
    }

    formRef = React.createRef()

    componentDidMount() {
        this.requestList()
    }

    //默认请求接口数据
    requestList = () => {
        let _this = this
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index
                    return item
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    //开通城市按钮动作函数
    handleOpenCity = () => {
        console.log("您已经触发了开通城市按钮的动作函数");
        this.setState({
            isShowOpenCity: true
        })
    }

    //城市开通提交
    handleSubmit = async () => {
        // console.log(this.formRef.current);
        const form = this.formRef.current
        const values = await form.getFieldsValue()
        console.log(values)
        axios.ajax({
            url: '/open_city',
            data: {
                params: values
            }
        }).then(res => {
            if (res.code === 200) {
                message.success('开通成功')
                this.setState({ isShowOpenCity: false })
            }
            this.requestList()
        })
    }
    render() {
        //定义表格中表头的信息部分
        const columns = [
            {
                title: "城市ID",
                dataIndex: "id",
                key: 'id',
                width: 75
            },
            {
                title: "城市名称",
                dataIndex: "name",
                key: 'name',
                width: 100
            },
            {
                title: "用车模式",
                dataIndex: "mode",
                key: 'mode',
                width: 85,
                render(mode) {
                    return mode === 1 ? '停车点' : '禁停区'
                }
            },
            {
                title: "营运模式",
                dataIndex: "op_mode",
                key: 'op_mode',
                width: 85,
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟'
                }
            },
            {
                title: '授权加盟商id',
                dataIndex: 'franchisee_id',
                key: 'franchisee_id',
                width: 120
            },
            {
                title: "授权加盟商",
                dataIndex: "franchisee_name",
                key: 'franchisee_name',
                width: 105
            },
            {
                title: "城市管理员",
                dataIndex: "city_admins",
                key: 'city_admins',
                render(arr) {
                    return arr.map(item => {
                        return item.user_name
                    }).join(',');
                },
                width: 100
            },
            {
                title: "城市开通时间",
                dataIndex: "open_time",
                key: 'open_time',
                width: 130
            },
            {
                title: "操作时间",
                dataIndex: "update_time",
                key: 'update_time',
                width: 70,
                render: Utils.formateDate
            },
            {
                title: "操作人",
                dataIndex: "sys_user_name",
                key: 'sys_user_name',
                width: 80
            }
        ]

        return (
            <div>
                <Card className="card-wrap">
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }} className="card-wrap">
                    <Button
                        type="primary"
                        onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal  //模态框弹出开通
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >

                    <Form layout="horizontal"
                        ref={this.formRef}
                        initialValues={{ city: [''], mode: [''], bikemode: [''] }}
                    >
                        <FormItem label="选择城市" name='city' {...formItemLayout}>
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">杭州市</Option>
                                <Option value="3">上海市</Option>
                                <Option value="4">深圳市</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="运营模式" name="mode" {...formItemLayout}>
                            <Select style={{ width: 100 }}>
                                <Option value="">请选择</Option>
                                <Option value="own">自营</Option>
                                <Option value="friends">加盟</Option>
                            </Select>
                        </FormItem >
                        <FormItem label="用车模式" name="bikemode" {...formItemLayout}>
                            <Select style={{ width: 100 }}>
                                <Option value="">请选择</Option>
                                <Option value="goto">指定停车点</Option>
                                <Option value="noto">禁停区</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    render() {
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    <Select
                        style={{ width: 100 }}
                        placeholder="请选择"
                    >
                        <Option value="1" >北京市</Option>
                        <Option value="2" >天津市</Option>
                        <Option value="3" >深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式">

                    <Select
                        style={{ width: 120 }}
                        placeholder="全部"
                    >   <Option value="" >全部</Option>
                        <Option value="1" >指定停车模式</Option>
                        <Option value="2" >禁停区模式</Option>
                    </Select>

                </FormItem>
                <FormItem label="运营模式">

                    <Select
                        style={{ width: 100 }}
                        placeholder="全部"
                    >   <Option value="" >全部</Option>
                        <Option value="1" >自营</Option>
                        <Option value="2" >加盟</Option>
                    </Select>

                </FormItem>
                <FormItem label="加盟商授权状态">

                    <Select
                        style={{ width: 100 }}
                        placeholder="全部"
                    >   <Option value="" >全部</Option>
                        <Option value="1" >已授权</Option>
                        <Option value="2" >未授权</Option>
                    </Select>

                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: "0px 20px" }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
