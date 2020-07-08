$(document).ready(function(){
	$("#btn").click(function(){
		$("#upform").ajaxForm(function(data,status){
		    data=JSON.parse(data);
			//上传成功
			if(data.code == 0) {
				//图片地址
				var url = data.msg;
				$("#show").show();
				$("#loading_up").hide();
				$("#success_up").show();
				$("#success_up").hide(3000);
				document.getElementById("linkurl").value = url;
				document.getElementById("htmlurl").value = "<img src = '" + url + "' />";
				document.getElementById("mdurl").value = "![](" + url + ")";
				//添加图片链接
				$("#show_img").attr('src',url);
				//添加图片地址
				$("#img-url").attr('href',url);
				//显示图片
				$("#img-box").show();
			}
			//上传失败
			else {
				//错误原因
				var msg = data.msg;
				$("#uperror").html(msg);
				$("#uperror").show();
				$("#uperror").fadeOut(3000);
			}
		});
	});
});
	//复制按钮
$(document).ready(function(){
	$("#copyhtml").click(function(){
		new clipBoard($("#htmlurl"),{
			copy: function() {
				return $("#htmlurl").val();	
			},
			afterCopy: function() {
				$("#copyok").show();
				$("#copyok").fadeOut(3000);
			}
		});
	});
	$("#copymd").click(function() {
		new clipBoard($("#mdurl"),{
			copy: function() {
				return $("#mdurl").val();
			},
			afterCopy: function() {
				$("#copyok").show();
				$("#copyok").fadeOut(3000);
			}
		});
	});
	$("#copyurl").click(function() {
		new clipBoard($("#linkurl"),{
			copy: function() {
				return $("#linkurl").val();
			},
			afterCopy: function() {
				$("#copyok").show();
				$("#copyok").fadeOut(3000);
			}
		});
	});
});