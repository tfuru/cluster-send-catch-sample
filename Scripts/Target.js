/** 受信回数と最大値を表示する
 * 
 */

$.onStart(() => {
  $.state.count = 0;
  $.state.value = 0;
  $.setStateCompat("this", "count", 0);
  $.setStateCompat("this", "value", 0);
});

$.onReceive((messageType, arg, sender) => {
  if (messageType != "value") return;

  // 受信データの最大値を記録
  let value = $.state.value ?? 0;
  $.state.value = Math.max(value, arg);

  // 受信回数 を カウント 画面に表示
  let count = $.state.count ?? 0;
  $.state.count = count + 1;

  $.setStateCompat("this", "count", $.state.count);
  $.setStateCompat("this", "value", $.state.value);
});