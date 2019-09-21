
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
    const pipelineStateList = await PipelineStateCol.aggregate([
      { $match: { pipelineId: { $in: ids } } },
      {
        $group: {
          _id: '$pipelineId',
          doc: { $last: "$$ROOT" }
        }
      },
    ])
    const pipelineList = await PipelineCol.aggregate([
      { $match: { _id: { $in: ids } } },
    ])
    const list = pipelineList.map(item => {
      let data = pipelineStateList.find(el => {
        return JSON.stringify(el.doc.pipelineId) === JSON.stringify(item._id)
      }) || {}
      let name = item.pipelineName
      return Pipeline.processState(data.doc, name)
    })
    return list
  }

  static processState(pipelineState, name) {
    let newObj = {
      id: 0,
      name: name,
      state: 'off',
      start: 0,
      end: 0,
      dif: 0,
      count: 0,
    }
    if (pipelineState && pipelineState.pipelineId) {
      newObj = {
        id: pipelineState.pipelineId || 0,
        name: name || '未命名',
        state: pipelineState.state || 'off',
        start: pipelineState.startTime || 0,
        end: pipelineState.endTime || 0,
        dif: pipelineState.difTime || 0,
        count: pipelineState.count || 0,
      }
    }
    return newObj
  }
};


module.exports = Pipeline;