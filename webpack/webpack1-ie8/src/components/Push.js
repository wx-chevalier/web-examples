import React from "react";
import { Upload, Icon, message } from "antd";
/*
文件上传组件
1. 格式化文件下载地址和下载文件名
fileList.forEach(
	v => ({ ...(v||{}),
		url: "/upload/file/" + v.uid,
		linkProps: { download: "附件.xlsx" },
	})
);
2. 不自动做上传操作
beforeUpload(file) {
	if (file.size < 1024 * 1024 * 2) {
		fileList.push(file);
		onChange(fileList.slice(0));
	} else {
		message.error("请上传低于 2MB 大小的文件");
	}
	return false;
}
3. 上传成功后操作
onChange(info) {
	const { file, fileList, event } = info;
	const { status, name, response } = file;
	if (status === "uploading") {
		// 正在上传
	} else if (status === "done") {
		// 上传结束
	} else if (status === "error") {
		// 上传失败
	} else if (status === "removed") {
		// 上传失败
	} else {
		// 其他情况
	}
	onChange(info);
}
4. file对象内容
const file = {
	type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	uid: "rc-upload-1517509949936-2",
	name: "upload.xlsx",
	size: 6611,
	percent: 100,
	lastModified: 1517509664468,
	response: "服务端响应内容",
	status: "error",
	error: {
		status: 404,
		method: "post",
		url: "/file/upload",
		message: "cannot post /file/upload 404",
	},
	originFileObj: { uid: "rc-upload-1517509949936-2" },
};
*/
const Push = props => {
	const { value, onChange, ...res } = props;
	const { list = [], err = "" } = value || {};
	list.forEach(
		v => ({
			...v, url: "/upload/file/" + v.uid,
			linkProps: { download: v.name || "附件.xlsx" },
		})
	);
	const param = {
		name: "file",
		accept: ".xlsx",
		action: "/file/upload",
		showUploadList: true,
		multiple: false,
		fileList: list,
		beforeUpload(file) {
			if (file.size < 1024 * 1024 * 2) {
				list.length = 0;
				list.push(file);
				onChange({ list, err });
			} else {
				message.error("请上传低于 2MB 大小的文件");
			}
			return false;
		},
		onChange(info) {
			const { file, fileList, event } = info;
			const { status, name, response } = file;
			if (status === "uploading") {
				// 正在上传
				message.warn(`文件 ${name} 正在上传. ` +
					JSON.stringify(event));
			} else if (status === "done") {
				// 上传结束
				const { error } = response || {};
				message.success(`文件 ${name} 上传结束. ` +
					JSON.stringify(error));
			} else if (status === "error") {
				// 上传失败
				message.error(`文件 ${name} 上传失败.`);
			} else if (status === "removed") {
				// 移除文件
			} else {
				// 其他情况
			}
			// 非受控组件可以直接对 fileList 处理,减少数组元素
			list.length = 0;
			list.push(fileList.slice(-1)[0]);
			onChange({ list, err });
		},
	};
	return <Upload.Dragger {...param} {...res}>
		<p className="ant-upload-drag-icon">
			<Icon type="inbox" />
		</p>
		<p className="ant-upload-text">
			{list.length ? "重新上传"
				: "点击或将文件拖拽到这里上传"}
		</p>
		<p className="ant-upload-hint">文件上传要求提示</p>
	</Upload.Dragger>;
};
export default Push;