//デバッグ環境用のheader記述
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, HEAD, POST, DELETE, PUT,OPTIONS');

//POSTされたデータを取得(JSON文字列になっています)      
$str = file_get_contents('php://input');

//JSON文字列をparseして連想配列に
$recv = json_decode($str,true);

//認証作業をします。
//(ここではなにもせずにtureを返しています)

//結果をAngularのLoginUserインターフェースに合わせて成形します
$send['user']=$recv['user'];
$send['login']=true;//認証結果

//認証結果をJSONで返します
echo json_encode($send);
