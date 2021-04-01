import React, { useEffect, useState } from 'react';
import { Button, Upload, message, Typography, Card, Alert, Anchor } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PlusOutlined } from '@ant-design/icons';
const { Link } = Anchor;
export default () => {
  const props = {
    name: 'file',
    action: 'http://localhost:3000/upload',
    accept: 'image/*',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.fileList.length === 0) {
        settList([]);
      }

      if (info.file.status === 'done') {
        if (info.file.response.data.error_code && !info.file.response.data.words_result) {
          message.error(`${info.file.name} 文件无法识别`);
          return;
        }
        message.success(`${info.file.name} file uploaded successfully`);
        const list = info.file.response.data.words_result;
        let textarea = '';
        list.forEach((item: any) => {
          textarea += item.words + '\n';
        });
        setText(textarea);
        let newTextList = [...textList, textarea]
        settList(newTextList);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [text, setText] = useState('');
  const [textList, settList] = useState([]);
  return (
    <PageContainer>
      <Card id="hhhhhhha">
        <Alert message="请上传图片文件，识别结果会显示在下方" showIcon type="info" />
        需要启动后台服务：<Typography.Link target="_blank" href="https://github.com/zazzzf/baidu-pic-ocr"> https://github.com/zazzzf/baidu-pic-ocr </Typography.Link>
        <div style={{ marginTop: 20 }}>
          <Upload maxCount={1} {...props} listType="picture-card">
            <PlusOutlined />
          </Upload>
          {textList.map((item, index) => {
            return (
              <Prism language="js" style={atomDark} key={index} id={`result-anchor-demo${index}`}>
                {item}
              </Prism>
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
};
