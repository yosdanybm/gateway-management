import Api from '../utils/API';

function listAllGateways(limit, page) {
  return Api.get(`gateway/findAll?limit=${limit}&page=${page + 1}`);
}

function createGateWay(gatewayData) {
  return Api.post('gateway', gatewayData);
}

function deleteGateWay(id) {
  return Api.delete(`gateway/${id}`);
}

export { listAllGateways, createGateWay, deleteGateWay };
