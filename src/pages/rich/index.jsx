import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less'

export default class Bar extends Component {

	state = {
		showRichText: false,
		editorState: ''
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	}

	handleClearContent = () => {
		this.setState({
			editorState: '',
			contentState: '',
		});
	}

	handleGetText = () => {
		this.setState({
			showRichText: true
		})
	}

	onEditChange = (contentState) => {
		this.setState({
			contentState
		})
	}

	render() {
		const { editorState } = this.state
		return (
			<div>
				<Card>
					<Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
					<Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
				</Card>
				<Card title="富文本编辑器" className="card-wrap">
					<Editor
						editorState={editorState}
						toolbarClassName="toolbarClassName"
						onContentStateChange={this.onEditChange}
						onEditorStateChange={this.onEditorStateChange}
					/>
				</Card>
				<Modal
					title="富文本"
					visible={this.state.showRichText}
					onCancel={() => {
						this.setState({showRichText: false})
					}}
					footer={null}
				>
					{draftToHtml(this.state.contentState)}
				</Modal>
			</div>
		)
	}
}