function collspanSpace(str: any) {
  var s = str;
  s = s.replace(/[\r\n]/g, '');
  s = s.replace(/ \+/g, '');
  return s;
}
export function SecondCol(props: any) {
  return (
    <div
      className={collspanSpace(`second-box_container
      ${!props.nodeData.extend ? 'third-box_container_line' : ''}
      ${props.data.length == 1 ? 'third-box_once' : ''}
      ${props.item.clicked ? 'depth2-clicked' : ''}
      ${props.item.clicked ? 'depth-focus' : ''}`)}
    >
      <div className="map-second_center_line">
        <div
          className={`
          ${props.secondclass}
          ${props.item.clicked ? 'depth-selected' : ''}
          ${props.item.isOnceTwo && !props.item.extend ? 'half-line' : ''}
          `}
          style={{ backgroundColor: props.boxColor }}
          onClick={() => props.clickSecond()}
        >
          <div className={`circel_text`}>{props.item.stepName}</div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export function ThirdRow(props: any) {
  return (
    <div
      className={`third-box_row ${props.thirdRowClass}
      ${props.index == 0 ? 'third-box_row_item' : ''}
      ${props.index == 0 && props.item.length == 1 ? 'half-line-third' : ''}
      `}
    >
      {props.children}
    </div>
  );
}
export function ThirdCol(props: any) {
  return (
    <div
      className={`third-box_container third-box_container_line ${
        props.data.length == 1 ? 'third-box_once' : ''
      }`}
    >
      <div className="map-third_center_line">
        <div
          className={`
        ${props.thirdClass}
        ${props.item.isOnceTwo ? 'half-line' : ''}
        ${props.item.checked || props.item.focus ? 'third-checked' : ''}
        ${props.item.discheck ? 'dis-checked' : ''}
        ${props.item.allowClick ? 'allow-checked' : ''}
        `}
          style={{ backgroundColor: props.boxColor }}
          onClick={() => {
            props.clickThird();
          }}
        >
          <div className="third text">{props.item.stepName}</div>
        </div>
      </div>
    </div>
  );
}
