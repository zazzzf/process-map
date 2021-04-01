var fromatData = function (data) {
  if (data && data.data && data.data.length) {
    var child_list = data.data;
    var format_list = [];
    for (var i = 0; i < child_list.length; i++) {
      /**
       * 放置方式，1为串行，2为并行
       */
      if (child_list[i].rankType == '1') {
        if (format_list.length > 0) {
          if (format_list[format_list.length - 1].length === 1) {
            /**
             * 连续两行串行 为1个时候 把后一个的isOnceTwo 设置为true 用于连续两个单一块串行的判断 最后一个串行块的上连接线需要删减
             */
            child_list[i].isOnceTwo = true;
          } else {
            child_list[i].isOnceTwo = false;
          }
        }
        format_list.push([child_list[i]]);
      } else if (child_list[i].rankType == '2') {
        /**
         * 如果串行最后一个中又新增了一个并行
         * 则删除掉其 isOnceTwo属性
         */
        if (format_list.length > 0) {
          format_list[format_list.length - 1].forEach((item) => (item.isOnceTwo = false));
          format_list[format_list.length - 1].push(child_list[i]);
        }
      }
    }

    return format_list;
  } else {
    return [];
  }
};
export default fromatData;
