import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

import {Upload, Icon, message} from 'antd';

class UploadThumb extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: ""
        };
    }

    handleChange(info) {
        const {imageUrl} = this.state;

        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl, loading: false}));
        }
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    render() {

        const uploadButton = (
            <div>
                <Icon
                    type={this.state.loading
                    ? 'loading'
                    : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/upload"
                beforeUpload={this
                .beforeUpload
                .bind(this)}
                onChange={this
                .handleChange
                .bind(this)}>

                {this.state.imageUrl
                    ? <img src={this.state.imageUrl} alt=""/>
                    : uploadButton}

            </Upload>
        );
    }
}

export default withRouter(UploadThumb);
