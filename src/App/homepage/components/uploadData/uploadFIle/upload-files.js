import React from 'react';
import {Empty, Upload, Icon, Button, Progress, message, Modal} from "antd";
import * as XLSX from 'xlsx';

import {ReadFileAsBinaryString} from "../../../../../components/readFile";
import DisplayFiles from '../displayFile/display-excel';

const {Dragger} = Upload;

class UploadFiles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayFile: false,
            table: {
                visible: false,
                Sheet1: null,
                SheetNames: null
            }
        }
    }
    closeTable = () =>{
        this.setState({
            displayFile: false
        });
    };
    uploadFiles = (data) => {
        const {status, originFileObj} = data.file;
        if(status === 'success'){
            message.success('上传成功',2);
            let File = ReadFileAsBinaryString(originFileObj);
            File.onload =function (ev) {
                let result = XLSX.read(ev.target.result,{type: "binary"});
            };
        }
        else if(status === 'error'){
            message.error('上传失败',2);
            let File = ReadFileAsBinaryString(originFileObj);
            File.onload = (ev) => {
                let result = XLSX.read(ev.target.result,{type: "binary"});
                // console.log( XLSX.utils.sheet_to_json(result.Sheets[result.SheetNames[0]]),{skipHeader:true})
                // // console.log(result);
                // this.setState({
                //     table: {
                //         visible: true,
                //         Sheet1: XLSX.utils.sheet_to_json(result.Sheets[result.SheetNames[0]]),
                //         SheetNames: result.SheetNames
                //     }
                // })
            };
        }
    };
    render(){
        const {uploadFiles,state:{table:{visible}},closeTable} = this;
        return (
            [
                <Dragger
                    name='file'
                    onChange={uploadFiles}
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'>
                    {/*<Progress percent={100}/>*/}
                    <h2> </h2>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                    </p>
                    <p>点击或拖拽文件至此区域上传</p>
                </Dragger>,
                <Modal
                    title='excel'
                    okText= '确认'
                    cancelText= '取消'
                    onCancel={closeTable}
                    centered={true}
                    width={1000}
                    visible={visible}>
                    {/*<DisplayFiles dataSourse={tableData}/>*/}
                </Modal>
            ]
        );
    }
}

export default UploadFiles;