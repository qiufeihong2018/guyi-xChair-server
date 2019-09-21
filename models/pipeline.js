
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
    const pipelineCol = await PipelineCol.findById(this.id)
    const name = pipelineCol.pipelineName
    
    const pipelineState = await PipelineStateCol.findOne({ pipelineId: this.id }).sort({
      createdAt: 1
    })
    const pipeline = Pipeline.processState(pipelineState, name)
    return pipeline
  }

  static async getListCurrentState(ids) {
    const rawList = await PipelineStateCol.aggregate([
      { $match: { pipelineId: { $in: ids } } },
      {
        $group: {
          _id: '$pipelineId',
          doc: { $last: "$$ROOT" }
        }
      },
    ])
    const list = rawList.map(item => Pipeline.processState(item.doc))
    return list
  }

  static processState(pipelineState, name="未命名") {
    const newObj = {
      id: pipelineState.pipelineId,
      name: name,
      state: pipelineState.state,
      start: pipelineState.startTime,
      end: pipelineState.endTime,
      dif: pipelineState.difTime,
      count: pipelineState.count,
    }
    return newObj
  }
};


module.exports = Pipeline;