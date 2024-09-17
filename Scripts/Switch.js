/** サンプル 
 * 
 *  1. インタラクト
 *  2. 周辺のアイテムに send
 *  3. 失敗を catch して、エラーメッセージを表示
 *  
 */

$.onInteract(player => {
  $.setStateCompat("this", "length", 0);
  
  const values = $.state.values ?? [];
  const target = $.worldItemReference("Target");
  $.state.target = target;

  // values に 1 - 100 の値を入れる
  for (let i = 1; i <= 100; i++) {
    values.push(i);
  }
  $.state.values = values;
});

const sendMessage = () => {
  const values = $.state.values ?? [];
  if (values.length == 0) return;
  $.log(`values.length ${values.length}`);

  const target = $.state.target;
  if (target) {
    const value = values.pop();
    try{
      target.send("value", value);
    } catch(e) {
      // 失敗したので、エラーメッセージを表示
      $.log(`--- error send ${e}`);
      values.unshift(value);
    }
    $.state.values = values;

    $.setStateCompat("this", "length", values.length);
  }
}

$.onUpdate((deltaTime) => {
  // onUpdate で とにかく送信し続ける
  sendMessage();
});