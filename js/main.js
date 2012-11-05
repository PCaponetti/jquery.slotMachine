$(document).ready(function () {
	if ($("#roller1").length > 0) {
		$("#roller1").slotMachine({'pxsPerSecond': 35, 'button': $("#btn_shake")});
	}
	if ($("#roller2").length > 0) {
		$("#roller2").slotMachine({ 'pxsPerSecond': 95, 'button': $("#btn2") });
	}
});

