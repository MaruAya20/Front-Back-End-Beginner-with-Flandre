import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  const db = cloud.mongo.db
  const id = ctx.body.id;   // 前端传递的 id

  // 使用 ObjectID 转换 id 为 MongoDB 可识别的 ObjectId 类型
  const objectId = new ObjectId(id);

  // 查找并删除对应的文档                                   //deleteOne也是一个方法
  const deleteResult = await db.collection('list').deleteOne({ _id: objectId });

  // 如果删除结果的 deletedCount 为 0，说明没有找到对应的文档
  if (deleteResult.deletedCount === 0) {
    return ctx.body = { message: 'Item not found or already deleted' };
  }

  // 删除成功的响应
  return ctx.body = { message: 'Item deleted successfully' };
}
