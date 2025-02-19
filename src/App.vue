<script setup>
import axios from 'axios';
import { ref } from 'vue';
import MyButton from './components/button.vue'

//最新最热之————已被高端ai使用10分钟击败

//通过引入组件（其实就是分文件编写类）来量产常用内容

const value = ref('')
//引入ref来创建响应式数据，实时改变图像
const list = ref([])
//ref就是监听器

getList()
//这里会提出网络请求，在控制台可以看到HTTP状态码，5类分别含义如下：
//  1XX 信息响应
//* 2XX 成功响应（接收成功）
//  3XX 重定义响应
//* 4XX 客户端（前端）错误响应
//* 5XX 服务端（后端）错误响应


//异步请求，不展开讲，发起网络请求需要用到async和await，都是成对出现的
async function getList(){

const res = await axios({
  url:"https://xpeocivgrl.bja.sealos.run/get-list",
  method:"GET",
  //method一览：
  //GET获取 POST发送 PUT更新 DELETE删除，宾语均为服务器 
})
list.value = res.data.list

console.log(res)
}

//更新List
async function update(id){  
  await axios({   //直接请求接口
    url:"https://xpeocivgrl.bja.sealos.run/update-todo",
    method:"POST",
    data:{
      id,
    }
  })

  getList()
}


async function add()
{
  console.log("正在查看value值",value.value)
  await axios({
    url: "https://xpeocivgrl.bja.sealos.run/add-todo",
    method:"POST",
    //传参：
    data:{
      value: value.value,
      isCompleted:false,
    }
  }) 
  
  getList()
  //实现刷新功能
}


async function del(id){
  await axios({
    url:"https://xpeocivgrl.bja.sealos.run/del-todo",
    method:"POST",
    data:{
      id: id,
    },
  })

  getList()
  
  
}


//如上前端通过axios工具对后端服务器发送HTTPS请求。
//要求请求明确地址、方法，是否需要参数（以及参数格式及其返回格式）

function call(a)
{
    console.log(a)
}

//console.log(str.value)  //用value访问值，不然打印ref对象
</script>

<template>

  <div class="todo-app">
      <!-- v-show 和 v-if 都是控制显不显示，但是v-if是连代码里的盒子都不显示，v-show是用CSS来隐藏 -->
        <div class="title">芙兰朵露的Todo App</div>
       
        <div class="todo-form">
          <!-- 这里的v-model是将input中的数值跟value完全绑定 -->
            <input 
              v-model="value"
              class="todo-input" 
              placeholder="add a Todo" 
              type="text" 
              name="" id="">
            <div @click="add" class="todo-button">add Todo</div>

        </div>
        <!-- v-for应该就是vue版的for in了-->
        <div
        v-for="(item, index) in list"
        :class="[item.isCompleted ? 'completed' : 'item']"
         >
        <div>           
                          <!--item._id是getlist返回的，有唯一性-->
          <input @click="update(item._id)" v-model="item.isCompleted" type="checkbox" />
          <span class="name">{{ item.value}}</span>  
          <!-- 展示变量用两个大括号即可 -->
        </div>

      <div @click="del(item._id)" class="del">del</div>
    </div>
  </div>

  

  <img class="Flandre01" src="D:\Microsoft VS Code\Projects\my-vue-app\img\Flandre01.jpg">

<div class="IlluBox">
    <div class="IlluText">
        Illustrator:applecaramel_(acaramel)
    </div>
    <MyButton @ok="call" text="我是个完全没有用的小按钮~"></MyButton>
    <!-- 通过子组件写ok的激发，用emit给call传参 -->
        
</div>

</template>

<style scoped>
.del{
    color: #ff000d;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
}
.item{
    display: flex;

    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    background-color: #f8d059;
    border-radius: 20px;
    width: 80%;
    margin: 20px auto;
    /* margin这里传两个参时代表上下，左右 */
    /* 传四个参时代表上右下左（顺时针方向） */
    padding: 16px;
    box-shadow: #a3a543 0 8px 20px;
    
}
.todo-button{
    border: 1px solid #dfe1e5;
    outline: none;
    width: 15%;
    height:52px;
    border-radius:  0 20px 20px 0;
    text-align: center;
    background: linear-gradient(to right,#e0252f,#f8d059);  
    line-height: 52px;
    color: #ffff;
    font-style: italic;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 13px 8px rgba(0, 0, 0, 0.2);
    font-weight: 700;

}
.todo-input{
    border: 1px solid #dfe1e5;
    outline: none;
    width: 60%;
    height:50px;
    border-radius: 20px 0 0 20px;
    padding-left: 15px;
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.2);

} 
.todo-form{
    margin-top: 20px;
    margin-left: 30px;
    display: flex;
  
}
.IlluText{
    font-style:italic;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: hsla(91, 64%, 57%, 0.855);
}
.IlluBox{
    background-color: #10a0de;
    width: 98%;
    box-sizing: border-box;
    margin-left: 1%;
    height: 50px;
    padding-top: 10px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0 13px 8px rgba(0, 0, 0, 0.2);

}
.Flandre01{
    margin-top: 20px;
    max-width: 98%;
    margin-left: 1%;
    height: auto;
    border-radius: 20px;
    user-select: none;
    box-shadow: 0 13px 8px rgba(0, 0, 0, 0.2);
}
.title{
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    /* margin-top: ;  margin塌陷，不讲细节*/

}
.todo-app{
    /* 这个98%可以让画面自适应 */
    width: 98%; 
    height: 700px;  
    box-sizing: border-box;
    border-radius: 20px;
    margin-top: 40px; 
    margin-left: 1%;
    padding-top: 30px;
    background-color: #ffff;
    box-shadow: 0 13px 8px rgba(0, 0, 0, 0.2);

}


.completed {
  display: flex;

    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    background-color: #f8d059;
    border-radius: 20px;
    width: 80%;
    margin: 20px auto;
    /* margin这里传两个参时代表上下，左右 */
    /* 传四个参时代表上右下左（顺时针方向） */
    padding: 16px;
    box-shadow: #a3a543 0 8px 20px;
    text-decoration: line-through;
    opacity: 0.4;
}
</style>
