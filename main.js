$(document).ready(function () {
	if ($("#roller1").length > 0) {
		$("#roller1").slotMachine({'pxsPerSecond': 35, 'button': $("#btn_shake")});
	}
});
