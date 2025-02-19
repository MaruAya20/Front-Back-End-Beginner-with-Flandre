import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  const db = cloud.mongo.db
  //连接 list 集合
  const collection = db.collection('list');
  const data = await collection.find({}).toArray();
  
  //返回查询数据
  return {
    ok: true,
    list: data
  }

}
