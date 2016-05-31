/* WenPeng  v2.0 .@CopyRight2015*/
$.wp_loading = function(obj){
	$(".loading").remove();
	var $loading = $("<div class='loading '>"+obj.content+"</div>");
	$("body").append($loading);
	//$(".loading").css({"width":"200px","height":"50px","background":"#15819D","text-align":"center","line-height":"50px","font-size":"16px","color":"#fff","box-shadow":"3px 3px 10px 2px #000","position":"absolute"});
	if(obj.width){
		//$loading.width((obj.width/$(window).height())*100+"%");
		$loading.width(obj.width);
		}
	if(obj.height){
		//$loading.height((obj.height/$(window).height())*100+"%");
		$loading.height(obj.height);
		$(".loading").css("line-height",obj.height+"px")
		}
	load_cen();
	if(obj.time) {
		timer = setTimeout(function(){
			$loading.trigger("click");
		},obj.time*1000);
	}
}
function load_cen(){
	var randomAddClass = ["magictime boingInUp","magictime tinLeftIn","magictime tinRightIn","magictime tinUpIn","magictime tinDownIn","magictime foolishIn","magictime swashIn","magictime vanishIn","magictime twisterInUp","magictime twisterInDown","magictime swap","magictime slideRightRetourn","magictime slideUpRetourn","magictime slideLeftRetourn","magictime slideDownRetourn","magictime puffIn","magictime perspectiveUpRetourn","magictime perspectiveRightRetourn,","magictime perspectiveLeftRetourn","animated pulse","animated bounce","magictime perspectiveDownRetourn","animated tada","animated fadeInRightBig","animated fadeInLeftBig","animated fadeInDownBig","animated fadeInUpBig","animated fadeInRight","animated fadeInLeft","animated fadeInDown","animated fadeInUp","animated fadeIn","animated flipOutY","animated flipInY","animated flipInX","animated flip","animated swing","animated wobble","animated rollOut","animated rollIn","animated hinge","animated rotateInDownRight","animated rotateInUpRight","animated rotateInUpLeft","animated rotateIn","animated bounceInRight","animated bounceInLeft","animated bounceInDown","animated bounceInUp","animated bounceIn","magictime openDownLeftRetourn","magictime openDownRightRetourn","magictime openUpLeftRetourn","magictime,openUpRightRetourn"];
	var randomRemoveClass = ["animated flipOutY","animated fadeOut","animated fadeOutUp","animated fadeOutDown","animated fadeOutLeft","animated fadeOutRight","animated fadeOutUpBig","animated fadeOutDownBig","animated fadeOutLeftBig","animated fadeOutRightBig","animated bounceOutUp","animated bounceOutLeft","animated bounceOut","animated bounceOutRight","animated rotateOut","animated rotateOutDownRight","animated rotateOutUpLeft","animated rotateOutDownRight","animated rotateOutDownLeft","animated rotateOutUpLeft","animated bounceOutRight","animated rollOut","magictime spaceOutRight","magictime spaceOutLeft","magictime spaceOutDown","magictime spaceOutUp","magictime boingOutDown","magictime bombLeftOut","magictime bombRightOut","magictime tinDownOut","magictime tinUpOut","magictime holeOut","magictime foolishOut","magictime swashOut","magictime vanishOut","magictime rotateUp","magictime rotateRight","magictime rotateLeft","magictime rotateDown","magictime puffOut","magictime magic","magictime,openDownLeftOut","magictime openDownRightOut","magictime openUpLeftOut","magictime openUpRightOut","magictime rollOut"];
	function rd(){
		return Math.floor(Math.random()*(randomAddClass.length+1));
	}
	function rad(){
		return Math.floor(Math.random()*(randomRemoveClass.length));
	}
	$(".loading").addClass(randomAddClass[rd()]);
	$(".loading").click("click",function(){
		$(".loading").removeClass().addClass("loading "+randomRemoveClass[rad()]);
	});
	center();
}
function center() {
	var width = ($(window).width() - $(".loading").width()) / 2;
	var height = ($(window).height() - $(".loading").height()) / 2;
	$(".loading").css({left:width,top:height});
		$(window).resize(function(){
		center();
		//$(".loading").removeClass().addClass(randomAddClass[rd()]);
	});	
}