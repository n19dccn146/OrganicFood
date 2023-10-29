import {
    Button,
    Form,
    Input, Upload
} from "antd";
import { useState } from "react";
const { TextArea } = Input;

const Createproduct = () => {
  const [image, setImage] = useState<any>([]);
  const [dataForm, setDataForm] = useState("");

  const onFinish = (e: any) => {
    //   console.log(image);
    e.image = image;
    setDataForm(e);
    console.log(e);
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="inline"
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="Product name" />
        </Form.Item>

        <Form.Item label="Name" name="code">
          <Input placeholder="Code" />
        </Form.Item>

        <Form.Item label="Name" name="price">
          <Input placeholder="Price" />
        </Form.Item>

        <Form.Item label="Category" name="sale">
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </Form.Item>

        <Form.Item label="Description" name="des">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Upload">
          <Upload.Dragger
            multiple
            listType="picture-card"
            showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
            accept=".png, .jpg"
            beforeUpload={(file: any) => {
              setImage([...image, file]);
              return false;
            }}
          >
            <Button>Upload file</Button>
          </Upload.Dragger>
        </Form.Item>
        <div className="w-full flex justify-center">
          <Button type="primary" htmlType="submit" className="w-[200px]">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Createproduct;
