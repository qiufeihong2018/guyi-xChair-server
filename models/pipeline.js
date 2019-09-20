
const PipelineCol = require('../collections/pipeline');
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

    return probeList
  };
};

module.exports = Pipeline;