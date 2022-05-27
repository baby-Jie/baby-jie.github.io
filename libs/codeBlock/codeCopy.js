// 代码块一键复制

$(function () {
    var $copyIcon = $('<i class="fas fa-copy code_copy" title="复制代码" aria-hidden="true"></i>')
    var $notice = $('<div class="codecopy_notice"></div>')
    $('.code-area').prepend($copyIcon)
    $('.code-area').prepend($notice)
    // “复制成功”字出现
    function copy(text, ctx) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            try {
                document.execCommand('copy') // Security exception may be thrown by some browsers.
                $(ctx).prev('.codecopy_notice')
                    .text("复制成功")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 450, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
            } catch (ex) {
                $(ctx).prev('.codecopy_notice')
                    .text("复制失败")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 650, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
                return false
            }
        } else {
            $(ctx).prev('.codecopy_notice').text("浏览器不支持复制")
        }
    }
    // 复制
    $('.code-area .fa-copy').on('click', function () {
       
		var lines = $(this).siblings('pre').find('span.line')
		
		if (lines.length > 0)
		{
			
			
			var text = ""
			console.log("length:" + lines.length)
			for (var i = 0; i < lines.length; i++)
			{
				var range = document.createRange()
				var selection = window.getSelection()
				selection.removeAllRanges()
				range.selectNodeContents(lines.get(i))
				selection.addRange(range)
				console.log(selection.toString())
				text = text + selection.toString() + "\n"
				
			}
			
			//range.selectNodeContents($(this).siblings('pre').find('code')[0])
			
			navigator.clipboard.writeText(text);
		
			$(this).prev('.codecopy_notice')
                    .text("复制成功")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 450, function () {
                        setTimeout(function () {
                            $(this).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
			//copy(text, this)
			selection.removeAllRanges()
		}
        
    })
});
