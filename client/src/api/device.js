import Api from '../utils/API';

function createDevice(deviceData) {
  return Api.post('device', deviceData);
}

function deleteDevice(id) {
  return Api.delete(`device/${id}`);
}

export { createDevice, deleteDevice };
