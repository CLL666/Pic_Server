<?php
header("Content-type: text/html; charset=utf-8"); 
$file=@$_FILES['file'];
rename($file['tmp_name'],$file['name']);
if( !$file  || $file['size']==0 ){
    unlink($file['name']);
	die(json_encode(['status'=>false,'code'=>-1,'msg'=>"参数错误或者文件大小为0"]));
}else if( preg_match("/image/",$file['type']) ){
	$res=json_decode(upload_file($file['name']),true);
	unlink($file['name']);
	$url=preg_replace("/http/","https",$res['url']);
	exit(json_encode(['status'=>true,'code'=>0,'msg'=>$url]));
}else{
    unlink($file['name']);
	exit(json_encode(['status'=>false,'code'=>-1,'msg'=>"不规范文件"]));
}

function upload_file($file)
{
    $data = [
        // 还有一种打成数据流的方法.
        'attrFile'=>new \CURLFile($file),
    ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://notice.chaoxing.com/pc/files/uploadNoticeFile");
    curl_setopt($ch, CURLOPT_POST, true );
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);  //该curl_setopt可以向header写键值对
    curl_setopt($ch, CURLOPT_HEADER, false); // 不返回头信息
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
 
    if ($output == false){
        return 'error:' . curl_error($ch);
    }
 
    curl_close($ch);
 
    return $output;
}