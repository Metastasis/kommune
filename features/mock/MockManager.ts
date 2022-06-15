import {SetupWorkerApi} from 'msw';
import {worker} from '../../mock-browser';

export default class MockManager {
  worker: SetupWorkerApi;

  constructor() {
    const { worker } = require('../../mock-browser');
    this.worker = worker
  }

  static isAvailable() {
    return process.env.NODE_ENV === 'development';
  }

  start() {
    this.worker.start({onUnhandledRequest: 'bypass'});
  }

  stop() {
    this.worker.stop();
  }
}
