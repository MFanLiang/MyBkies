import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Home from './pages/home'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Rich from './pages/rich'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousels'
import NoMatch from './pages/nomatch'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order/'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import PermissionUser from './pages/permission'

export default class IRouter extends Component {
	render() {
		return (
			<HashRouter>
				<App>
					<Route path="/login" component={Login}></Route>

					{/* 定义common通用页面的路由导航配置 */}
					<Route path="/common" extract render={() =>
						<Common>
							<Route path="/common/order/detail/:orderId" component={OrderDetail} ></Route>
						</Common>
					} />

					{/* 定义admin主页面的路由导航配置 */}
					<Route path="/" render={() =>
						<Admin>
							<Switch>
								<Route path="/home" component={Home}></Route>
								<Route path="/ui/buttons" component={Buttons} />
								<Route path="/ui/modals" component={Modals} />
								<Route path="/ui/loadings" component={Loadings}></Route>
								<Route path="/ui/notification" component={Notification}></Route>
								<Route path="/ui/messages" component={Messages}></Route>
								<Route path="/ui/tabs" component={Tabs}></Route>
								<Route path="/rich" component={Rich}></Route>
								<Route path="/ui/gallery" component={Gallery}></Route>
								<Route path="/ui/carousel" component={Carousels}></Route>
								<Route path="/form/login" component={FormLogin}></Route>
								<Route path="/form/reg" component={FormRegister}></Route>
								<Route path="/table/basic" component={BasicTable}></Route>
								<Route path="/table/high" component={HighTable}></Route>
								<Route path="/city" component={City}></Route>
								<Route path="/order" component={Order}></Route>
								<Route path="/user" component={User}></Route>
								<Route path="/bikeMap" component={BikeMap}></Route>
								<Route path="/charts/bar" component={Bar}></Route>
								<Route path="/charts/pie" component={Pie}></Route>
								<Route path="/charts/line" component={Line}></Route>
								<Route path="/permission" component={PermissionUser}></Route>
								<Redirect to="/home" />
								<Route component={NoMatch} />
							</Switch>
						</Admin>
					} />
				</App>
			</HashRouter>
		)
	}
}