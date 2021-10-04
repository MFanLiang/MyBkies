import { Modal } from 'antd';
import Utils from './../utils/utils'
import axios from 'axios'

export default class Axios {

	//列表的封装
	static requestList(_this, url, params, isMock) {
		var data = {
			params: params,
			isMock: isMock
		}
		this.ajax({
			url: url,  //设置请求参数发送的url地址
			data: data //设置请求携带的数据
		})
			.then((data) => {
				if (data && data.result) {
					const list = data.result.item_list.map((item, index) => {
						item.key = index
						return item;
					})
					_this.setState({
						list,
						pagination: Utils.pagination(data, (current) => {
							//获取当前所在页
							_this.params.page = current;
							_this.requestList()
						})
					})
				}
			})
	}

	static ajax(options) {
		let loading;   //定义一个loading加载的变量
		if (options.data && options.data.isShowLoading !== false) {
			loading = document.getElementById('ajaxLoading');
			loading.style.display = 'block'
		}

		let baseApi = ''
		options.isMock ? baseApi = 'https://mobile-ms.uat.homecreditcfc.cn/mock/61444a63646d61002784391f/mockapi' : baseApi = 'https://mobile-ms.uat.homecreditcfc.cn/mock/61444a63646d61002784391f/mockapi'

		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: 'get',
				baseURL: baseApi,
				timeout: 10000,
				params: (options.data && options.data.params) || "",
			}).then((response) => {
				if (options.data && options.data.isShowLoading !== false) {
					loading = document.getElementById('ajaxLoading');
					loading.style.display = 'none'
				}
				if (response.status == "200") {
					let res = response.data
					if (res.code == "200") {
						resolve(res)
					} else {
						Modal.info({
							title: '错误提示',
							content: res.message
						})
					}
				} else {
					reject(response.data)
				}
			})
		});
	}
}