jest.unmock('axios');
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  createGateWay,
  listAllGateways,
} from '../../api/gateway';

const newGateway = {
  serial: '4656545646',
  name: 'New Gateway AAA',
  address: '192.168.2.1',
};

const mockresponse = {
  status: 200,
};

describe('Add new Gateway', () => {
  it('should post gateway data', () => {
    const mockRequest = new MockAdapter(axios);
    mockRequest.onPost('gateway').reply(200, mockresponse);

    return createGateWay(newGateway).then((response) =>
      expect(response.status).toEqual(200)
    );
  });
});

describe('List Gateway', () => {
  it('should get gateway data', () => {
    const mockRequest = new MockAdapter(axios);
    mockRequest
      .onGet('gateway/findAll?limit=5&page=1')
      .reply(200, mockresponse);

    return listAllGateways().then((response) =>
      expect(response.status).toEqual(200)
    );
  });
});
