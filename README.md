# zhaoTongTong-express-json-postman
## 如有问题，请联系：1141632973@qq.com
# 基于Node.js Express文件的增删改查REST API 
请根据下面的介绍获取数据或自行搭建服务器!
# 简单介绍 
使用Node.js Express框架开发的对于文件的增删改查的REST API，通过Postman模拟客户对信息的增删改查以及返回所需要的数据和状态码  
默认监听3000端口 部署前请使用 <strong> npm install </strong>安装所需的依赖包！
# 用户相关
#### 1. 获取数据信息
+ <strong>完整路径</strong>： http://{hostname}:{port}/{getAllProducts、getOneProduct(可选)}
+ <strong>支持方法</strong>： get
+ <strong>返回格式为JSON, 形式如下</strong>:  
<pre><code>{
  "id": 13,
  "barcode": "ITEM000005",
  "name": "qqq",
  "unit": "袋",
  "price": 4
}
</code></pre>

#### 2. 插入数据
+ <strong>完整路径</strong>： http://{hostname}:{port}/addProduct/{id}
+ <strong>支持方法</strong>： post
+ <strong>返回格式为JSON, 形式如下</strong>:  
<pre><code>
  {
    "barcode": "ITEM000005",
    "name": "qqq",
    "unit": "袋",
    "price": 4
  }
</code></pre>

#### 3. 更新一条数据
+ <strong>完整路径</strong>： http://{hostname}:{port}/updateProduct/{id}
+ <strong>支持方法</strong>： put
+ <strong>在body里面输入要更新的JSON信息，比如</strong>:  
<pre><code>
  {
    "barcode": "ITEM000005",
    "name": "qqq",
    "unit": "袋",
    "price": 4
  }
</code></pre>

#### 4. 删除一条数据
+ <strong>完整路径</strong>： http://{hostname}:{port}/removeProduct/{id}
+ <strong>支持方法</strong>： delete
+ <strong>显示结果：</strong>成功显示succee，失败则是the ID is not exist
