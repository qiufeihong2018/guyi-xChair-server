
const PipelineCol = require('../collections/pipeline');
const PipelineStateCol = require('../collections/pipelineState');
const ProbeCol = require('../collections/probe');

class Pipeline {
  constructor(id) {
    this.id = id
  }
  async updateProbeList() {
    // 查询最新的probe列表
    const probeList = await ProbeCol.find({
      pipelineId: this.id
    });
    // probeNoList = ['AA01', 'AA02']
    const probeNoList = [...probeList].map(item => item.probeNo);
    await PipelineCol.findByIdAndUpdate({
      _id: this.id
    }, {
      probeList: probeNoList
    });

    return probeNoList
  };
  // 获取该生产线当前的心跳
  async getCurrentState() {
    // const pipeline = await PipelineCol.findById(this.id)
    // const state = await PipelineStateCol.findOne({ pipelineId: this.id }).sort({
    //   createdAt: -1
    // });
    const pipelineState = await PipelineStateCol.findOne({ pipelineId: this.id }).sort({
      createdAt: 1
    }).populate('pipelineId')
    const pipeline = Pipeline.processState(pipelineState)
    return pipeline
  }

  static async getListCurrentState(ids) {
    const list = await PipelineStateCol.aggregate([
      { $match: { pipelineId: { $in: ids } } },
      { $group: { _id: '$pipelineId', createdAt: { $max: '$createdAt' } } },
      { '$project': {'_id': 1, 'state': 1, 'count': 1} }
    ])
    console.log(list)
  }

  static processState(pipelineState) {
    const pipeline = pipelineState.pipelineId
    const newObj = {
      companyId: pipeline.companyId,
      pipelineId: pipeline._id,
      pipelineName: pipelineState.pipelineName,
      state: pipelineState.state,
      start: pipelineState.startTime,
      end: pipelineState.endTime,
      dif: pipelineState.difTime,
      count: pipelineState.count,
      probeList: pipeline.probeList,
    }
    return newObj
  }
};


module.exports = Pipeline;