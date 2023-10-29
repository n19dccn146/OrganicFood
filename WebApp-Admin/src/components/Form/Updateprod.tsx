import { PlusOutlined } from '@ant-design/icons';
import {
    Button, DatePicker, Form,
    Input, InputNumber, Modal, Radio, Upload
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
  
const name = 'Tv sony 4k'

const Updateprod = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
    {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },])
    const [dataForm, setDataForm] = useState<any>({})

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);
    const onFinish = (e: any) => {
        setDataForm(e)
    dataForm.fileList = fileList  
}

console.log('123',dataForm);
return (
    <>
        <Form 
        onFinish={onFinish}
        labelCol={{
        span: 4,
        }}
        wrapperCol={{
        span: 14,
        }}
        layout="horizontal">

            <Form.Item label="Name" name='name' >
                <Input   placeholder='Product name' defaultValue={name}/>
            </Form.Item>

            <Form.Item label="Quantity" name='quantity' >
                <InputNumber bordered={true} min={1} max={10}   />
            </Form.Item>

            <Form.Item label="Stock" name='stock'>
                <Radio.Group >
                    <Radio value="stock"> Stock </Radio>
                    <Radio value="instock"> Instock </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="DatePicker" >
                <DatePicker />
            </Form.Item>

            <Form.Item label="RangePicker">
                <RangePicker />
            </Form.Item>

            <Form.Item label="Description"  name='des'>
                <TextArea rows={4}/>
            </Form.Item>
        
            <Form.Item label="Upload" valuePropName="fileList" >
                <Upload 
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={(file)=>{
                        return false
                    }}
                >
                    {fileList.length >= 4 ? null : (
                    <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                    alt="example"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit:'contain'
                    }}
                    src={previewImage}
                    />
                </Modal>
            </Form.Item>
            <div className='w-full flex justify-center'>
                <Button  type='primary' htmlType='submit'  className='w-[200px]'>Submit</Button >
            </div>

        </Form>
    </>
);
};

export default Updateprod;