
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var vec2 = require("zrender/lib/core/vector");

var _graphHelper = require("./graphHelper");

var updateMultRelationPosition = _graphHelper.updateMultRelationPosition;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
//TODO:song 解决node之间多连线重叠问题 -----------------------------------------
//TODO:song 解决node之间多连线重叠问题 -----------------------------------------
function simpleLayout(seriesModel) {
  var coordSys = seriesModel.coordinateSystem;

  if (coordSys && coordSys.type !== 'view') {
    return;
  }

  var graph = seriesModel.getGraph();
  graph.eachNode(function (node) {
    var model = node.getModel();
    node.setLayout([+model.get('x'), +model.get('y')]);
  }); //TODO:song 解决node之间多连线重叠问题，入参处修改，添加了seriesModel 对象 -----------------------------------------

  simpleLayoutEdge(graph, seriesModel);
} //TODO:song 解决node之间多连线重叠问题，入参处修改，添加了seriesModel 对象 -----------------------------------------


function simpleLayoutEdge(graph, seriesModel) {
  graph.eachEdge(function (edge) {
    var curveness = edge.getModel().get('lineStyle.curveness') || 0;
    var p1 = vec2.clone(edge.node1.getLayout());
    var p2 = vec2.clone(edge.node2.getLayout());
    var points = [p1, p2];

    if (+curveness) {
      points.push([(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness]);
    }

    edge.setLayout(points);
  }); //TODO:song 解决node之间多连线重叠问题 -----------------------------------------

  updateMultRelationPosition(graph, seriesModel); //TODO:song 解决node之间多连线重叠问题 -----------------------------------------
}

exports.simpleLayout = simpleLayout;
exports.simpleLayoutEdge = simpleLayoutEdge;