import ProcessMap from '@/components/ProcessMap';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { getMapData } from './services';
import { Alert, Card, Switch, Drawer, Button, Popover, Typography, Divider, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SketchPicker } from 'react-color';
import './index.less';

export default (): React.ReactNode => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  
  const initList = (val:Array<[]>) => {
    let list = val
    list.forEach((e: any, _e: Number) => {
      e.extend = false;
      e.data && e.data.forEach((i: any) => {
          i.extend = true;
          if (i.data && i.data.length > 0) {
            e.extend = true;
          }
          i.data && i.data.forEach((t: any) => {});
        });
    });
    return list
  } 
  async function getData() {
    const res = await getMapData();
    var list = res.data;
    list = initList(list)
    setLoad(false);
    setData(list);
  }
  useEffect(() => {
    getData();
  }, []);
  const click3Event = (third, second) => {
    console.log(third);
    console.log(second);
  };
  const click2Event = (data) => {
    console.log(data);
  };

  const [small, setSmall] = useState(false);
  const changeSize = (val) => setSmall(val);

  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [colorPick2, setColorPick2] = useState(false);
  const [colorPick3, setColorPick3] = useState(false);
  const [sColor, setsColor] = useState('#f7acbc');
  const [tColor, settColor] = useState('#ef5b9c');

  const props = {
    sColor,
    tColor,
    isSmall: small,
  };

  const closeAll = (type) => {
    let list = data
    if(type) {
      list.forEach(item => {
        item.data.forEach(j => {
          j.extend = false
        });
        item.extend = false
      })
    }else {
      list = initList(data)
    }
   
    setData([...list])
  }
  function changeExtend(e){
    closeAll(e)
  }
  return (
    <PageContainer loading={load}>
      <Button
          onClick={() => setVisible(true)}
          size="large"
          type="primary"
          style={{ position: 'fixed', top: '50%', left: '0' }}
          icon={<SettingOutlined />}
        ></Button>
      <Alert showIcon message="流程图渲染组件的React JSX 实现（左侧设置按钮可以设置一些配置）" type="success" description="" />
      <Card style={{ overflow: 'auto', height: 'calc(100vh - 224px)' }}>
        {data.map((item, index) => {
          return (
            <div key={index} style={{paddingBottom: 50}}>
              <div style={{marginBottom: 50}}>
                <Typography.Title>{item.stepName}</Typography.Title>
              </div>
              <ProcessMap
                {...props}
                clickThird={(d, e) => {
                  click3Event(d, e);
                }}
                clickSecond={(second) => {
                  click2Event(second);
                }}
                nodeData={item}
              />
            </div>
          );
        })}
        <Modal
          title="组件接受参数数据结构"
          visible={show}
          footer={null}
          onCancel={() => setShow(false)}
        >
          <Prism language="js" style={atomDark}>
            {`[
  {
    'stepCode': 10100101,
    'stepName': '@cname',
    'data': [
      {
        'status': '3',
        'stepCode': 20200101,
        'stepName': '@cname',
        'rankType': 1,
        'data': [
          {
            'stepCode': 30300101,
            'stepName': '@cname',
            'rankType': 1,
          }, ...
        ]
      }, ...
    ]
  }, ...
]`}
          </Prism>
        </Modal>
      </Card>
      <Drawer
        title="Setting Drawer"
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Typography>2级圆色彩设置</Typography>
        <Popover
          content={<SketchPicker color={sColor} onChangeComplete={(c) => setsColor(c.hex)} />}
          trigger="click"
          visible={colorPick2}
          onVisibleChange={() => setColorPick2(!colorPick2)}
        >
          <div
            className="m-t-20"
            style={{ background: sColor, width: 20, height: 20, borderRadius: 5 }}
            onClick={() => setColorPick2(!colorPick2)}
          ></div>
        </Popover>
        <Divider></Divider>
        <Typography>3级色彩设置</Typography>
        <Popover
          content={<SketchPicker color={tColor} onChangeComplete={(c) => settColor(c.hex)} />}
          trigger="click"
          visible={colorPick3}
          onVisibleChange={() => setColorPick3(!colorPick3)}
        >
          <div
            className="m-t-20"
            style={{ background: tColor, width: 20, height: 20, borderRadius: 5 }}
            onClick={() => setColorPick3(!colorPick3)}
          ></div>
        </Popover>
        <Divider />
        <Typography>组件大小 可选 default/ small</Typography>
        <Switch
          className="m-t-20"
          checkedChildren="Small"
          unCheckedChildren="default"
          onChange={changeSize}
        />
        <Divider />
        <Typography>组件接受参数数据结构</Typography>
        <Button type="primary" onClick={() => setShow(!show)} className="m-t-20">
          点击查看
        </Button>
        <Divider />
        <Typography>3depth全部收起</Typography>
        <Switch
          className="m-t-20"
          checkedChildren="close"
          unCheckedChildren="extend"
          onChange={changeExtend}
        />
        <Divider />
      </Drawer>
    </PageContainer>
  );
};
