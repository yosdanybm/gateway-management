const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

export default axios;
