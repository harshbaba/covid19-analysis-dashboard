jQuery.fn.showTimePicker = function(opt){
	return this.each(function(){
		var that = $(this), x = new Date();
		//accept user action
		var settings = $.extend({
			afterOpen: function(){},
			afterClose: function(){}
		}, opt);
		
		//Showing current time and append html

		function createTimerUL(isHours){
			let len = isHours ? 24 : 4, html = '<ul>', seconds = ['00', '15', '30', '45'];
			for(let i = 0; i < len; i++) {
				html += '<li class="'+ (isHours ? 'hrs' : 'scd')+'">' +(i <= 9 && isHours ? '0' : '') + (isHours ? i : seconds[i]) +'</li>';
			}
			return html;
		}
		var timerMarkup =
					'<div class="mytoll-timepicker-container clearfix">'+	 
						'<div class="mytoll-timepicker-wrapper clearfix"><span class="tm-close"><i class="ico-arrow-down-green"></i></span>' +
							'<div class="tm-hour">' +
								'<span class="sc-up">&#9650;</span>' +
								'<div class="hours">'+ createTimerUL(true) +'</div>' +
								'<span class="sc-down">&#9660;</span>' +
							'</div>' +
							'<div class="tm-minutes">'+ createTimerUL() +'</div>' +
						'<div class="clear"></div></div>'+
					'</div>';	
		that.val(x.getHours() + ":" + x.getMinutes());
		that.parent().append(timerMarkup);
		
		//register event handler on hours and minutes
		that.parent().find('.hours li, .tm-minutes li').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			let timeV = that.val().split(":");
			let hr = timeV[0];
			let mi = timeV[1];
			if($(this).hasClass('hrs')) {
				hr = this.textContent;
			} else {
				mi = this.textContent;
			}
			that[0].value = hr + ":" + mi;
		}).end().find('span').click(function() {
			let hrsObj = $(this).siblings('.hours');
			let hrsheight = hrsObj.outerHeight();
			let ul = hrsObj.find('ul');
			let listHeight = ul.outerHeight();
			let liHeight = hrsObj.find('li:first').outerHeight(true);
			
			let newHeight = parseInt(ul.css('margin-top'), 10) === 'auto' ? 0 : Math.abs(parseInt(ul.css('margin-top'), 10));
			if(this.className === 'sc-down') {
				if(newHeight + liHeight > listHeight - hrsheight) return false;
				newHeight += liHeight;
			} else {
				if(newHeight < liHeight) return false;
				newHeight -= liHeight;
			}
			ul.css('margin-top', -newHeight);
		}).end().find('.tm-close').click(function(){
			$(this).closest('.mytoll-timepicker-container').fadeOut('fast', settings.afterClose);
			that.removeClass('active');
		});
		
		//Showing time selector wrapper.
		that.on('focus', function() {
			event.stopPropagation();
			that.parent().find('.mytoll-timepicker-container').fadeIn(200, settings.afterOpen);
			
			// $(document).on('click',function(event){
			// 	var $target = event.target;
			// 	if (!$target.closest('.mytoll-timepicker-wrapper')) {
			// 		that.parent().find('.mytoll-timepicker-container').fadeOut(200, settings.afterOpen);		
			// 		$(this).unbind(event);
			// 	}
			// });
			
		});
	});
}