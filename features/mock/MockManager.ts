import {SetupWorkerApi} from 'msw';
import {worker} from '../../mock-browser';

const __CLIENT__ = typeof window !== 'undefined';

export default class MockManager {
  mock: Mock;
  mockStorage: MockStorage;
  enabled: boolean = false;

  constructor(
    MockClass: TMock = Mock,
    MockStorageClass: TMockStorage = MockStorage
  ) {
    this.mock = new MockClass();
    this.mockStorage = new MockStorageClass();
    if (__CLIENT__) {
      this.enabled = this.mockStorage.load();
      if (this.enabled) this.mock.start();
    }
  }

  static isAvailable() {
    return process.env.NODE_ENV === 'development';
  }

  start() {
    this.mock.start();
    this.enabled = true;
    this.mockStorage.save(this.enabled);
  }

  stop() {
    this.mock.stop();
    this.enabled = false;
    this.mockStorage.save(this.enabled);
  }
}

class Mock {
  worker: SetupWorkerApi;

  constructor() {
    const { worker } = require('../../mock-browser');
    this.worker = worker
  }

  start() {
    this.worker.start({onUnhandledRequest: 'bypass'});
  }

  stop() {
    this.worker.stop();
  }
}


class MockStorage {
  storageKey: string = '_MOCK_MANAGER';

  load(): boolean {
    let enabled = false;
    const defaults = JSON.stringify(enabled);
    try {
      enabled = JSON.parse(sessionStorage.getItem(this.storageKey) || defaults);
    } catch (err) {
      console.error(err);
    }
    return enabled;
  }

  save(enabled: boolean): void {
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(enabled));
    } catch(err) {
      console.error(err);
    }
  }
}

type TMock = typeof Mock;
type TMockStorage = typeof MockStorage;
