import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  const db = cloud.mongo.db

  const id = ctx.body.id;

  // 查找列表中的项，根据 id 获取文档                   //_id是特殊的对象格式，所以要新建一个匿名对象
  const listItem = await db.collection('list').findOne({ _id: new ObjectId(id) });

  if (!listItem) {
    // 如果没有找到对应的文档
    return {
      ok: false,
       message: 'Item not found' };
  }

  // 反转 isCompleted 字段
  const updatedItem = await db.collection('list').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {       //这是一个Mongo里更新设置一个值的操作符%set
        isCompleted: !listItem.isCompleted
      }
    }
  );

  // 返回成功更新的响应
  return { 
    ok: true,
    message: 'Item updated successfully',
  }
}

