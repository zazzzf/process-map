import React, { Component } from 'react';
import formatData from './formatData';
import './index.less';
import { SecondCol, ThirdRow, ThirdCol } from './MapItem';
class ProcessMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const data = formatData(this.props.nodeData);
    this.updateData(data);
  }
  componentDidUpdate(prevProps) {
    const data = formatData(this.props.nodeData);
    if (prevProps.nodeData !== this.props.nodeData) {
      this.updateData(data);
    }
  }
  updateData(data) {
    this.setState(Object.assign(this.state, { data }));
  }
  secondClass(_t, i, $i, t) {
    let _this = this;
    var _i = i.length;
    var classStr = 'map-circle_box flex_center ';
    function onlyOneNode() {
      let classString = '';
      if (!t.extend) {
        if ($i == _this.state.data.length - 1) {
          if (!_this.state.data[$i - 1]) {
            classString +=
              'map-third_box_center map-third_box_center_end map-third_box_center_first';
          } else {
            classString += 'map-third_box_center map-third_box_center_end';
          }
        } else {
          if (_this.state.data[$i - 1] && _this.state.data[$i - 1].length > 0) {
            classString += 'map-third_box_center';
          } else {
            classString += 'map-third_box_center map-third_box_center_first';
          }
        }
      }
      return classString;
    }
    function overOneNode() {
      let classStrn = '';
      if (!t.extend) {
        if (_t === 0) {
          classStrn += 'map-third_box_first';
        } else if (_t == _i - 1) {
          classStrn += `map-third_box_last`;
        } else {
          classStrn += `map-third_box_center`;
        }
      }
      return classStrn;
    }
    if (!this.props.nodeData.extend) {
      if (i.length === 1) {
        classStr += onlyOneNode();
      } else {
        classStr += overOneNode();
      }
    }
    return classStr;
  }

  thirdVerifyClass(_t, data, item) {
    let className = '';
    if (item.length > 1 && _t !== data.length - 1) {
      if (data[_t + 1].length > 1) {
        className += 'map-third_box_row_after third-map-bottom';
      }
    }
    return className;
  }
  thirdClass(_t, i, $i, showData) {
    var _i = i.length;
    //  `map-third_box flex_center map-thirdbox_${i. length >1? t ==0?'first': t = i. length 1 ?'last' 'cneter': 'center'}
    var classStr = `map-third_box flex_center `;
    if (i.length === 1) {
      //判断当前行是否为个三级只有一个三级的 Class
      if ($i === showData.length - 1) {
        //判断一个当前三级数据是否只有一个三级节点成立则只有一行且一个三级节点
        classStr += `map-third_box_center map-third_box_center_end`;
      } else {
        classStr += `map-third_box_center`;
      }
    } else {
      if (_t === 0) {
        //多个三级情况下第一个三级
        classStr += `map-third_box_first`;
      } else if (_t === _i - 1) {
        //多个三级情况下最后一个三级
        classStr += `map-third_box_last`;
      } else {
        //非最后一个三级且非第一个
        classStr += `map-third_box_center`;
      }
    }
    return classStr;
  }
  updateData(data) {
    this.setState(Object.assign(this.state, { data }));
  }
  boxRowClass(n, data, type) {
    var rowChildisAll2 = true;
    let className = '';
    function setrowChild() {
      data.forEach((item) => {
        if (item.rankType == '1') {
          rowChildisAll2 = false;
        }
      });
    }
    if (data.length === n && data[n].length > 1) {
      setrowChild();
      if (rowChildisAll2) {
        className += 'm-bottom20';
      }
      if (type === '2' && n === 0 && data[n].length > 1) {
        setrowChild();
      }
      if (rowChildisAll2) {
        className += 'm-top20';
      }
    }
    return className;
  }
  render() {
    return (
      <div className={`${this.props.isSmall ? 'process-row-box-small' : 'process-row-box'}`}>
        {this.state.data.map((i, $i) => {
          return (
            <div
              key={$i}
              className={`
                second-box_row
                ${$i == 0 && i.checked ? 'second-box_row_item' : ''}
                ${this.boxRowClass($i, this.state.data, '2')}
                ${!this.props.nodeData.extend && this.thirdVerifyClass($i, this.state.data, i)}
            `}
            >
              {this.state.data[$i].map((t, _t) => {
                return (
                  <SecondCol
                    key={_t}
                    nodeData={this.props.nodeData}
                    item={t}
                    data={i}
                    boxColor={this.props.sColor}
                    clickSecond={() => this.props.clickSecond && this.props.clickSecond(t)}
                    secondclass={this.secondClass(_t, i, $i, t)}
                  >
                    {t.extend &&
                      formatData(t).map((n, _n) => {
                        return (
                          <ThirdRow
                            thirdRowClass={
                              this.boxRowClass(n, formatData(t), '3') +
                              this.thirdVerifyClass(_n, formatData(t), n)
                            }
                            index={_n}
                            key={_n}
                            item={n}
                          >
                            {n.map((m, _m) => {
                              return (
                                <ThirdCol
                                  key={_m}
                                  thirdClass={this.thirdClass(_m, n, _n, formatData(t))}
                                  clickThird={() =>
                                    this.props.clickThird && this.props.clickThird(m, t)
                                  }
                                  boxColor={this.props.tColor}
                                  item={m}
                                  data={n}
                                />
                              );
                            })}
                          </ThirdRow>
                        );
                      })}
                  </SecondCol>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProcessMap;
